'use strict'
// Back to top
const backToTopButton = document.querySelector("#back-to-top-btn")

window.addEventListener("scroll", scrollFunction)

function scrollFunction() {
    if (window.pageYOffset > 300) { //Show backToTopButton
        if (!backToTopButton.classList.contains("btnEntrace")) {
            backToTopButton.classList.remove("btnExit")
            backToTopButton.classList.add("btnEntrace")
            backToTopButton.style.display = "block"
        }

    } else { //Hide backToTopButton
        if (backToTopButton.classList.contains("btnEntrace")) {
            backToTopButton.classList.remove("btnEntrace")
            backToTopButton.classList.add("btnExit")
            setTimeout(function () {
                backToTopButton.style.display = "none"
            }, 250)
        }
    }
}


backToTopButton.addEventListener("click", smoothScrollBackToTop)

function smoothScrollBackToTop() {
    const targetPosition = 0;
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 750
    let start = null

    window.requestAnimationFrame(step)

    function step(timestamp) {
        if (!start) start = timestamp
        const progress = timestamp - start
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration))
        if (progress < duration) window.requestAnimationFrame(step)
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t * t + b
    t -= 2
    return c / 2 * (t * t * t + 2) + b
}



// Acordion
const accordionItemHeaders = document.querySelectorAll('.accordion-item-header');

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener('click', () => {
        accordionItemHeader.classList.toggle('active');
        // Devuelve el siguiente elemento hermano con nextElementSibling
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains('active')) {
            // De lo que se haga de scroll (esta en max height: 0 asi que se hara scroll todo su contenido) el accordionitembody sera la altura del contenido 
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    });
});


/** API TIBIA **/
let input = document.querySelector('table #nombre');
input.value = "mister eurtih";

let botonPeticion = document.getElementById('consulta');

// Los eventos del dom se agregan una vez el documento este cargado. o Da error.
window.onload = function () {

    botonPeticion.addEventListener('click', () => {
        let name = input.value;
        // El método trim( ) elimina los espacios en blanco en ambos extremos del string.
        if (Number(name) || name.trim() == "") {
            return alert("Introduce un nombre que exista");
        }
        return peticion(name);
    });

    function peticion(name) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `https://api.tibiadata.com/v2/characters/${name}.json`, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                let lista = document.getElementsByClassName('lista__datos');
                let llaves = Object.keys(myObj.characters.data);

                if (myObj.characters.data.name == undefined) {
                    lista[0].innerHTML = "No existe nadie con ese nombre";
                    lista[0].style = "color: red";
                } else {
                    lista[0].style = "color: #000000";
                    lista[0].innerHTML = `
                <li>${llaves[0]}: ${myObj.characters.data.name}</li>
                <li>${llaves[4]}: ${myObj.characters.data.level}</li>
                <li>${llaves[3]}: ${myObj.characters.data.vocation}</li>
                <li>${llaves[2]}: ${myObj.characters.data.sex}</li>
                <li>${llaves[6]}: ${myObj.characters.data.world}</li>
                `;
                    document.querySelector('.lista__datos li:last-child').style = "margin-bottom: 3em;";
                }
            }
        };
    }


    // Modal
    let contact = document.querySelector('.navbar ul li .contact');
    let modal = document.querySelector('.modal');
    contact.addEventListener('click', () => {
        modal.classList.add('is-active');
    });

    let cerrar = document.querySelector('button[aria-label="close"]');
    cerrar.addEventListener('click', () => {
        modal.classList.remove('is-active');
    })

    let fondoModal = document.querySelector('.modal-background');
    fondoModal.addEventListener('click', () => {
        modal.classList.remove('is-active');
    });


    // Formularios
    let forms = document.querySelectorAll('button[type=submit]');
    forms[0].addEventListener('click', validar1, false);
    forms[1].addEventListener('click', validar, false);

    function validar1(e) {
        // borrarError();
        if (validaNombre('form1') && validaEmail('form1') && validaMensaje('form1')) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    }

    function validar(e) {
        // borrarError();
        if (validaNombre() && validaEmail() && validaMensaje()) {
            return true;
        } else {
            e.preventDefault();
            return false;
        }
    }

    function validaNombre(uno) {
        if (uno === 'form1') {
            let elemento = document.getElementById('nombref1');
            if (!elemento.checkValidity()) {
                if (elemento.validity.valueMissing) {
                    error(elemento, "Debe introducir un nombre", "form1");
                }
                // El patron no cohincide
                if (elemento.validity.patternMismatch) {
                    error(elemento, "Entre 2 y 30 caracteres, sin numeros.", "form1");
                }
                return false;
            }
            return true;
        } else {
            let elemento = document.getElementById('nombref');
            if (!elemento.checkValidity()) {
                if (elemento.validity.valueMissing) {
                    error(elemento, "Debe introducir un nombre");
                }
                // El patron no cohincide
                if (elemento.validity.patternMismatch) {
                    error(elemento, "Entre 2 y 30 caracteres, sin numeros.");
                }
                return false;
            }
            return true;
        }
    }

    function validaEmail(uno) {
        if (uno === 'form1') {
            let elemento = document.getElementById('email1');
            if (!elemento.checkValidity()) {
                if (elemento.validity.valueMissing) {
                    error(elemento, "Debe introducir un correo", "form1");
                }
                // El patron no cohincide
                if (elemento.validity.patternMismatch) {
                    error(elemento, "El formato de email no es correcto", "form1");
                }
                return false;
            }
            return true;
        } else {
            let elemento = document.getElementById('email');
            if (!elemento.checkValidity()) {
                if (elemento.validity.valueMissing) {
                    error(elemento, "Debe introducir un correo");
                }
                // El patron no cohincide
                if (elemento.validity.patternMismatch) {
                    error(elemento, "El formato de email no es correcto");
                }
                return false;
            }
            return true;
        }
    }

    function validaMensaje(uno) {
        if (uno === 'form1') {
            console.log("entre")
            let elemento = document.getElementById('mensaje1');
            let cadenaTexto = elemento.value;
            if (!elemento.checkValidity()) {
                if(cadenaTexto.length < 10 || cadenaTexto.length > 400){
                    error(elemento, "Se aceptan entre 10 a 400 caracteres", "form1");
                }

                if (elemento.validity.valueMissing) {
                    error(elemento, "Debe introducir un mensaje entre 10 a 400 caracteres", "form1");
                }
                return false;
            }
            return true;
        }else {
            let elemento = document.getElementById('mensaje');
            let cadenaText = elemento.value;
            if (!elemento.checkValidity()) {
                if(cadenaText.length < 10 || cadenaText.length > 400){
                    error(elemento, "Se aceptan entre 10 a 400 caracteres");
                }

                if (elemento.validity.valueMissing) {
                    error(elemento, "Debe introducir un mensaje entre 10 a 400 caracteres");
                }
                return false;
            }
            return true;
        }
    }

    function error(elemento, mensaje, uno) {
        if(uno === 'form1'){
            let error = document.getElementById('mensajeError1');
            error.innerHTML = mensaje;
            error.style.color = 'red';
            elemento.focus();
        }else {
            let error = document.getElementById('mensajeError');
            error.innerHTML = mensaje;
            error.style.color = 'red';
            elemento.focus();
        }
        
    }

}