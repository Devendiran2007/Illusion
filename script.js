

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
    document.body.insertAdjacentHTML('beforeend');
    
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
