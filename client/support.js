import jwt_decode from 'jwt-decode';
const scriptURL = 'https://script.google.com/macros/s/AKfycbyg7mhfRtJxwElNqFuE-9bzWQbXVTySIOcMl7oKhTXpjw5OghsI6LWysCctslxzP057gg/exec'

const form = document.forms['submit-to-google-sheet']
const name = document.getElementById('name');
const email = document.getElementById('email');
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
let userEmail = '';
let userName = '';
if(token !== 'null'&& token !== null){
  let decoded = jwt_decode(token);
  userEmail = decoded.userEmail;
  userName = decoded.userName;
  name.value = userName;
  email.value = userEmail;
}

const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
  msg.innerHTML = "please wait we are submitting your data";
    fetch(scriptURL, {
        method: 'POST', body: new FormData(form)})
        .then(response =>{
            alert("Problem received Successfully  , We will contact you soon as soon as Possible.")
            setTimeout(function(){
                msg.innerHTML = ""
            }, 1000)
            form.reset()
            name.value = userName;
            email.value = userEmail;
        })
        .catch(error => console.error('Error !', error.message))
})
