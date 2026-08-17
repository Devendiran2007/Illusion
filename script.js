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
});
