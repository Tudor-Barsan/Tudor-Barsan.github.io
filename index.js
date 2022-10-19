const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')
let root = document.documentElement;

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    root.style.setProperty('--clr-light');
    
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
  })
})

let checkbox = document.querySelector("input[name=theme]");
checkbox.addEventListener("change", function(){
  if(this.checked){
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById('logo').src="Images/TBLogo_dark.png"
  } else{
    document.documentElement.setAttribute("data-theme", "light");
    document.getElementById('logo').src="Images/TBlogo.png"
  }
})