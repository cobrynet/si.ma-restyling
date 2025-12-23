// Main JavaScript file for SI.MA Restyling

// Detect Android and add class to body for Android-specific CSS
if (/android/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('android');
}

// Smooth scrolling for mobile arrow
document.addEventListener('DOMContentLoaded', function() {
    const mobileArrow = document.querySelector('.mobile-arrow');
    console.log('Mobile arrow found:', mobileArrow); // Debug
    
    if (mobileArrow) {
        console.log('Adding click listener to mobile arrow'); // Debug
        mobileArrow.addEventListener('click', function(e) {
            console.log('Arrow clicked!'); // Debug
            e.preventDefault();
            
            // Scroll to the target section
            window.scrollTo({
                top: 900,
                behavior: 'smooth'
            });
        });
    } else {
        console.log('Mobile arrow NOT found'); // Debug
    }
});

// Unified scroll handler
function checkAnimations() {
    const windowHeight = window.innerHeight;
    
    // About section fade-in animation
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < windowHeight * 0.75) {
            aboutSection.classList.add('visible');
        }
    }

    // Story box slide-in animation from left
    const storyBox = document.querySelector('.story-box');
    if (storyBox) {
        const rect = storyBox.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8) {
            storyBox.classList.add('visible');
        }
    }

    // Reliability section fade-in animation
    const reliabilitySection = document.querySelector('.reliability-section');
    if (reliabilitySection) {
        const rect = reliabilitySection.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8) {
            reliabilitySection.classList.add('visible');
        }
    }

    // Blue box animation for nuovo-usato page
    const blueBox = document.querySelector('.blue-box');
    if (blueBox) {
        const rect = blueBox.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8) {
            blueBox.classList.add('visible');
        }
    }

    // Map animation for contatti page
    const mapLink = document.querySelector('.mappa-link');
    if (mapLink) {
        const rect = mapLink.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8) {
            mapLink.classList.add('visible');
        }
    }
}

window.addEventListener('scroll', () => {
    // Header shrink on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Check all animations
    checkAnimations();

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

// Check animations on page load
window.addEventListener('load', () => {
    checkAnimations();
});

// Copy to clipboard function for contact cards
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Copiato';
        
        // Add notification to the card
        element.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 1.5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                element.removeChild(notification);
            }, 300);
        }, 1500);
    }).catch(err => {
        console.error('Errore nella copia: ', err);
    });
}

// Mobile Side Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const sideMenu = document.querySelector('.mobile-side-menu');
    const closeButton = document.querySelector('.mobile-side-menu-close');
    const overlay = document.querySelector('.mobile-side-menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');

    // Open menu
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            sideMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    // Close menu function
    function closeMenu() {
        sideMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close menu when clicking close button
    if (closeButton) {
        closeButton.addEventListener('click', closeMenu);
    }

    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Button click effect for "Richiedi assistenza"
    const primaryButtons = document.querySelectorAll('.btn-primary, .mobile-btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add clicked class
            this.classList.add('clicked');
            
            // Remove clicked class after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });

    // Clean up any inline styles on btn-secondary links that might interfere with CSS hover
    const secondaryLinks = document.querySelectorAll('a.btn-secondary');
    secondaryLinks.forEach(link => {
        // Remove any inline border-bottom style
        link.style.removeProperty('border-bottom');
        link.style.removeProperty('text-decoration');
    });
});

// Console message
console.log('SI.MA Restyling - Website initialized');

// Cookie preferences - Legalblink handles .lb-cs-settings-link automatically
// No custom JavaScript needed - the class itself triggers the modal
