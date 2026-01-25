document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Projects Carousel
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        // Continuous loop, so we don't hide arrows
        // But if we wanted to:
        // if (targetIndex === 0) {
        //     prevButton.classList.add('is-hidden');
        //     nextButton.classList.remove('is-hidden');
        // } else if (targetIndex === slides.length - 1) {
        //     prevButton.classList.remove('is-hidden');
        //     nextButton.classList.add('is-hidden');
        // } else {
        //     prevButton.classList.remove('is-hidden');
        //     nextButton.classList.remove('is-hidden');
        // }
    };

    // Next Button Click
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.active');
        let nextDot = currentDot.nextElementSibling;
        let nextIndex = slides.indexOf(nextSlide);

        // Loop back to start
        if (!nextSlide) {
            nextSlide = slides[0];
            nextDot = dots[0];
            nextIndex = 0;
        }

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    });

    // Prev Button Click
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.active');
        let prevDot = currentDot.previousElementSibling;
        let prevIndex = slides.indexOf(prevSlide);

        // Loop to end
        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
            prevDot = dots[dots.length - 1];
            prevIndex = slides.length - 1;
        }

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });

    // Dot Nav Click
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.active');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });

    // Auto Play
    setInterval(() => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.active');
        let nextDot = currentDot.nextElementSibling;

        if (!nextSlide) {
            nextSlide = slides[0];
            nextDot = dots[0];
        }

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }, 5000); // Change slide every 5 seconds

    // Video Playback Handling
    // Ensure the video in the active slide is playing, others are paused?
    // Doing this might be resource intensive but 'autoplay' attribute handles it mostly.
});
