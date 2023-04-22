import axios from 'axios';


const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userEmail = loginForm.elements.userEmail.value;
  const password = loginForm.elements.password.value;
  try{
    const response = await axios.post('/api/login', {userEmail, password});
    console.log(response.data);
  } catch(e){
    console.error(e)
  }

});
