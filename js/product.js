// Importing code
import { retrieveFromStorage, saveToStorage, removeItem } from "./utils/localStorage.js";
import { createList } from "./components/cart.js"

// Storing elements into constants
const vanillaFlavour = document.getElementById("vanilla");
const chocolateFlavour = document.getElementById("chocolate");
const sizeSelect = document.getElementById("size");
const addtoCartBtn = document.querySelector(".add-to-cart");
const additions = document.querySelectorAll(".addition");
const products = retrieveFromStorage("products");
const cart = document.querySelector(".cart");
const cartProducts = document.querySelector(".cart__products");
const subtotal = document.querySelector(".subtotal");
const checkout = document.querySelector(".checkout")

let totalPrice = 0;

displayCart();

// This function will only display the cart if not empty
function displayCart() {
    if (products.length > 0) {
        cart.style.display = "block"

        products.forEach(price => {
            totalPrice += price.productPrice;
        });

        subtotal.innerHTML = "$" + totalPrice;

    }
}

// Calling my create list function to create the list of products
createList(cartProducts);

addtoCartBtn.addEventListener("click", addtoCart);

function addtoCart() {

    // Checking if the users has selected a base flavour
    if (vanillaFlavour.checked === false && chocolateFlavour.checked === false) {
        alert("Please choose a base flavour");
    }else{

        // Getting value and index of selected category
        const categoryIndex = sizeSelect.selectedIndex;
        const options = sizeSelect.options;
        const size = options[categoryIndex].value;

        totalPrice = 0;
        let flavour = ""
        let sizePrice = 0;
        let selectedAdditions = [];
        let additionsPrice = 0;
        const id = Math.random();
        
        // Using if statements to check the selected flavour
        if (vanillaFlavour.checked) {
            flavour = vanillaFlavour.parentElement.querySelector(".form-check-label").innerHTML;
        }else{
            flavour = chocolateFlavour.parentElement.querySelector(".form-check-label").innerHTML;
        }

        // Using switch statements to set the price of the selected option
        switch (categoryIndex) {
            case 0: 
                sizePrice = 10;
                break;
        
            case 1:
                sizePrice = 20;
                break;

            case 2:
                sizePrice = 35;
                break;
        }

        // Adding all the selected additions to my selectedAdditions array, and calculating the total price of additions
        additions.forEach(addition => {
            if (addition.checked) {
                selectedAdditions.push(addition.parentElement.querySelector(".form-check-label").innerHTML);
                additionsPrice = 5 * selectedAdditions.length;
            }
        });


        const productPrice = sizePrice + additionsPrice;

        // If none additions are added, a text of "none" is displayed instead.
        if (selectedAdditions.length === 0) {
            selectedAdditions.push("none");
        }

        const productDetails = {flavour: flavour, size: size, additions: selectedAdditions, productPrice: productPrice, id: id }

        products.push(productDetails);

        // Saving new products to local storage
        saveToStorage("products", products);

        // Creating a new cart list
        createList(cartProducts);

        // Displaying the cart if hidden
        displayCart();

        // Adding remove event to each product
        addRemoveEvent();    

    }

}

// Adding a click event to the checkout button
checkout.addEventListener("click", doCheckout);

// When the user clicks ‘Checkout’ the total for the page is saved to local storage
function doCheckout() {
    const CurrentSubtotal = subtotal.innerText.slice(1);
    saveToStorage("subtotal", CurrentSubtotal);
}


addRemoveEvent();

// This function adds an event to each minus symbol in the cart
function addRemoveEvent() {
    const removeProduct = document.querySelectorAll(".remove-product");
    removeProduct.forEach(product => {
    product.addEventListener("click", handleRemove)
    });
}

// This function removes a product from the cart
function handleRemove() {
    const id = this.dataset.id;
    
    const filtered = products.filter(function (product) {
        if (product.id != id) {
            return true;
        }
    })
    saveToStorage("products", filtered);
    location.reload();
}