import jwt_decode from "jwt-decode";
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const buyNow = document.getElementById("buyNow");
const info = document.getElementById("info");
if(token != null){
  let decoded = jwt_decode(token);
  const userEmail = decoded.userEmail;
  const userName = decoded.userName;
  info.innerHTML = 'Welcome, '.concat(userName);
  buyNow.classList.add('hidden');
} else {
  info.classList.add('hidden');
}

buyNow.addEventListener("click", function(){
    console.log("button clicked");
    window.location.href = `./login.html?token=${token}`;
    
});
//Privacy Policy

const privacyPolicy = document.getElementById("privacy");

privacyPolicy.addEventListener("click", function(){
    console.log("privacy policy used here ");
    window.location.href = `./privacy.html?token=${token}`;

});
//Functioning of suuport Button
const supportClick = document.getElementById("support");

supportClick.addEventListener("click", function(){
    console.log("Here to help you");
    window.location.href = `./support.html?token=${token}`;
});
//payment 

const paymentGateway = document.getElementById('purchase');

paymentGateway.addEventListener("click" , function(){
    console.log("Puchasing");
    window.location.href = `./paymentgateway.html?token=${token}`;

});

const paymentGateway1 = document.getElementById('purchase1');

paymentGateway1.addEventListener("click" , function(){
    console.log("Puchasing");
    window.location.href = `./paymentgateway.html?token=${token}`;
});

const paymentGateway2 = document.getElementById('purchase2');

paymentGateway2.addEventListener("click" , function(){
    console.log("Puchasing");
    window.location.href = `./paymentgateway.html?token=${token}`;
});

const paymentGateway3 = document.getElementById('purchase3');

paymentGateway3.addEventListener("click" , function(){
    console.log("Puchasing");
    window.location.href = `./paymentgateway.html?token=${token}`;
});

const cart = document.getElementById('Cart');
cart.addEventListener("click", () => {
  window.location.href = `./cart.html?token=${token}`;
});

