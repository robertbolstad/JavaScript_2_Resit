import { retrieveFromStorage} from "../utils/localStorage.js";

// This function takes each product saved to local storage and creates a list of products in the cart section.

export function createList(element) {
    const products = retrieveFromStorage("products");

    element.innerHTML = "";

    products.forEach(product => {

        element.innerHTML += `<div class="row">
                                <div class="col-3">
                                    <p>${product.flavour}</p>
                                </div>
                                <div class="col-2">
                                    <p>${product.size}</p>
                                </div>
                                <div class="col-4">
                                    <ul>
                                        <li class ="addition-item">${product.additions[0]}</li>
                                        <li class ="addition-item">${product.additions[1]}</li>
                                        <li class ="addition-item">${product.additions[2]}</li>
                                        <li class ="addition-item">${product.additions[3]}</li>
                                    </ul>
                                </div>
                                <div class="col-3">
                                    <p>$${product.productPrice}<span class="remove-product" data-id="${product.id}"> - </span></p>                
                                </div>
                            </div>`;

        const additions = element.querySelectorAll(".addition-item");

        // Removing additions that don't exist
        additions.forEach(addition => {
            if (addition.innerText == "undefined") {
                addition.style.display = "none"
            }
        });
    });

    
}


