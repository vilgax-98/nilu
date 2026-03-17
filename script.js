/* ========================================
   For Nilu - Subtle Interactions
   ======================================== */

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to sections that should animate
    const animatedSections = document.querySelectorAll(
        '.poetry-section, .gallery, .message-section, .final-section, .gallery--album'
    );
    
    animatedSections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Create observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once animated, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Subtle parallax on hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }

    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('startBtn');
    const mainContent = document.getElementById('mainContent');
    const siteContent = document.getElementById('siteContent');

    if (siteContent) {
        siteContent.hidden = true;
    }
    if (mainContent) {
        mainContent.classList.remove('is-visible');
    }

    // Celebration overlay handler
    const celebrationOverlay = document.getElementById('celebrationOverlay');
    const closeCelebrationBtn = document.getElementById('closeCelebration');

    const showCelebration = () => {
        if (celebrationOverlay) {
            celebrationOverlay.classList.add('active');
            celebrationOverlay.removeAttribute('aria-hidden');
            triggerIntenseConfetti();
        }
    };

    // Intense confetti burst for celebration
    const triggerIntenseConfetti = () => {
        const confettiContainer = document.querySelector('.confetti');
        if (!confettiContainer) return;

        const colors = ['#ff6bd6', '#7bb7ff', '#6bffd8', '#ffd36b', '#ff69b4', '#00ff88'];
        const burstCount = 150;

        for (let i = 0; i < burstCount; i++) {
            const piece = document.createElement('span');
            piece.classList.add('confetti-piece');
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = 3 + Math.random() * 3;
            const drift = (Math.random() * 200) - 100;
            const color = colors[Math.floor(Math.random() * colors.length)];

            piece.style.left = `${left}%`;
            piece.style.setProperty('--fall-duration', `${duration}s`);
            piece.style.setProperty('--drift', `${drift}px`);
            piece.style.setProperty('--confetti-color', color);
            piece.style.animationDelay = `${delay}s`;

            confettiContainer.appendChild(piece);
        }
    };

    if (closeCelebrationBtn) {
        closeCelebrationBtn.addEventListener('click', () => {
            if (celebrationOverlay) {
                celebrationOverlay.classList.remove('active');
                celebrationOverlay.setAttribute('aria-hidden', 'true');
            }
            if (siteContent) {
                siteContent.hidden = false;
                siteContent.classList.add('revealed');
            }
            // Scroll to next section
            setTimeout(() => {
                const poetrySection = document.querySelector('.poetry-section');
                if (poetrySection) {
                    poetrySection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (loader) {
                loader.classList.add('hidden');
            }
            if (mainContent) {
                mainContent.classList.add('is-visible');
            }
            if (siteContent) {
                siteContent.hidden = false;
            }
        });
    }

    const typedTarget = document.getElementById('typedText');
    if (typedTarget) {
        const phrases = [
            'Happy Birthday to you!',
            'Have a wonderful day.',
            'Filled with joy and happiness.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const typeLoop = () => {
            const current = phrases[phraseIndex];
            if (!deleting) {
                charIndex += 1;
                typedTarget.textContent = current.slice(0, charIndex);
                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(typeLoop, 1200);
                    return;
                }
            } else {
                charIndex -= 1;
                typedTarget.textContent = current.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }
            setTimeout(typeLoop, deleting ? 50 : 90);
        };

        typeLoop();
    }

    const confettiCanvas = document.getElementById('confettiCanvas');
    if (confettiCanvas) {
        const ctx = confettiCanvas.getContext('2d');
        const confettiCount = 120;
        const confettiPieces = Array.from({ length: confettiCount }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 6 + 2,
            s: Math.random() * 0.6 + 0.2,
            c: `hsl(${Math.random() * 360}, 90%, 70%)`
        }));

        const resizeCanvas = () => {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        };

        const drawConfetti = () => {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiPieces.forEach(p => {
                p.y += p.s * 0.01;
                if (p.y > 1) {
                    p.y = -0.05;
                    p.x = Math.random();
                }
                ctx.beginPath();
                ctx.fillStyle = p.c;
                ctx.arc(p.x * confettiCanvas.width, p.y * confettiCanvas.height, p.r, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(drawConfetti);
        };

        resizeCanvas();
        drawConfetti();
        window.addEventListener('resize', resizeCanvas);
    }

    const enterSiteBtn = document.getElementById('enterSiteBtn');
    if (enterSiteBtn) {
        enterSiteBtn.addEventListener('click', () => {
            if (siteContent) {
                siteContent.hidden = false;
                siteContent.classList.add('revealed');
            }
            const poetrySection = document.querySelector('.poetry-section');
            if (poetrySection) {
                poetrySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
