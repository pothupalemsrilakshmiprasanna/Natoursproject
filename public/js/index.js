//console.log("hello");
//# sourceMappingURL=index.js.map

import '@babel/polyfill'
import { displayMap } from './mapbox';
import {login,logout} from './login'
import { updatesettings } from './updateSettings';

console.log("we are in index.js");


// Dom elemnts
const mapBox=document.getElementById('map');
const loginForm=document.querySelector('.form--login');
const logOutbtn=document.querySelector('.nav__el--logout')
const userDataform=document.querySelector('.form-user-data');
const userPasswordForm=document.querySelector('.form-user-password');
// values



/// delegation
if(mapBox){
const locations = JSON.parse(mapBox.dataset.locations);
displayMap(locations)
}



if(loginForm){
   loginForm.addEventListener('submit', async (e) => {
   e.preventDefault();  // Prevents the form from refreshing the pag
   const email = document.getElementById('email').value;  // Get email value
   const password = document.getElementById('password').value;  // Get password 
   login(email, password);  // Trigger the login function
  });
       
}
if(logOutbtn) logOutbtn.addEventListener('click',logout);


if(userDataform){
  userDataform.addEventListener('submit',e=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const name=document.getElementById('name').value;
    updatesettings({name,email},'data');
  })
}



if(userPasswordForm){
  userPasswordForm.addEventListener ('submit', async e=>{
    e.preventDefault();


    document.querySelector('.btn--save-password').textContent='updating...'
    const passdwordCurrent=document.getElementById('password-current').value;
    const passdword=document.getElementById('password').value
    const passdwordConfirm=document.getElementById('password-confirm').value;;
    await  updatesettings({passdwordCurrent,passdword,passdwordConfirm},'password');


    document.querySelector('.btn--save-password').textContent='Save password'
    document.getElementById('password-current').value='';
    document.getElementById('password').value='';
    document.getElementById('password-confirm').value='';
  })
}