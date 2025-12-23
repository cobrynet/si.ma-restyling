/**
 * Cookie Consent Solution for SI.MA
 * Simple, lightweight, GDPR compliant
 */

(function() {
    'use strict';
    
    const COOKIE_NAME = 'sima_cookie_consent';
    const COOKIE_DURATION = 365; // days
    
    // Create banner HTML
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <p>Questo sito utilizza cookie tecnici e, previo tuo consenso, cookie di profilazione di terze parti per migliorare la tua esperienza di navigazione. 
                    Per maggiori informazioni consulta la <a href="/cookie-policy" target="_blank">Cookie Policy</a> e la <a href="/privacy-policy" target="_blank">Privacy Policy</a>.</p>
                </div>
                <div class="cookie-banner-buttons">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Accetta tutti</button>
                    <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">Rifiuta</button>
                    <button id="cookie-settings" class="cookie-btn cookie-btn-link">Personalizza</button>
                </div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.15);
                padding: 20px;
                z-index: 999999;
                animation: slideUp 0.3s ease-out;
            }
            
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            
            .cookie-banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                gap: 20px;
                flex-wrap: wrap;
            }
            
            .cookie-banner-text {
                flex: 1;
                min-width: 300px;
            }
            
            .cookie-banner-text p {
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
            }
            
            .cookie-banner-text a {
                color: #007bff;
                text-decoration: underline;
            }
            
            .cookie-banner-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .cookie-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s;
            }
            
            .cookie-btn-primary {
                background: #007bff;
                color: white;
            }
            
            .cookie-btn-primary:hover {
                background: #0056b3;
            }
            
            .cookie-btn-secondary {
                background: #6c757d;
                color: white;
            }
            
            .cookie-btn-secondary:hover {
                background: #5a6268;
            }
            
            .cookie-btn-link {
                background: transparent;
                color: #007bff;
                text-decoration: underline;
            }
            
            .cookie-btn-link:hover {
                color: #0056b3;
            }
            
            /* Settings Modal */
            #cookie-settings-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999999;
                padding: 20px;
                animation: fadeIn 0.3s ease-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .cookie-settings-content {
                background: white;
                border-radius: 8px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                padding: 30px;
            }
            
            .cookie-settings-content h2 {
                margin-top: 0;
                color: #333;
            }
            
            .cookie-category {
                margin: 20px 0;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            
            .cookie-category-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .cookie-category h3 {
                margin: 0;
                font-size: 16px;
                color: #333;
            }
            
            .cookie-category p {
                margin: 5px 0 0 0;
                font-size: 14px;
                color: #666;
            }
            
            .cookie-toggle {
                position: relative;
                width: 50px;
                height: 26px;
            }
            
            .cookie-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .cookie-toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 26px;
            }
            
            .cookie-toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            .cookie-toggle input:checked + .cookie-toggle-slider {
                background-color: #007bff;
            }
            
            .cookie-toggle input:checked + .cookie-toggle-slider:before {
                transform: translateX(24px);
            }
            
            .cookie-toggle input:disabled + .cookie-toggle-slider {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .cookie-settings-buttons {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-top: 20px;
            }
            
            @media (max-width: 768px) {
                .cookie-banner-content {
                    flex-direction: column;
                }
                
                .cookie-banner-buttons {
                    width: 100%;
                    flex-direction: column;
                }
                
                .cookie-btn {
                    width: 100%;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(banner);
        
        // Attach event listeners
        document.getElementById('cookie-accept-all').addEventListener('click', acceptAll);
        document.getElementById('cookie-reject-all').addEventListener('click', rejectAll);
        document.getElementById('cookie-settings').addEventListener('click', showSettings);
    }
    
    // Create settings modal
    function createSettingsModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="cookie-settings-content">
                <h2>Preferenze Cookie</h2>
                <p>Utilizza le opzioni seguenti per personalizzare le tue preferenze sui cookie.</p>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h3>Cookie Tecnici</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookie-necessary" checked disabled>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p>Questi cookie sono necessari per il funzionamento del sito e non possono essere disattivati.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h3>Cookie Analitici</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookie-analytics">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p>Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito raccogliendo informazioni in forma anonima.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h3>Cookie di Marketing</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookie-marketing">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p>Questi cookie vengono utilizzati per mostrare annunci pubblicitari pertinenti ai tuoi interessi.</p>
                </div>
                
                <div class="cookie-settings-buttons">
                    <button class="cookie-btn cookie-btn-secondary" id="cookie-modal-close">Annulla</button>
                    <button class="cookie-btn cookie-btn-primary" id="cookie-save-preferences">Salva preferenze</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.getElementById('cookie-modal-close').addEventListener('click', closeModal);
        document.getElementById('cookie-save-preferences').addEventListener('click', savePreferences);
    }
    
    function showSettings() {
        // Remove banner if present
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.remove();
        }
        
        // Create or show modal
        let modal = document.getElementById('cookie-settings-modal');
        if (!modal) {
            createSettingsModal();
            modal = document.getElementById('cookie-settings-modal');
        }
        
        // Load current preferences
        const consent = getCookieConsent();
        if (consent) {
            document.getElementById('cookie-analytics').checked = consent.analytics;
            document.getElementById('cookie-marketing').checked = consent.marketing;
        }
        
        modal.style.display = 'flex';
    }
    
    function closeModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    function acceptAll() {
        setConsent({ necessary: true, analytics: true, marketing: true });
        removeBanner();
    }
    
    function rejectAll() {
        setConsent({ necessary: true, analytics: false, marketing: false });
        removeBanner();
    }
    
    function savePreferences() {
        const consent = {
            necessary: true, // always true
            analytics: document.getElementById('cookie-analytics').checked,
            marketing: document.getElementById('cookie-marketing').checked
        };
        setConsent(consent);
        closeModal();
    }
    
    function setConsent(consent) {
        const consentData = {
            ...consent,
            timestamp: new Date().toISOString()
        };
        
        // Save to cookie
        const expires = new Date();
        expires.setDate(expires.getDate() + COOKIE_DURATION);
        document.cookie = `${COOKIE_NAME}=${JSON.stringify(consentData)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
        
        console.log('Cookie consent saved:', consentData);
    }
    
    function getCookieConsent() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === COOKIE_NAME) {
                try {
                    return JSON.parse(decodeURIComponent(value));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }
    
    function removeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => banner.remove(), 300);
        }
    }
    
    // Initialize
    function init() {
        const consent = getCookieConsent();
        
        if (!consent) {
            // No consent yet, show banner
            createBanner();
        }
        
        // Attach to settings links
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('lb-cs-settings-link')) {
                e.preventDefault();
                showSettings();
            }
        });
        
        console.log('Cookie consent initialized');
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Add slideDown animation
    const slideDownStyle = document.createElement('style');
    slideDownStyle.textContent = `
        @keyframes slideDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(slideDownStyle);
})();
