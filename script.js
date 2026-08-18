// SCROLL INVERSION TRAP
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    window.scrollBy({
      top: -e.deltaY,
      left: -e.deltaX,
      behavior: 'auto'
    });
}, { passive: false });

// STATE MANAGEMENT
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounters();
}

function removeFromWishlist(id) {
    const wishlist = getWishlist();
    const newWishlist = wishlist.filter(i => i.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    updateCounters();
}

function updateCounters() {
    const counters = document.querySelectorAll('.wishlist-counter');
    counters.forEach(c => {
        c.innerText = getWishlist().length; // The trap is that it shows wishlist length on the cart icon
    });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    updateCounters();
    
    // Add hover evasion logic since CSS random() isn't widely supported yet
    const chasingButtons = document.querySelectorAll('.chasing-button');
    chasingButtons.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 100;
            btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    });

    // 6. TYPO GENERATOR
    const typoInputs = document.querySelectorAll('.typo-generator');
    typoInputs.forEach(input => {
        let keyCount = 0;
        input.addEventListener('input', (e) => {
            keyCount++;
            if (keyCount % 5 === 0) {
                const val = input.value;
                if (val.length > 0) {
                    const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                    input.value = val.slice(0, -1) + randomChar;
                }
            }
        });
    });

    // 6b. FOCUS EVASION
    const phantomInputs = document.querySelectorAll('.phantom-input');
    phantomInputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            if (Math.random() > 0.5) {
                setTimeout(() => {
                    input.blur();
                }, 200);
            }
        });
    });



    // 8. SCHRODINGER'S TOGGLE
    const schrodingerToggles = document.querySelectorAll('.schrodinger-toggle');
    schrodingerToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Wait for visual transition, then revert state invisibly
            setTimeout(() => {
                toggle.checked = !toggle.checked;
            }, 400);
        });
    });



    // 10. RECURRING COOKIE MODAL TRAP
    const modalHTML = `
        <div class="cookie-modal-overlay" id="evilCookieModal">
            <div class="cookie-modal-card">
                <h2 style="margin-bottom: 1rem;">We value your privacy (sort of)</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">By clicking "Accept", you agree to store cookies on your device to enhance site navigation, analyze site usage, and allow us to sell your data to the highest bidder.</p>
                <div style="position: relative; height: 50px; display: flex; justify-content: center; gap: 1rem;" id="cookieBtnContainer">
                    <button class="btn btn-primary" id="acceptCookiesBtn">Accept All</button>
                    <button class="btn btn-danger" id="declineCookiesBtn">Decline</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('evilCookieModal');
    let popupInterval;

    function showModal() {
        if (modal) modal.classList.add('active');
    }

    function hideModal() {
        if (modal) modal.classList.remove('active');
        clearInterval(popupInterval);
        popupInterval = setInterval(showModal, 45000);
    }

    setTimeout(showModal, 3000);
    popupInterval = setInterval(showModal, 45000);

    const acceptBtn = document.getElementById('acceptCookiesBtn');
    const declineBtn = document.getElementById('declineCookiesBtn');
    
    if (acceptBtn) acceptBtn.addEventListener('click', hideModal);
    if (declineBtn) declineBtn.addEventListener('click', hideModal);



    // 13. BUTTON ROULETTE
    const allButtons = document.querySelectorAll('.btn:not(.runaway-btn):not(.shrink-btn)');
    allButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if(Math.random() > 0.6) {
                const otherBtn = allButtons[Math.floor(Math.random() * allButtons.length)];
                const temp = btn.innerHTML;
                btn.innerHTML = otherBtn.innerHTML;
                otherBtn.innerHTML = temp;
            }
        });
    });

    // 14. FAKE NOTIFICATIONS
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if(Math.random() > 0.3 && !link.querySelector('.fake-badge')) {
            const badge = document.createElement('span');
            badge.classList.add('fake-badge');
            badge.innerText = Math.floor(Math.random() * 9) + 1;
            link.appendChild(badge);
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                badge.innerText = parseInt(badge.innerText) + 1;
            });
        }
    });

    // 15. INJECT OPTICAL ILLUSIONS
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        // Cafe Wall Divider
        const cafeWall = document.createElement('div');
        cafeWall.classList.add('cafe-wall-divider');
        mainContent.insertBefore(cafeWall, mainContent.firstChild);
        
        // Simultaneous Contrast
        const simContrast = document.createElement('div');
        simContrast.classList.add('simultaneous-contrast-container');
        simContrast.innerHTML = `<div class="simultaneous-contrast-bar">SOLID GREY</div>`;
        mainContent.appendChild(simContrast);
        
        // Ebbinghaus Illusion
        const ebbinghausHTML = `
            <div class="ebbinghaus-container">
                <div class="ebbinghaus-group ebbinghaus-large">
                    <div class="flanker"></div><div class="flanker"></div><div class="flanker"></div><div class="flanker"></div>
                    <button class="ebbinghaus-center chasing-button">BUY</button>
                </div>
                <div class="ebbinghaus-group ebbinghaus-small">
                    <div class="flanker"></div><div class="flanker"></div><div class="flanker"></div><div class="flanker"></div>
                    <button class="ebbinghaus-center chasing-button">BUY</button>
                </div>
            </div>
        `;
        mainContent.insertAdjacentHTML('beforeend', ebbinghausHTML);
    }
});
