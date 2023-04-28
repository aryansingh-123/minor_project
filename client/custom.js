import jwt_decode from "jwt-decode";
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
if(token !== 'null'&& token !== null){
    let decoded = jwt_decode(token);
    const userEmail = decoded.userEmail;
    const userName = decoded.userName;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    name.value = userName;
    email.value = userEmail;
}
const backbtn = document.getElementById('back-button');
backbtn.addEventListener("click", () => {
    window.location.href = `/?token=${token}`;
})
const placeOrder = document.getElementById('place');
placeOrder.addEventListener("click", () => {
    window.location.href = `./paymentgateway.html?token=${token}`;
})