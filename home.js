const buyNow = document.getElementById("buyNow");


buyNow.addEventListener("click", function(){
    console.log("button clicked");
    window.location.href = './login.html';
    
});
//Privacy Policy

const privacyPolicy = document.getElementById("privacy");

privacyPolicy.addEventListener("click", function(){
    console.log("privacy policy used here ");
    window.location.href = './privacy.html';

});
//Functioning of suuport Button
const supportClick = document.getElementById("support");

supportClick.addEventListener("click", function(){
    console.log("Here to help you");
    window.location.href = './support.html';
});
//payment 

const paymentGateway = document.getElementById('purchase');

paymentGateway.addEventListener("click" , function(){
    console.log("Puchasing");
    window.location.href = './paymentgateway.html';

});

const paymentGateway1 = document.getElementById('purchase1');

paymentGateway1.addEventListener("click" , function(){
    console.log("Puchasing");
    window.location.href = './paymentgateway.html';
});

const paymentGateway2 = document.getElementById('purchase2');

paymentGateway2.addEventListener("click" , function(){
    console.log("Puchasing");
    window.location.href = './paymentgateway.html';
});

const paymentGateway3 = document.getElementById('purchase3');

paymentGateway3.addEventListener("click" , function(){
    console.log("Puchasing");
    window.location.href = 'minor_project/paymentgateway.html';
});




