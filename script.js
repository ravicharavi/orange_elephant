// Smooth scroll and fade-in animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.services, .palan-section, .about');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Shooting stars mouse animation
    initShootingStars();
});

// Shooting Stars Mouse Animation
function initShootingStars() {
    const container = document.getElementById('shooting-stars');
    if (!container) return;

    let lastTime = 0;
    const throttleDelay = 50; // milliseconds between stars

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        
        if (currentTime - lastTime < throttleDelay) return;
        lastTime = currentTime;

        // Create shooting star
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Random direction from cursor
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        
        star.style.left = e.clientX + 'px';
        star.style.top = e.clientY + 'px';
        star.style.setProperty('--dx', dx + 'px');
        star.style.setProperty('--dy', dy + 'px');
        
        container.appendChild(star);
        
        // Remove after animation
        setTimeout(() => {
            star.remove();
        }, 1000);
    });
}
