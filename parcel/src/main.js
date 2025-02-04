const horizontalMods = [
    's320x50',
    's320x100',
    's728x90',
    's970x250',
    's1000x120',
];
const verticalMods = [
    's240x400',
    's320x480',
    's300x500',
    's260x600',
    's300x600',
    's300x250',
    's336x280',
    's300x300',
    's480x320',
];
const banner = document.querySelector('.banner');
const bannerIsVertical = verticalMods.some(str => banner.classList.contains(str));

const startTl = gsap.timeline({
    paused: false,
    defaults: {
        ease: "elastic.out(0.5,0.4)"
    },
    onComplete: () => {
        tlPersonBounce.play().timeScale(1);
        if(bannerIsVertical){
            mainTl.play().timeScale(1);
            cloud12Tl.play().timeScale(0);
            gsap.to(cloud12Tl, {
                duration: 2,
                timeScale: 0.6,
            });
        }else{
            mainTl.play().timeScale(1);
            cloud12Tl.play().timeScale(0.04);
        }
    },
});

const clouds = gsap.utils.toArray(".cloud");
const center = (clouds.length - 1) / 2;

clouds.forEach((element, index) => {
    let distance;
    if(index === 5){
        distance = Math.abs(4 - center);
    }else{
        distance = Math.abs(index - center);
    }
    const delay = distance * 0.5;
    const ease = (index === 4 || index === 5) ? "elastic.out(0.4,0.6)" : "elastic.out(0.5,0.4)";
    startTl.add(
        gsap.from(element, {
            x: () => {
                if(bannerIsVertical){
                    return 0
                }else{
                    return index<=1 ? "-120%" : 0; // левые облака
                }
            },
            y: () => {
                if(bannerIsVertical){
                    if(index<=1){
                        return '-150%'
                    }else{
                        if(index === 4 || index ===5 ){
                            return '100%';
                        }
                        return '150%'
                    }
                }else{
                    if(index>1){
                        if(index === 4 || index ===5 ){
                            return '100%';
                        }
                        return '150%'
                    }else{
                        return 0;
                    }
                }
            },
            ease: ease,
            duration: 2.4,
        }), delay
    )
});
startTl.add(
    gsap.from('.house',{y: "130%", duration: 3, ease: "elastic.out(0.1,0.3)"}), '-=3'
)
startTl.add(
    gsap.from('.person',{y: "130%", duration: 3, ease: "elastic.out(1,0.6)"}), 0
)
//startTl.progress(1)

const tlPersonBounce= gsap.timeline({repeat: -1, paused: true});
tlPersonBounce.
    to('.person',{y:'-=8', duration: 3, ease: 'Sine.easeInOut'}).
    to('.person',{y:'+=8', duration: 3, ease: 'Sine.easeInOut'});

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
    yoyo: bannerIsVertical ? false : true,
    repeat: -1,
    repeatDelay: 0,
    immediateRender: false,
    ease: "sine.inOut",
    defaults: {
        ease: "Power1.easeInOut",
        duration: 8,
    }
})

if(bannerIsVertical){
    const cloud12TlDur = 12;
    cloud12Tl
        .to(['.cloud--1', '.cloud--2'], {
            duration: cloud12TlDur * 100/180,
            ease: "none",
            xPercent: 100,
            y: '-60%',
        })
        .set(['.cloud--1', '.cloud--2'], {
            xPercent: -80,
            y: '0%',
        })
        .to(['.cloud--1', '.cloud--2'], {
            duration: cloud12TlDur * 80/180,
            ease: "none",
            xPercent: 0,
        })
}else{
    cloud12Tl.add(
        gsap.to(['.cloud--1', '.cloud--2'], {
            x: '-5%',
            y: '70%',
        })
        , 'start'
    )
}

mainTl
    .fromTo('.banner', {
        backgroundImage: bannerIsVertical ? 'linear-gradient(171deg, #340943 0%, #000 100%)' : "linear-gradient(91deg, #0d0211 0%, #3a1b4b 12.72%, #110216 100%)",
    },{
        backgroundImage: bannerIsVertical ? 'linear-gradient(171deg, #340943 0%, #000 100%)' : "linear-gradient(103deg, #0d0211 7.52%, #3a1b4b 100%, #110216 101%)",
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
    .to('.cloud--3', {
        x: '-10%',
        y: '60%',
        scale: 0.8,
        transformOrigin: '0% 0%',
    }, "start")
    .to('.cloud--4', {
        x: '0%',
        y: '5%',
        transformOrigin: '0% 100%',
        scale: 1.15,
        filter: "blur(2.5px)",
    }, "start")
    .to('.cloud--5', {
        x: '40%',
        transformOrigin: '50% 50%',
        filter: "blur(3.7px)",
    }, "start")
    .to('.cloud--6', {
        y: '20%',
        x: '-5%',
        scale: 0.9,
        transformOrigin: '50% 50%',
        filter: "blur(3.7px)",
    }, "start")
    .to('.house', {
        y: '3%',
        transformOrigin: '100% 100%',
        scale: 0.96,
    }, "start")
    // .to('.person', {
    //     x: pxToCqw(-2),
    //     y: pxToCqh(22),
    //     transformOrigin: '0% 0%',
    // }, "start")

//
//
//
// // DEBUG
// function createTimelineControls(timeline, containerId) {
//     const controls = document.createElement("div");
//     controls.innerHTML = `
//     <div class="ttl"></div>
//     <button class="play">Play</button>
//     <button class="pause">Pause</button>
//     <button class="restart">Restart</button>
//     <input type="range" class="slider" min="0" max="1" step="0.01" value="0">
//   `;
//     document.body.appendChild(controls);
//     controls.style.position = 'relative';
//     controls.style.zIndex = 1000;
//
//     const ttl = controls.querySelector(".ttl");
//     const playButton = controls.querySelector(".play");
//     const pauseButton = controls.querySelector(".pause");
//     const restartButton = controls.querySelector(".restart");
//     const slider = controls.querySelector(".slider");
//     ttl.innerHTML = containerId;
//
//     playButton.addEventListener("click", () => timeline.play());
//     pauseButton.addEventListener("click", () => timeline.pause());
//     restartButton.addEventListener("click", () => timeline.restart());
//
//     slider.addEventListener("input", () => {
//         timeline.progress(slider.value).pause();
//     });
//
//     timeline.eventCallback("onUpdate", () => {
//         slider.value = timeline.progress();
//     });
// }
// createTimelineControls(cloud12Tl, 'cloud12Tl');
// createTimelineControls(mainTl, 'mainTl');
// createTimelineControls(tlPersonBounce, 'tlPersonBounce');
