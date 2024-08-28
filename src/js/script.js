import "./vanila-tilt";

const cursor = document.querySelector(".custom-cursor");
const links = document.querySelectorAll("[data-action]");
let isCursorInited = false;

const initCursor = () => {
  cursor.classList.add("custom-cursor--init");
  isCursorInited = true;
};

const destroyCursor = () => {
  cursor.classList.remove("custom-cursor--init");
  isCursorInited = false;
};

links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    cursor.classList.add("custom-cursor--link");
  });

  link.addEventListener("mouseout", () => {
    cursor.classList.remove("custom-cursor--link");
  });
});

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  if (!isCursorInited) {
    initCursor();
  }

  cursor.style = `translate: ${mouseX}px ${mouseY}px`;
});

document.addEventListener("mouseout", destroyCursor);

const tiltElements = document.querySelectorAll("[data-tilt]");

function isHoverSupported() {
  return window.matchMedia("(hover: hover)").matches;
}

function updateTilt() {
  tiltElements.forEach((element) => {
    if (isHoverSupported()) {
      VanillaTilt.init(element);
    } else {
      if (element.vanillaTilt) {
        element.vanillaTilt.destroy();
      }
    }
  });
}

updateTilt();

window.addEventListener("resize", updateTilt);
