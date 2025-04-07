var target = document.querySelectorAll('.banner');

target.forEach((el, i) => {
    var mainTl = gsap.timeline({
        paused: true,
        yoyo: false,
        repeat: 0,
        repeatDelay: 0,
        immediateRender: false,
        defaults: {
            ease: "Power1.easeInOut",
        }
    });
    mainTl.fromTo(el.querySelector('.man'),
{ autoAlpha: 0, x: -10} ,
  { autoAlpha: 1, duration: 1.5, delay: 0.2, x: 0 });


    var target = el;
    var alreadyTriggered = false;

    function checkVisibility() {
        if (alreadyTriggered) return;

        var rect = target.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Сколько пикселей элемента видно
        var visiblePixels = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

        if (visiblePixels > 0) {
          var visibleRatio = visiblePixels / rect.height;

          if (visibleRatio >= 0.3) {
            // 'Более 30% элемента видно (фоллбек для IE10)'
            alreadyTriggered = true;
            mainTl.play();
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
          }
        }
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    window.addEventListener('load', checkVisibility);
})
