import axios from 'axios';

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document.querySelector("#linkCreateAccount").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.add("form--hidden");
    createAccountForm.classList.remove("form--hidden");
  });

  document.querySelector("#linkLogin").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });
  createAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = createAccountForm.elements.signupUsername.value;
    const userEmail = createAccountForm.elements.userEmail.value;
    const password = createAccountForm.elements.password.value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(userName.length > 0 && userName.length < 10){
        setFormMessage(createAccountForm, 'error', 'Username must be atleast 10 characters');
        return false;
    }
    else if(!mailformat.test(userEmail)){
        setFormMessage(createAccountForm, 'error', 'Invalid email provided');
        return false;
    }
    try {
      const response = await axios.post('/api/register', { userName, userEmail, password });
      setFormMessage(createAccountForm, "success", "Account created successfully");
    } catch (e) {
      console.error(e.response.data);
      if(e.response.data['message']){
        setFormMessage(createAccountForm, 'error', e.response.data['message']);
      }
    }
  });


  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Perform your AJAX/Fetch login

    const userEmail = loginForm.elements.userEmail.value;
    const password = loginForm.elements.password.value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!mailformat.test(userEmail)){
        setFormMessage(createAccountForm, 'error', 'Invalid email provided');
        return false;
    }
    try {
      const response = await axios.post('/api/login', { userEmail, password });
      console.log(response.data);
      const token=response.data.token;
      setFormMessage(loginForm, "success", "Congratulations!! logged in successfully");
      window.location.href=`/?token=${token}`;
    } catch (e) {
      console.error(e.response.data);
      if(e.response.data['message']){
        setFormMessage(loginForm, 'error', e.response.data['message']);
      }
    }


    // setFormMessage(loginForm, "error", "Invalid username/password combination");
  });

  document.querySelectorAll(".form__input").forEach(inputElement => {
    inputElement.addEventListener("blur", e => {
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
        setInputError(inputElement, "Username must be at least 10 characters in length");
      }
      else if(e.target.name==='userEmail' && !mailformat.test(e.target.value)){
        setInputError(inputElement, 'Invalid Email ID');
      }
    });

    inputElement.addEventListener("input", e => {
      clearInputError(inputElement);
    });
  });
});
// const loginForm = document.querySelector('form');
// loginForm.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const userEmail = loginForm.elements.userEmail.value;
//   const password = loginForm.elements.password.value;
//   try {
//     const response = await axios.post('/api/login', { userEmail, password });
//     console.log(response.data);
//   } catch (e) {
//     console.error(e)
//   }

// });
