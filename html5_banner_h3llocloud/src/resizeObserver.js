const container = document.querySelector('.banner');
const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const aspectRatio = width / height;
        if(width < 321 && height > 40) {}
        if (aspectRatio > 1.5) {
            entry.target.classList.add('wide');
        } else {
            entry.target.classList.remove('wide');
        }
    }
});

observer.observe(container);
