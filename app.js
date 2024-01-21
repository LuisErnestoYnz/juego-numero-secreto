let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  // Si ya sorteamos todos los numeros
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se asignaron todos los numeros posibles");
  } else {
    // Si el numero generado esta incluido en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      // Se llama la funcion asi misma recursivamente
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del Numero Secreto");
  asignarTextoElemento("p", `Indica un numero del 1 al ${numeroMaximo}`);
  // Generar el numero aleatorio
  numeroSecreto = generarNumeroSecreto();
  // Deshabilitar el boton de nuevo juego
  intentos = 1;
}

let botonIntentar = document.getElementById("intentar");
botonIntentar.addEventListener("click", () => {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
  if (numeroDeUsuario == numeroSecreto) {
    asignarTextoElemento(
      "p",
      `Acertaste el numero en ${intentos} ${intentos == 1 ? "vez" : "veces"}`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El numero secreto es menor");
    } else {
      asignarTextoElemento("p", "El numero secreto es mayor");
    }
    intentos++;
    limpiarCaja();
  }
});

let botoReiniciar = document.getElementById("reiniciar");
botoReiniciar.addEventListener("click", () => {
  // Limpiar caja
  limpiarCaja();
  // Indicar mensaje de intevalo de numeros
  condicionesIniciales();
  // Inicializar el numero de intentos
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
});

condicionesIniciales();
