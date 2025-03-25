function getRand(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomSubset(arr, part) {
    const shuffled = arr.slice().sort(() => Math.random() - 0.5); // Shuffle
    const subsetSize = Math.ceil(arr.length / 3); // Get 1/3
    return shuffled.slice(0, subsetSize);
}
function getMatchingClass(element) {
    return Object.keys(squareSizes).find(size => element.classList.contains(size)) || null;
}
const squareSizeDefault = 20;
const squareSizes = {
    's728x90':  20,
};
const banners = document.querySelectorAll(".banner");
banners.forEach((banner, i) => {
    const container = banner.querySelector(".animation");
    const matchingClass = banner ? getMatchingClass(banner) : null;
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
        const dur = gsap.utils.random(2, 3, 0.2); // 0.5-2
        const delay = gsap.utils.random(0, 24, 0.2); // 5-10

        const elTl = gsap.timeline({
            paused: false,
            delay: delay,
            onComplete: () => {
                action(el)
            }
        });
        elTl.to(el, {
            duration: dur,
            scale: 1,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
        })
    }

    function hoverGrid({currentTarget}) {
        if(!clickTween || !clickTween.isActive()) {
            gsap.to(currentTarget, {
            duration: 1,
            keyframes: {
                scale: [1, 0.9, 1],
                "background-color": ["#c6f05e", "#75a113", "#c6f05e"]
            },
            ease: "power4.out"
        });
        }
    }

    function animateGrid({currentTarget}) {
        console.log('repeatTl.isActive()', repeatTl.isActive());
        if (repeatTl.isActive()) {
            repeatTl.pause().kill();
        }
        clickTl = gsap.to(container.querySelectorAll(".sqr"), {
            duration: 2,
            keyframes: {
                scale: [1, 0.9, 1, 0],
                "background-color": ["#c6f05e", "#75a113", "#c6f05e", "#c6f05e"]
            },
            ease: "power4.out",
            onComplete: () => {
                console.log('click complete');
                action(container);
            },
            stagger: {
                grid: grid,
                from: Number(currentTarget.dataset.idx),
                amount: 1
            }
        });
    }

    function repeatAnimationInit(){
        gsap.utils.toArray(container.querySelectorAll(".sqr")).map((el) => {
            action(el);
        })
    }

    function updateGrid() {
        container.style.setProperty("--columns", `${columns}`);
        container.style.setProperty("--rows", `${rows}`);
    }

    function createGrid() {
        //document.body.innerHTML = "";

        container.innerHTML = ``;
        for (let i = 0; i < columns * rows; i += 1) {
            const sqr = document.createElement("span");

            sqr.classList.add("sqr");
            sqr.dataset.idx = i;
            // sqr.addEventListener("click", animateGrid);
            // sqr.addEventListener("mouseover", hoverGrid);

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
