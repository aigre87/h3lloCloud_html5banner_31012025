document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.registerPlugin(MotionPathHelper);

    const pathRects = document.querySelectorAll(".pathRects rect");
    let prevX = null;
    let prevY = null;
    const mainTl = gsap.timeline({ paused: true, onComplete: () => {
      gsap.delayedCall(5, () => {
        startMainTl();
      });
    } });
    const rects = gsap.utils.toArray(pathRects).reverse();
    const firstX = parseInt(rects[0].getAttribute("x"));
    const firstY = parseInt(rects[0].getAttribute("y"));
    let animStepInc = 0;
    const steps = rects.map((el, i) => {
        const item = {x: parseInt(el.getAttribute("x")) , y: parseInt(el.getAttribute("y"))};
        const currentX = item.x;
        const currentY = item.y;
        let angle90 = 0;
        let angleDeg = 0;
        if (prevX !== null && prevY !== null && (prevX !== currentX || prevY !== currentY)) {
            const dx = currentX - prevX;
            const dy = currentY - prevY;

            console.log(dx, dy);
            // Получить угол в радианах
            const angleRad = Math.atan2(dy, dx);

            // Получить угол в градусах от 0 до 360
            angleDeg = angleRad * (180 / Math.PI);
            if (angleDeg < 0) angleDeg += 360;
            console.log(`Угол: ${angleRad.toFixed(3)} рад, или ${angleDeg.toFixed(2)}°`);

            let direction = "";
            if (Math.abs(dx) > Math.abs(dy)) {
                direction = dx > 0 ? "right" : "left";
            } else {
                direction = dy > 0 ? "down" : "up";
            }
            // В приоритете Y direction
            console.log("👉 Направление:", direction);
            if (direction === "left") {
                angle90 = 90
            }
            if (direction === "right") {
                angle90 = -90
            }
            if (direction === "up") {
                angle90 = 180
            }
            if (direction === "down") {
                angle90 = 0
            }
        }
        prevX = currentX;
        prevY = currentY;


        if(i === 0){
            Array(3).fill().map((el, index, arr) => {
                mainTl.set(".snakeItem", {
                    x: item.x,
                    y: item.y - (arr.length - index),
                    autoAlpha: 1,
                }, animStepInc++);
            });
        }
        // if(item.y === 27){
        //     //mainTl.to({}, {duration:30}, animStepInc+=30);
        //     //mainTl.addPause(`yourLabel`, animStepInc - i);
        // }
        mainTl.set(".snakeItem", {
            x: item.x,
            y: item.y,
            delay: function (i, el) {
                return i;
            },
            transformOrigin: '50% 50%',
            rotation: function (i, el) {
                if(el.classList.contains('snakeHead')){
                    if(el.classList.contains('snakeHeadStart') || el.classList.contains('snakeHeadEnd')){
                        return angleDeg - 90;
                        return angle90;
                    }
                    return 0;
                }else{
                    return 0;
                }
            }
        }, animStepInc++);
        if(i === rects.length - 1){
            Array(4).fill().map((el, index, arr) => {
                mainTl.set(".snakeItem", {
                    x: item.x,
                    y: item.y + index,
                    delay: function (i, el) {
                        return i;
                    }
                }, animStepInc++);
            });
        }
        return item;
    })

    // ############## INIT CONTROLLER ##############
    // DEVELOP MODE
    // import("gsap-trial/GSDevTools").then(({GSDevTools}) => {
    //     gsap.registerPlugin(GSDevTools);
    //     if (mainTl) {
    //         GSDevTools.create({animation: mainTl, minimal: false});
    //     }
    // }).catch((error) => console.error("Ошибка загрузки GSDevTools:", error));
    //console.log('steps', steps);
    // mainTl.timeScale(30).tweenTo(82, {
    //     onComplete: function() {
    //         mainTl.delay(10).play();
    //     },
    // });
    const startMainTl = () => {
        mainTl.timeScale(30).tweenFromTo(0, 82).eventCallback("onComplete", () => {
          gsap.delayedCall(5, () => {
            mainTl.play(82);
          });
        });
    }
    startMainTl();
    // mainTl.play().timeScale(20);
    // mainTl.eventCallback('onUpdate', function (event) {
    //     console.log('update', mainTl.progress());
    // })
});


// document.addEventListener("DOMContentLoaded", (event) => {
//     gsap.registerPlugin(MotionPathPlugin);
//     gsap.registerPlugin(MotionPathHelper);
//
//     const container = document.querySelector(".animation");
//     const unit = container.clientWidth / 10;
//     let prevX = null;
//     let prevY = null;
//     const steps = [
//         {x: 1 * unit, y: 0},
//         {x: 2 * unit, y: 0},
//         {x: 3 * unit, y: 0},
//         {x: 3 * unit, y: 1 * unit},
//     ]
//     console.log('unit', unit);
//     const tween = gsap.to(".head", {
//         motionPath: {
//             path: steps,
//             type: "linear",             // ❗Обязательный параметр для прямых линий
//             autoRotate: false,          // отключает поворот головы
//             alignOrigin: [0.5, 0]       // необязательно, если align не задан
//         },
//         onUpdate: function () {
//             const el = this.targets()[0];
//             const currentX = gsap.getProperty(el, "x");
//             const currentY = gsap.getProperty(el, "y");
//
//             if (prevX !== null && prevY !== null && (prevX !== currentX || currentY !== currentY)) {
//                 const dx = currentX - prevX;
//                 const dy = currentY - prevY;
//
//                 let direction = "";
//                 if (Math.abs(dx) > Math.abs(dy)) {
//                     direction = dx > 0 ? "right" : "left";
//                 } else {
//                     direction = dy > 0 ? "down" : "up";
//                 }
//                 console.log("👉 Направление:", direction);
//                 let r = 0;
//                 if(direction === "left") { r = 90 }
//                 if(direction === "right") { r = -90 }
//                 if(direction === "top") { r = 180 }
//                 if(direction === "down") { r = 0 }
//                 gsap.set(el, { rotation: r });
//             }
//
//             prevX = currentX;
//             prevY = currentY;
//         },
//         ease: `steps(${steps.length})`,
//         transformOrigin: "50% 0%",
//         duration: 3,
//     });
//
//     MotionPathHelper.create(tween);
// });
