const loveLines = [
  "小骚昉，今天也想把你放在心尖上。",
  "在很大的世界里，我最想靠近的人是你。",
  "我不知道未来会去哪个项目，但我知道我会努力把距离变近。",
  "忙的时候想你，闲下来的时候更想你。",
  "想和你一起吃很多顿饭，看很多次日落，走很长的路。",
  "王小昉，你是我认真想奔赴的人。"
];

const starPositions = [
  { x: 18, y: 38 },
  { x: 36, y: 18 },
  { x: 58, y: 36 },
  { x: 80, y: 22 },
  { x: 28, y: 72 },
  { x: 72, y: 72 }
];

const starField = document.querySelector("#starField");
const toast = document.querySelector("#loveToast");
const modal = document.querySelector("#letterModal");
const openLetterButton = document.querySelector("#openLetter");
const unlockButton = document.querySelector("#unlockEgg");
const nameInput = document.querySelector("#nameInput");
const eggResult = document.querySelector("#eggResult");

let toastTimer;

// 点击星星后，短暂展示对应的专属情话。
function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

// 星星用 JS 生成，后续改情话时只需要维护上面的数组。
function createClickableStars() {
  loveLines.forEach((line, index) => {
    const star = document.createElement("button");
    const position = starPositions[index];

    star.className = "love-star";
    star.type = "button";
    star.style.left = `${position.x}%`;
    star.style.top = `${position.y}%`;
    star.style.animationDelay = `${index * -0.35}s`;
    star.setAttribute("aria-label", `打开第 ${index + 1} 颗星星里的情话`);

    star.addEventListener("click", () => showToast(line));
    starField.appendChild(star);
  });
}

// 情书弹窗打开时锁住背景滚动，避免手机上误滑。
function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// 彩蛋只在输入完整名字“王小昉”时解锁。
function unlockEgg() {
  const name = nameInput.value.trim();

  if (name === "王小昉") {
    eggResult.textContent = "解锁成功：俊霖最喜欢的人，就是王小昉。";
    eggResult.classList.add("is-success");
    return;
  }

  eggResult.textContent = name ? "还差一点点，再认真输入一次她的名字。" : "";
  eggResult.classList.remove("is-success");
}

createClickableStars();

openLetterButton.addEventListener("click", openModal);
unlockButton.addEventListener("click", unlockEgg);

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlockEgg();
  }
});

modal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});
