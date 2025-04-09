document.addEventListener("DOMContentLoaded", (event) => {
    const tls = [];
    const containers = document.querySelectorAll(".banner");
    containers.forEach((container) => {
        const pathRects = container.querySelectorAll(".pathRects rect");
        const snakeItems = container.querySelectorAll(".snakeItem");
        let prevX = null;
        let prevY = null;
        const mainTl = gsap.timeline({
            id: container.className.replace(' ', '')+'',
            paused: true,
            // onComplete: () => {
            //     gsap.delayedCall(0.1, () => {
            //         startMainTl();
            //     });
            // },
            onReverseComplete: () => {
                //console.log('reverse complete');
                gsap.delayedCall(0.1, () => {
                    mainTl.invalidate();
                    startMainTl();
                });
            },
        });
        const rects = gsap.utils.toArray(pathRects);
        const firstX = parseInt(rects[0].getAttribute("x"));
        const firstY = parseInt(rects[0].getAttribute("y"));
        let animStepInc = 0;
        const steps = rects.map((el, i) => {
            const item = {x: parseInt(el.getAttribute("x")), y: parseInt(el.getAttribute("y"))};
            const currentX = item.x;
            const currentY = item.y;
            let angle90 = 0;
            let angleDeg = null;
            if (prevX !== null && prevY !== null && (prevX !== currentX || prevY !== currentY)) {
                const dx = currentX - prevX;
                const dy = currentY - prevY;

                //console.log(dx, dy);
                // Получить угол в радианах
                const angleRad = Math.atan2(dy, dx);

                // Получить угол в градусах от 0 до 360
                angleDeg = angleRad * (180 / Math.PI);
                if (angleDeg < 0) angleDeg += 360;
                //console.log(`Угол: ${angleRad.toFixed(3)} рад, или ${angleDeg.toFixed(2)}°`);

                let direction = "";
                if (Math.abs(dx) > Math.abs(dy)) {
                    direction = dx > 0 ? "right" : "left";
                } else {
                    direction = dy > 0 ? "down" : "up";
                }
                // В приоритете Y direction
                //console.log("👉 Направление:", direction);
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

            if (i === 0) {
                // Array(30).fill().map((el, index, arr) => {
                //     mainTl.set(".snakeItem", {
                //         x: item.x,
                //         y: item.y - (arr.length - index),
                //         autoAlpha: 1,
                //     }, animStepInc++);
                // });
                Array(30).fill().map((el, index, arr) => {
                    //console.log('animStepInc', animStepInc, i);
                    mainTl.set(snakeItems, {
                        x: item.x,
                        y: item.y + (arr.length - index),
                        autoAlpha: 1,
                        delay: function (i, el) {
                            return i;
                        }
                    }, animStepInc++);
                });
            }
            // if(item.y === 27){
            //     //mainTl.to({}, {duration:30}, animStepInc+=30);
            //     //mainTl.addPause(`yourLabel`, animStepInc - i);
            // }
            //console.log('animStepInc', animStepInc, i);
            mainTl.set(snakeItems, {
                x: item.x,
                y: item.y,
                delay: function (i, el) {
                    return i;
                },
                transformOrigin: '50% 50%',
                rotation: function (i, el) {
                    if (el.classList.contains('snakeHead')) {
                        if (el.classList.contains('snakeHeadStart') || el.classList.contains('snakeHeadEnd')) {
                            return angleDeg !== null ? angleDeg - 270 : 0;
                            //return angle90;
                        }
                        return 0;
                    } else {
                        return 0;
                    }
                }
            }, animStepInc++);
            if (i === rects.length - 1) {
                Array(30).fill().map((el, index, arr) => {
                    mainTl.set(snakeItems, {
                        x: item.x,
                        y: item.y - index,
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
        //         GSDevTools.create({animation: mainTl});
        //     }
        // }).catch((error) => console.error("Ошибка загрузки GSDevTools:", error));

        mainTl.timeScale(24);
        const startMainTl = () => {
            mainTl.tweenFromTo(0, 101.5).eventCallback("onComplete", () => {
                gsap.delayedCall(3, () => {
                    //mainTl.invalidate();
                    mainTl.reverse();
                });
            });
        }
        startMainTl();

        tls.push(mainTl);
    })
});
