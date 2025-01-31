import './style.scss'
import { gsap } from "gsap";
gsap.registerPlugin();
function pxToCqw($px, $containerSize = 970) {
    return ($px * 100 / $containerSize)+'cqw';
}
function pxToCqh($px, $containerSize = 250) {
    return ($px * 100 / $containerSize)+'cqh';
}

// const tlPersonBounce= gsap.timeline({repeat: -1});
// tlPersonBounce.
//     to('.person',{y:'-=10', duration: 1.7, ease: 'Sine.easeInOut'}).
//     to('.person',{y:'+=10', duration: 1.7, ease: 'Sine.easeInOut'});

const mainTl = gsap.timeline({
    paused: true,
    yoyo: true,
    repeat: -1,
    repeatDelay: 0,
    immediateRender: false,
    defaults: {
        ease: "Power1.easeInOut",
        duration: 5,
    }
})

mainTl
    .to('.banner', {
        backgroundImage: "linear-gradient(103deg, #0d0211 7.52%, #3a1b4b 100%)",
    }, "start")
    .to('.title', {
        transformOrigin: '0% 50%',
        y: "-5%",
        scale: (469/430),
    }, "start")
    .to('.description', {
        transformOrigin: '0% 50%',
        scale: (436/400),
    }, "start")
    .to('.button', {
        transformOrigin: '0% 0%',
        scale: (193/154),
    }, "start")
    .to('.cloud__1', {
        x: pxToCqw(-50),
        y: pxToCqh(176),
    }, "start")
    .to('.cloud__2', {
        x: pxToCqw(-50),
        y: pxToCqh(176),
    }, "start")
    .to('.cloud__3', {
        x: pxToCqw(-68),
        y: pxToCqh(128),
        transformOrigin: '0% 0%',
        scale: (393/325),
        filter: "blur(8px)",
    }, "start")
    .to('.cloud__4', {
        y: pxToCqh(16),
        transformOrigin: '0% 0%',
        scale: (312/393),
        filter: "blur(0px)",
    }, "start")
    .to('.cloud__5', {
        x: pxToCqw(85),
        transformOrigin: '0% 0%',
        filter: "blur(3.7px)",
    }, "start")
    .to('.cloud__6', {
        x: pxToCqw(5),
        y: pxToCqh(25),
        scale: (283/290),
        transformOrigin: '0% 0%',
        filter: "blur(3px)",
    }, "start")
    .to('.house', {
        y: pxToCqh(40),
        transformOrigin: '0% 0%',
        scale: (300/352),
    }, "start")
    .to('.person', {
        x: pxToCqw(-2),
        y: pxToCqh(22),
        transformOrigin: '0% 0%',
    }, "start")


// DEBUG
// Создаем UI для управления анимацией
const controls = document.createElement("div");
controls.innerHTML = `
  <button id="play">Play</button>
  <button id="pause">Pause</button>
  <button id="restart">Restart</button>
  <input type="range" id="slider" min="0" max="1" step="0.01" value="0">
`;
document.body.appendChild(controls);

// Управление анимацией
document.getElementById("play").addEventListener("click", () => mainTl.play());
document.getElementById("pause").addEventListener("click", () => mainTl.pause());
document.getElementById("restart").addEventListener("click", () => mainTl.restart());

// Перемотка анимации
const slider = document.getElementById("slider");
slider.addEventListener("input", () => {
    mainTl.progress(slider.value).pause();
});

// Обновление ползунка
mainTl.eventCallback("onUpdate", () => {
    slider.value = mainTl.progress();
});
