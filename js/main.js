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

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        
        // Pause previous video
        const currentVideo = currentSlide.querySelector('video');
        if (currentVideo) currentVideo.pause();
        
        // Play new video
        const targetVideo = targetSlide.querySelector('video');
        if (targetVideo) {
            targetVideo.preload = "auto";
            targetVideo.play().catch(e => console.log("Autoplay prevented"));
        }
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };

    nextButton.addEventListener('click', e => {
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
    });

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.active');
        let prevDot = currentDot.previousElementSibling;

        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
            prevDot = dots[dots.length - 1];
        }

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });

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
    }, 5000);

    /* =========================================
       "Tech Wave" Animation
       ========================================= */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        }
        window.addEventListener('resize', resize);

        // Config
        const particleCount = 200; // Dense wave
        const waveSpeed = 0.02;
        const waveAmplitude = 50;
        const waveFrequency = 0.01;

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: height / 2, // Start in middle
                    baseY: (Math.random() * height * 0.5) + (height * 0.25), // Spread vertically
                    size: Math.random() * 2,
                    speed: (Math.random() * 0.5) + 0.2,
                    offset: Math.random() * 100 // Phase offset
                });
            }
        }
        init();

        let time = 0;

        function animate() {
            // Trail effect (optional, or clear completely)
            // ctx.clearRect(0, 0, width, height); 
            ctx.fillStyle = 'rgba(10, 10, 10, 0.2)'; // Heavy trail for smooth flow look
            ctx.fillRect(0, 0, width, height);

            time += waveSpeed;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // 3D Wave Formula
                // Combine Sine waves
                p.y = p.baseY +
                    Math.sin(p.x * waveFrequency + time + p.offset) * waveAmplitude * Math.sin(time * 0.5);

                // Move horizontally
                p.x += p.speed;
                if (p.x > width) p.x = 0;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Color gradient based on X position
                const ratio = p.x / width;
                // Purple (139, 92, 246) to Blue (6, 182, 212)
                const r = 139 + (6 - 139) * ratio;
                const g = 92 + (182 - 92) * ratio;
                const b = 246 + (212 - 246) * ratio;

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
                ctx.fill();
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Video Lazy Loading and Playback on Scroll
    const lazyVideos = document.querySelectorAll('video.lazy-video');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const video = entry.target;
                
                // If it's a carousel video, only play if it's the active slide
                const isCarouselVideo = video.closest('.carousel-slide');
                const isCurrentSlide = isCarouselVideo ? isCarouselVideo.classList.contains('current-slide') : true;

                if (entry.isIntersecting && isCurrentSlide) {
                    video.preload = "auto";
                    video.play().catch(e => {
                        console.log("Autoplay prevented", e);
                    });
                } else {
                    video.pause();
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });

        lazyVideos.forEach(video => {
            videoObserver.observe(video);
        });
    } else {
        // Fallback for older browsers
        lazyVideos.forEach(video => {
            video.preload = "auto";
            video.play().catch(e => {});
        });
    }

    // Attempt to play the very first carousel video immediately
    setTimeout(() => {
        const firstVideo = document.querySelector('.carousel-slide.current-slide video');
        if (firstVideo) {
            firstVideo.preload = "auto";
            firstVideo.play().catch(e => {});
        }
    }, 500);
});
