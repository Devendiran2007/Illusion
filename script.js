"use strict";

/* =========================================================
   STATE MANAGEMENT
   ========================================================= */

/* Get cart */
function getCart() {
    try {
        return JSON.parse(
            localStorage.getItem("cart") || "[]"
        );
    } catch (error) {
        console.error("Could not read cart:", error);
        return [];
    }
}


/* Get wishlist */
function getWishlist() {
    try {
        return JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );
    } catch (error) {
        console.error("Could not read wishlist:", error);
        return [];
    }
}


/* Save cart */
function saveCart(cart) {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


/* Save wishlist */
function saveWishlist(wishlist) {
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}


/* =========================================================
   CART
   ========================================================= */

function addToCart(item) {

    const cart = getCart();

    /*
     * If the same product already exists,
     * increase its quantity.
     */

    const existingItem = cart.find(
        product => product.id === item.id
    );


    if (existingItem) {

        existingItem.quantity =
            (existingItem.quantity || 1) + 1;

    } else {

        cart.push({
            ...item,
            quantity: 1
        });

    }


    saveCart(cart);

    updateCounters();

    showMessage(
        "Product added to cart."
    );
}


/* Remove product from cart */
function removeFromCart(id) {

    const cart = getCart();

    const newCart = cart.filter(
        item => item.id !== id
    );

    saveCart(newCart);

    updateCounters();
}


/* Clear entire cart */
function clearCart() {

    localStorage.removeItem("cart");

    updateCounters();
}


/* =========================================================
   WISHLIST
   ========================================================= */

function addToWishlist(item) {

    const wishlist = getWishlist();

    const alreadyExists = wishlist.some(
        product => product.id === item.id
    );


    if (!alreadyExists) {

        wishlist.push(item);

        saveWishlist(wishlist);

        updateCounters();

        showMessage(
            "Product added to wishlist."
        );

    } else {

        showMessage(
            "Product is already in your wishlist."
        );

    }
}


/* Remove product from wishlist */
function removeFromWishlist(id) {

    const wishlist = getWishlist();

    const newWishlist = wishlist.filter(
        item => item.id !== id
    );

    saveWishlist(newWishlist);

    updateCounters();

    showMessage(
        "Product removed from wishlist."
    );
}


/* Clear wishlist */
function clearWishlist() {

    localStorage.removeItem("wishlist");

    updateCounters();
}


/* =========================================================
   COUNTERS
   ========================================================= */

function updateCounters() {

    const cart = getCart();

    const wishlist = getWishlist();


    /*
     * Cart counter
     *
     * Shows total number of products,
     * including quantities.
     */

    const cartCount = cart.reduce(
        (total, item) =>
            total + (item.quantity || 1),
        0
    );


    /*
     * Update cart counters
     */

    const cartCounters =
        document.querySelectorAll(
            ".cart-counter, .wishlist-counter"
        );


    cartCounters.forEach(counter => {

        /*
         * Your current HTML uses
         * .wishlist-counter for the cart icon.
         *
         * Therefore this keeps your existing
         * HTML working while showing CART count.
         */

        counter.innerText = cartCount;

    });


    /*
     * If you later create a real wishlist counter,
     * use .wishlist-count.
     */

    const wishlistCounters =
        document.querySelectorAll(
            ".wishlist-count"
        );


    wishlistCounters.forEach(counter => {

        counter.innerText =
            wishlist.length;

    });

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(message) {

    /*
     * Look for an existing message element.
     */

    let messageBox =
        document.getElementById(
            "siteMessage"
        );


    /*
     * Create one if it doesn't exist.
     */

    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.id =
            "siteMessage";

        messageBox.style.position =
            "fixed";

        messageBox.style.bottom =
            "30px";

        messageBox.style.right =
            "30px";

        messageBox.style.padding =
            "1rem 1.5rem";

        messageBox.style.background =
            "rgba(17, 24, 39, 0.95)";

        messageBox.style.color =
            "white";

        messageBox.style.border =
            "1px solid rgba(255,255,255,0.15)";

        messageBox.style.borderRadius =
            "10px";

        messageBox.style.zIndex =
            "999999";

        messageBox.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.3)";

        document.body.appendChild(
            messageBox
        );

    }


    messageBox.textContent = message;

    messageBox.style.display =
        "block";


    clearTimeout(
        window.siteMessageTimeout
    );


    window.siteMessageTimeout =
        setTimeout(() => {

            messageBox.style.display =
                "none";

        }, 2500);

}


/* =========================================================
   COOKIE MODAL
   ========================================================= */

let popupInterval = null;


function showModal() {

    const modal =
        document.getElementById(
            "evilCookieModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


function hideModal() {

    const modal =
        document.getElementById(
            "evilCookieModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    /*
     * Stop the previous timer.
     */

    if (popupInterval) {

        clearInterval(
            popupInterval
        );

    }


    /*
     * Show the modal again after
     * 45 seconds.
     */

    popupInterval =
        setInterval(
            showModal,
            45000
        );

}


/* =========================================================
   INITIALIZE COOKIE MODAL
   ========================================================= */

function initializeCookieModal() {

    const modal =
        document.getElementById(
            "evilCookieModal"
        );


    /*
     * If the current page doesn't
     * contain the modal, do nothing.
     */

    if (!modal) {
        return;
    }


    const acceptBtn =
        document.getElementById(
            "acceptCookiesBtn"
        );


    const declineBtn =
        document.getElementById(
            "declineCookiesBtn"
        );


    if (acceptBtn) {

        acceptBtn.addEventListener(
            "click",
            hideModal
        );

    }


    if (declineBtn) {

        declineBtn.addEventListener(
            "click",
            hideModal
        );

    }


    /*
     * First appearance after 3 seconds.
     */

    setTimeout(
        showModal,
        3000
    );


    /*
     * Repeat every 45 seconds.
     */

    popupInterval =
        setInterval(
            showModal,
            45000
        );

}


/* =========================================================
   INITIALIZE PAGE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCounters();

        initializeCookieModal();

    }
);