/* ========================================
   For Nilu - Subtle Interactions
   ======================================== */

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to sections that should animate
    const animatedSections = document.querySelectorAll(
        '.poetry-section, .gallery, .message-section, .final-section'
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
});
