const registerForm = document.querySelector('.register');
const registerMessage = document.querySelector('.register__message');

function redirectSite({success, message}){
  registerMessage.textContent = '';
  if(success){
    window.location = window.location.origin;
  }else{
    registerMessage.textContent = message;
  }
};

function goToLogin(e){
 e.preventDefault();
  const data = new URLSearchParams({
    login: registerForm.elements[0].value,
    password1: registerForm.elements[1].value,
    password2: registerForm.elements[2].value
  });

  fetch(`/register/?${data}`, {method: 'POST'})
  .then(res=> res.json())
  .then(message=> redirectSite(message))
}

registerForm.addEventListener('submit', goToLogin)