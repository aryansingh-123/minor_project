import jwt_decode from "jwt-decode";
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const back = document.getElementById('home');
if(token !== 'null'&& token !== null){
  let decoded = jwt_decode(token);
  const userEmail = decoded.userEmail;
  const userName = decoded.userName;
}

back.addEventListener("click", () => {
  window.location.href = `/?token=${token}`;
});