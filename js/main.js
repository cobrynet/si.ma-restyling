// Main JavaScript file for SI.MA Restyling

// Smooth scrolling for navigation links
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

// Unified scroll handler
window.addEventListener('scroll', () => {
    // Header shrink on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // About section fade-in animation
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.75) {
            aboutSection.classList.add('visible');
        }
    }

    // Story box slide-in animation from left
    const storyBox = document.querySelector('.story-box');
    if (storyBox) {
        const rect = storyBox.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.8) {
            storyBox.classList.add('visible');
        }
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Van scroll animation effect
    const vanSection = document.querySelector('.about-section');
    const vanImage = document.querySelector('.about-image');
    
    if (vanSection && vanImage) {
        const rect = vanSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Start when about section is visible
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate scroll progress through the section
                // Ritarda ulteriormente l'inizio dell'animazione e rallenta la velocità
                const startOffset = 0.65; // 0 = subito, 0.65 = dopo che il 65% è visibile
                const rawProgress = ((windowHeight - rect.top) / (windowHeight + rect.height * 0.5) - startOffset) / (1 - startOffset);
                const effectiveProgress = Math.max(0, Math.min(1, rawProgress * 0.15)); // Rallenta al 15% della velocità
                // Move van from destra (60vw) a sinistra (-150vw, completamente fuori), velocità rallentata
                const translateX = 60 - (effectiveProgress * 350); // Range: 60vw to -150vw (esce completamente)
                vanImage.style.transform = `translateX(${translateX}vw)`;
                console.log('Van translateX:', translateX + 'vw', 'Progress:', effectiveProgress);
        }
    }
});

// Console message
console.log('SI.MA Restyling - Website initialized');
