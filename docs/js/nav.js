const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarToggler.addEventListener("click", navbarTogglerClick);

// Esta funcion añadira la clase open-navbar-toggler si esta NO existe y removera la clase si esta SI existe 
function navbarTogglerClick() {
    navbarToggler.classList.toggle("open-navbar-toggler");
    navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

function navbarLinkClick() {
    if (navbarMenu.classList.contains("open")) {
        // Para que al hacer click en un link del menu y si este esta abierto se ejecutara el evento click del navbarToggler. (esto se hace para que se cierre el menu al hacer click en un link).
        navbarToggler.click();
    }
}


navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    var scrollTop = window.pageYOffset < 400;

    if (scrollTop) {
        navbar.classList.remove('scroll');
        navbarToggler.style.top = "20px";

    } else {
        navbar.classList.add('scroll');
        navbarToggler.style.top = "15px";
    }
});