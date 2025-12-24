/**
 * Fix Cookie Preferences Link Z-Index
 * NASCONDE il link quando il banner è visibile, lo mostra quando il banner è nascosto
 */

(function() {
    'use strict';
    
    function fixCookieLink() {
        // Trova il link cookie
        const cookieLinks = document.querySelectorAll('.lb-cs-settings-link, .mobile-footer-cookie-settings');
        
        // Trova il banner Legalblink
        const banner = document.querySelector('[id*="lb-cs-banner"], [class*="lb-cs-banner"], [id*="legalblink"]');
        
        // Trova la modale
        const modal = document.querySelector('[id*="lb-cs-modal"], [class*="lb-cs-modal"]');
        
        cookieLinks.forEach(link => {
            if (banner || modal) {
                // Se banner o modale sono visibili, NASCONDI il link
                const bannerVisible = banner && window.getComputedStyle(banner).display !== 'none';
                const modalVisible = modal && window.getComputedStyle(modal).display !== 'none';
                
                if (bannerVisible || modalVisible) {
                    // NASCONDI completamente il link
                    link.style.setProperty('display', 'none', 'important');
                    link.style.setProperty('visibility', 'hidden', 'important');
                    link.style.setProperty('opacity', '0', 'important');
                } else {
                    // Mostra il link quando banner/modale sono nascosti
                    link.style.setProperty('display', '', 'important');
                    link.style.setProperty('visibility', 'visible', 'important');
                    link.style.setProperty('opacity', '1', 'important');
                }
            }
            
            // FORZA sempre z-index basso
            link.style.setProperty('z-index', '1', 'important');
        });
        
        // FORZA z-index ALTO per banner
        if (banner) {
            banner.style.setProperty('z-index', '999999', 'important');
        }
        
        // FORZA z-index ALTISSIMO per modale
        if (modal) {
            modal.style.setProperty('z-index', '9999999', 'important');
        }
    }
    
    // Esegui continuamente ogni 50ms
    setInterval(fixCookieLink, 50);
    
    // Esegui immediatamente
    fixCookieLink();
    
    // Observer per cambiamenti DOM
    const observer = new MutationObserver(fixCookieLink);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'id']
    });
    
    // Eventi
    document.addEventListener('DOMContentLoaded', fixCookieLink);
    window.addEventListener('load', fixCookieLink);
    document.addEventListener('click', fixCookieLink);
    
    console.log('🔧 Cookie Link Fix: NASCONDI quando banner visibile');
})();
