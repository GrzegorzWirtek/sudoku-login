const loginForm = document.querySelector('.login');
const loginMessage = document.querySelector('.login__message');
const redirectA = document.querySelector('.login__redirect-to-login');

function goTonextSite(id){
    window.location = `${window.location.origin}/${id}`;
};

function goToRegister(){
  redirectA.href = `${window.location.origin}/register`;
}

function redirectSite(data){
  loginMessage.textContent = '';
  if(data.length < 1){
    loginMessage.textContent = 'Błędny login lub hasło'
  }else{
    fetch(`/${data[0]._id}`, {method: 'POST'})
    .then(res=>res.json())
    .then(e=>{
      goTonextSite(data[0]._id);
    }) 
  };
};

function goToLogin(e){
 e.preventDefault();
  const data = new URLSearchParams ({
    login: loginForm.elements[0].value,
    password: loginForm.elements[1].value,
  });
  fetch(`/?${data}`, {method: 'POST'})
  .then(res=>res.json())
  .then(data=>redirectSite(data))
};

loginForm.addEventListener('submit', goToLogin);
redirectA.addEventListener('click', goToRegister)
