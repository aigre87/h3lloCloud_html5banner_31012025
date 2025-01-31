import './style.scss'
import { gsap } from "gsap";
gsap.registerPlugin();
function pxToCqw($px, $containerSize = 970) {
    return ($px * 100 / $containerSize)+'cqw';
}
function pxToCqh($px, $containerSize = 250) {
    return ($px * 100 / $containerSize)+'cqh';
}

const startTl = gsap.timeline({
    paused: false,
    defaults: {
        ease: "elastic.out(0.4,0.4)"
    }
});
startTl
    .from('.cloud',{
        x: (i) => {
            return i<=1 ? "-150%" : 0;
        },
        y: (i) => {
            return i>1 ? "150%" : 0;
        },
        stagger: {
            grid: 'auto',
            from: "center",
            amount: 0.5
        },
        duration: 4,
    }, 'start')
    .from('.house',{y: "100%", duration: 1.5}, '-=3')

const tlPersonBounce= gsap.timeline({repeat: -1, paused: false});
tlPersonBounce.
    to('.person',{y:'-=10', duration: 3, ease: 'Sine.easeInOut'}).
    to('.person',{y:'+=10', duration: 3, ease: 'Sine.easeInOut'});

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
const cloud12Tl = gsap.timeline({
    paused: true,
    yoyo: true,
    repeat: -1,
    repeatDelay: 0,
    immediateRender: false,
    defaults: {
        ease: "Power1.easeInOut",
        duration: 8,
    }
})
cloud12Tl
    .to('.cloud__1', {
        x: pxToCqw(-50),
        y: pxToCqh(176),
    }, "start")
    .to('.cloud__2', {
        x: pxToCqw(-50),
        y: pxToCqh(176),
    }, "start")

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
    .to('.house', {
        y: pxToCqh(40),
        transformOrigin: '0% 0%',
        scale: (300/352),
    }, "start")
    // .to('.person', {
    //     x: pxToCqw(-2),
    //     y: pxToCqh(22),
    //     transformOrigin: '0% 0%',
    // }, "start")




// DEBUG
function createTimelineControls(timeline, containerId) {
    const controls = document.createElement("div");
    controls.innerHTML = `
    <button class="play">Play</button>
    <button class="pause">Pause</button>
    <button class="restart">Restart</button>
    <input type="range" class="slider" min="0" max="1" step="0.01" value="0">
  `;
    document.body.appendChild(controls);

    const playButton = controls.querySelector(".play");
    const pauseButton = controls.querySelector(".pause");
    const restartButton = controls.querySelector(".restart");
    const slider = controls.querySelector(".slider");

    playButton.addEventListener("click", () => timeline.play());
    pauseButton.addEventListener("click", () => timeline.pause());
    restartButton.addEventListener("click", () => timeline.restart());

    slider.addEventListener("input", () => {
        timeline.progress(slider.value).pause();
    });

    timeline.eventCallback("onUpdate", () => {
        slider.value = timeline.progress();
    });
}
// createTimelineControls(cloud12Tl);
// createTimelineControls(mainTl);
// createTimelineControls(tlPersonBounce);
