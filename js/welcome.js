// welcome.js - GSAP animated welcome screen for Apex OS
// This script is loaded after successful login, before dashboard.html

document.addEventListener('DOMContentLoaded', function () {
    // Only show if flag is set (from login)
    if (!localStorage.getItem('apexShowWelcome')) {
        window.location.href = 'dashboard.html';
        return;
    }
    localStorage.removeItem('apexShowWelcome');
    const welcomeDiv = document.createElement('div');
    welcomeDiv.id = 'apex-welcome-screen';
    welcomeDiv.style.position = 'fixed';
    welcomeDiv.style.top = '0';
    welcomeDiv.style.left = '0';
    welcomeDiv.style.width = '100vw';
    welcomeDiv.style.height = '100vh';
    // Solid modern color (replace with a new one, e.g. #232946)
    welcomeDiv.style.background = '#232946';
    welcomeDiv.style.display = 'flex';
    welcomeDiv.style.flexDirection = 'column';
    welcomeDiv.style.alignItems = 'center';
    welcomeDiv.style.justifyContent = 'center';
    welcomeDiv.style.overflow = 'hidden';
    // Centered, thin font style
    welcomeDiv.innerHTML = `
        <div id="welcome-to-text" style="font-size:2.1rem;color:#bfcaff;opacity:0;letter-spacing:2px;font-weight:300;font-family:'Mulish', 'Segoe UI', Arial, sans-serif;text-align:center;">Welcome to</div>
        <div id="apexos-text" style="font-size:4.2rem;color:#fff;font-weight:200;opacity:0;letter-spacing:4px;text-shadow:0 4px 32px #2d3a7b80;text-align:center;font-family:'Mulish', 'Segoe UI', Arial, sans-serif;">Apex OS</div>
    `;
    document.body.appendChild(welcomeDiv);

    // Animate with GSAP (fade out welcome, fade in dashboard)
    gsap.to('#welcome-to-text', { duration: 1, opacity: 1, y: 0, ease: 'power2.out' });
    gsap.fromTo('#apexos-text', { scale: 0.7, y: 40 }, {
        delay: 1.1,
        duration: 1.2,
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'expo.out',
        onStart: function () { },
        onComplete: function () {
            setTimeout(() => {
                gsap.to('#apex-welcome-screen', {
                    duration: 0.7,
                    opacity: 0,
                    pointerEvents: 'none',
                    onComplete: function () {
                        document.getElementById('apex-welcome-screen').remove();
                        // Fade in dashboard body
                        document.body.style.opacity = 0;
                        window.location.href = 'dashboard.html';
                    }
                });
            }, 1200);
        }
    });
});
