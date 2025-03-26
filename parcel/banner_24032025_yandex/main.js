function getRand(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomSubset(arr, part) {
    const shuffled = arr.slice().sort(() => Math.random() - 0.5); // Shuffle
    const subsetSize = Math.ceil(arr.length / 3); // Get 1/3
    return shuffled.slice(0, subsetSize);
}
function getRandomInclusive(n) {
    return Math.floor(Math.random() * (n + 1));
}
function getMatchingClass(element) {
    return Object.keys(squareSizes).find(size => element.classList.contains(size)) || null;
}
const squareSizeDefault = 20;
const squareSizes = {
    's728x90':  20,
    's320x50':  10,
    's320x100':  14,
    's970x250':  30,
    's480x320':  40,
};
const banners = document.querySelectorAll(".banner");
banners.forEach((banner, i) => {
    const container = banner.querySelector(".animation");
    let activeElsTimelines = [];
    const matchingClass = banner ? getMatchingClass(banner) : null;
    let clickTl;
    let squareSize = squareSizeDefault;
    if(matchingClass){
        squareSize = squareSizes[matchingClass];
    }
    const cssVarColumns = getComputedStyle(container).getPropertyValue('--columns');
    const cssVarRows = getComputedStyle(container).getPropertyValue("--rows");
    let clickTween;
    let columns = cssVarColumns ? cssVarColumns : Math.round(container.offsetWidth / squareSize);
    let rows = cssVarRows ? cssVarRows : Math.round(container.offsetHeight / squareSize);
    let grid = [rows, columns];

    // function action(container) {
    //     //var dur = gsap.utils.random(0.5, 2, 0.2);
    //     console.log('container', container);
    //     repeatTl = gsap.timeline({
    //         paused: false, onComplete: () => {
    //             console.log('complete ???');
    //             action(container)
    //         }
    //     });
    //     repeatTl.to(getRandomSubset(gsap.utils.toArray(container.querySelectorAll(".sqr"))), {
    //         duration: 1,
    //         scale: 1,
    //         yoyo: true,
    //         repeat: 1,
    //         ease: "power1.inOut",
    //         stagger: {
    //             amount: 1.5,
    //             grid: "auto",
    //             ease: 'none',
    //             from: 'random',
    //         }
    //     })
    // }
    function action(el) {
        // Если элемент уже анимируется, не запускаем заново
        //if (gsap.getTweensOf(el).length > 0) return;

        const dur = gsap.utils.random(2, 3, 0.2);
        const delay = gsap.utils.random(0, 40, 0.2);

        const elTl = gsap.timeline({
            id: `action-${el.dataset.idx}`,
            paused: false,
            delay: delay,
            onComplete: () => {
                //console.log('onComplete action');
                if (!clickTl || !clickTl.isActive()) {
                    action(el);
                }
            }
        });

        elTl.to(el, {
            duration: dur,
            repeatDelay: 1,
            scale: 1,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
        });

        activeElsTimelines[el.dataset.idx] = elTl;
    }

    function hoverGrid({currentTarget}) {
        gsap.killTweensOf(currentTarget);
        if(!clickTween || !clickTween.isActive()) {
            gsap.to(currentTarget, {
            duration: 1,
            keyframes: {
                scale: [1.1, 0.9, 1.1],
                "background-color": ["#c6f05e", "#75a113", "#c6f05e"]
            },
            onComplete: () => {
                const elTweens = gsap.getTweensOf(currentTarget);
                const isActiveElTween = elTweens.some(tw => tw.isActive())
                //console.log('elTweens', elTweens, isActiveElTween);
                gsap.to(currentTarget, { scale: 0, duration: 2.6, ease: "power4.out", onComplete: () => {
                    action(currentTarget);
                } });
            },
            ease: "power4.out"
        });
        }
    }

    function animateGrid({currentTarget}) {
        if (!clickTl || !clickTl.isActive()) {
            clickTl = gsap.to(container.querySelectorAll(".sqr"), {
                duration: 2,
                overwrite: true,
                keyframes: {
                    scale: [1, 0.9, 1, 0],
                    "background-color": ["#c6f05e", "#75a113", "#c6f05e", "#c6f05e"]
                },
                ease: "power4.out",
                onComplete: () => {
                    //console.log('click complete');
                    createGrid();
                    repeatAnimationInit();
                },
                stagger: {
                    onStart: function(){
                        //console.log(activeElsTimelines[this.targets()[0].dataset.idx]);
                        activeElsTimelines[this.targets()[0].dataset.idx].kill();
                    },
                    grid: grid,
                    from: Number(currentTarget.dataset.idx),
                    amount: 1
                }
            });
        }
    }

    function repeatAnimationInit() {
        //console.log("repeatAnimationInit started");
        gsap.killTweensOf(container.querySelectorAll(".sqr"));
        activeElsTimelines.forEach(tl => tl.kill());
        activeElsTimelines = [];

        gsap.utils.toArray(container.querySelectorAll(".sqr")).forEach(el => {
            action(el);
        });
    }

    function updateGrid() {
        container.style.setProperty("--columns", `${columns}`);
        container.style.setProperty("--rows", `${rows}`);
    }

    function removeGrid() {
        container.querySelectorAll(".sqr").forEach(sqr => {
            sqr.removeEventListener("mouseenter", animateGrid);
        });
        container.innerHTML = ``;
    }
    function createGrid() {
        removeGrid();
        const elsLength = columns * rows;
        const surprize = getRandomInclusive(elsLength);
        for (let i = 0; i < elsLength; i += 1) {
            const sqr = document.createElement("span");

            sqr.classList.add("sqr");
            sqr.dataset.idx = i;
            if(i === surprize){
                sqr.addEventListener("mouseenter", animateGrid);
                sqr.classList.add('special');
            }
            //sqr.addEventListener("mouseover", hoverGrid);

            container.appendChild(sqr);
        }
    }

    function handleResize() {
        columns = cssVarColumns ? cssVarColumns : Math.round(container.offsetWidth / squareSize);
        rows = cssVarRows ? cssVarRows : Math.round(container.offsetHeight / squareSize);
        grid = [rows, columns];

        updateGrid();
        createGrid();
        repeatAnimationInit();
    }

    window.addEventListener("resize", handleResize);

    updateGrid();
    createGrid();
    repeatAnimationInit();
    // repeatTl.to(container.querySelectorAll(".sqr"), {
    //     duration: 1,
    //     scale: 1,
    //     y: 0,
    //     yoyo: true,
    //     repeat: 1,
    //     ease: "power1.inOut",
    //     overwrite: true,
    //     stagger: {
    //         amount: 1.5,
    //         grid: "auto",
    //         ease: 'none',
    //         from: 'random',
    //     }
    //     }
    // ).play();
})


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
