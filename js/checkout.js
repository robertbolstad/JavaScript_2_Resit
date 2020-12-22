// Importing code
import { retrieveFromStorage } from "./utils/localStorage.js";

// Displaying the subtotal of all products in the total section
const total = document.querySelector(".total");
total.innerText = retrieveFromStorage("subtotal");