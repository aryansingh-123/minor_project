import jwt_decode from "jwt-decode";
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const header = document.getElementById('header');
const headerGreet = document.getElementById('header--greet');
const back = document.getElementById('backhome');
console.log(token);
console.log(typeof token);
if(token !== 'null'&& token !== null){
  let decoded = jwt_decode(token);
  const userEmail = decoded.userEmail;
  const userName = decoded.userName;
  header.innerHTML = userName.split(' ')[0].concat("'s Order Cart");
  headerGreet.innerHTML = headerGreet.innerHTML.concat(', ', userName.split(' ')[0]);
}
backhome.addEventListener("click", () => {
  window.location.href = `./?token=${token}`;
});
var ShoppingCart = (function($) {
  "use strict";
  
  // Cahce necesarry DOM Elements
  var productsEl = document.querySelector(".products"),
      cartEl =     document.querySelector(".shopping-cart-list"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".cart-checkout"),
      totalPriceEl = document.querySelector(".total-price");
  
  // Fake JSON data array here should be API call
  var products = [
    {
      id: 0,
      name: "MacBook-air",
      description: "MackBook-air features a cinema standard wide color gamut, displaying colors just as filmmakers intended.",
      imageUrl: "./Images/macbook-air.jpg",
      price: 1199
    },
    {
      id: 1,
      name: "MacBook",
      description: "Apple 2020 MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      imageUrl: "./Images/macbook.jpg",
      price: 1999,
    },
    {
      id: 2,
      name: "Macbook Air",
      description: "The M1 chip and macOS Monterey work together to make the entire system snappier. MacBook Air wakes instantly from sleep",
      imageUrl: "./Images/apple.jpeg",
      price: 1499
    },
    {
      id: 3,
      name: "Macbook-Air(M2)",
      description: "The MacBook Air(M2) was among the first of Apple's Macs to make the transition to Apple silicon.",
      imageUrl: "./Images/apple3.jpg",
      price: 999
    },
    {
      id: 4,
      name: "iPad 11inch",
      description: "Apple 2020 MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Grey",
      imageUrl: "./Images/apple4.jpg",
      price: 599
    },
    {
      id: 5,
      name: "MacBook-Air 12",
      description: "iPad is Apple's most affordable and most popular tablet, and the ninth-generation model features the A13 Bionic chip.",
      imageUrl: "./Images/apple2.jpg",
      price: 499
    }
  ],
      productsInCart = [];
  
  // Pretty much self explanatory function. NOTE: Here I have used template strings (ES6 Feature)
  var generateProductList = function() {
    products.forEach(function(item) {
      var productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `<div class="product-image">
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span>Product:</span> ${item.name}</div>
                             <div class="product-description"><span>Description:</span> ${item.description}</div>
                             <div class="product-price"><span>Price:</span> ${item.price} $</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button see-more">More Details</a>
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
                          </div>
`;
                             
productsEl.appendChild(productEl);
    });
  }
  
  // Like one before and I have also used ES6 template strings
  var generateCartList = function() {
    
    cartEl.innerHTML = "";
    
    productsInCart.forEach(function(item) {
      var li = document.createElement("li");
      li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
      cartEl.appendChild(li);
    });
    
    productQuantityEl.innerHTML = productsInCart.length;
    
    generateCartButtons()
  }
  
  
  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function() {
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block"
      totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }
  
  // Setting up listeners for click event on all products and Empty Cart button as well
  var setupListeners = function() {
    productsEl.addEventListener("click", function(event) {
      var el = event.target;
      if(el.classList.contains("add-to-cart")) {
       var elId = el.dataset.id;
       addToCart(elId);
      }
    });
    
    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("Are you sure?")) {
        productsInCart = [];
      }
      generateCartList();
    });
  }
  
  // Adds new items or updates existing one in productsInCart array
  var addToCart = function(id) {
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }
  
  
  // This function checks if project is already in productsInCart array
  var productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.price *  item.quantity);
    }, 0);
  }
  
  // This functon starts the whole application
  var init = function() {
    generateProductList();
    setupListeners();
  }
  
  // Exposes just init function to public, everything else is private
  return {
    init: init
  };
  
  // I have included jQuery although I haven't used it
})(jQuery);

ShoppingCart.init();
