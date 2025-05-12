let buttonMode = document.querySelector('.colorMode');
let iconMode = document.querySelector('.colorMode i');
buttonMode.addEventListener('click', ()=>{
  if (iconMode.classList.contains('fa-moon')) {
    iconMode.classList.remove('fa-moon');
    iconMode.classList.add('fa-sun');
    darkMode();
  } else {
    iconMode.classList.remove('fa-sun');
    iconMode.classList.add('fa-moon');
    lightMode()
  }
})

function darkMode(){
    document.body.style.backgroundColor = "var(--dark-background)";
    document.querySelector('.containerIaGenerator').style.backgroundColor = "var(--dark)";
    document.querySelector('h1').style.color = "var(--light)"
}
function lightMode(){
      document.body.style.backgroundColor = "var(--light-background)";
      document.querySelector('.containerIaGenerator').style.backgroundColor = "var(--light)";
       document.querySelector('h1').style.color = "black";
}
