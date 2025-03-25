//helper function to build a grid of <div> elements
function buildGrid(vars) {
	vars = vars || {};
	var container = document.createElement("div"),
		rows = vars.grid[0] || 5,
		cols = vars.grid[1] || 5,
		width = vars.width || 100,
		gutter = vars.gutter || 1,
    className = vars.className || "",
		w = (width - cols * gutter) / cols,
		parent = (typeof(vars.parent) === "string") ? document.querySelector(vars.parent) : vars.parent ? vars.parent : document.body,
		css = "display: inline-block; margin: 0 " + (gutter / width * 100) + "% " + (gutter / width * 100) + "% 0; width: " + (w / width * 100) + "%;",
		l = rows * cols,
		i, box;
	for (i = 0; i < l; i++) {
		box = document.createElement("div");
		box.style.cssText = css;
    box.setAttribute("class", className);
    box.index = i;
    box.setAttribute("data-index", i);
    if (vars.onCellClick) {
      box.addEventListener("click", vars.onCellClick);
    }
		container.appendChild(box);
	}
	container.style.cssText = "width:" + width + "px; line-height: 0; padding:" + gutter + "px 0 0 " + gutter + "px; display:inline-block;";
	parent.appendChild(container);
	return container;
}

var grid = [5,13], //[rows, columns]
    tl = gsap.timeline({repeat: -1, repeatDelay: 0.5});
buildGrid({grid: grid, className: "box", width: 1000, gutter: 15, parent: ".animation"});
tl.to(".box", {
      duration: 1,
      scale: 0.1,
      y: 60,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
      stagger: {
        amount: 1.5,
        grid: grid,
        axis: axis,
        ease: ease,
        from: "random"
      }
    }
  );

//this just helps avoid the pixel-snapping that some browsers do.
gsap.set(".box", {rotation: 0.5, force3D: true});

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
