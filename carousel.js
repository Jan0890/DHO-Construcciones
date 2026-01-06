document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    let index = 0;

    function scrollToSlide(i) {
        const slide = slides[i];
        if (!slide) return;
        track.scrollTo({
            left: slide.offsetLeft - track.offsetLeft,
            behavior: 'smooth'
        });
    }

    prevBtn.addEventListener('click', () => {
        index = Math.max(index - 1, 0);
        scrollToSlide(index);
    });

    nextBtn.addEventListener('click', () => {
        index = Math.min(index + 1, slides.length - 1);
        scrollToSlide(index);
    });

    // Detecta el slide más cercano cuando el usuario hace scroll manual
    track.addEventListener('scroll', () => {
        const scrollLeft = track.scrollLeft;
        let closest = 0;
        let minDist = Infinity;

        slides.forEach((slide, i) => {
            const dist = Math.abs(slide.offsetLeft - scrollLeft);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });

        index = closest;
    });
});