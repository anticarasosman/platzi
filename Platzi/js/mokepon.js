window.addEventListener("load", inicarJuego)

let ataqueJugador
let ataqueEnemigo
let resultado
let vidaJugador = 3
let vidaEnemigo = 3

function seleccionarMascotaJugador() {
    let sectionSeleccionarAtaque = document.getElementById("Seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "flex"

    let sectionSeleccionarMascota = document.getElementById("Seleccionar-mascota")
    sectionSeleccionarMascota.style.display = "none"

    let inputOshawott = document.getElementById("Oshawott")
    let inputSnivy = document.getElementById("Snivy")
    let inputTepig = document.getElementById("Tepig")
    let spanMascotaJugador = document.getElementById("mascota_jugador")

    if (inputOshawott.checked){
        spanMascotaJugador.innerHTML = "Oshawott"
    }
    else if (inputSnivy.checked){
        spanMascotaJugador.innerHTML = "Snivy"
    }
    else if (inputTepig.checked){
        spanMascotaJugador.innerHTML = "Tepig"
    } else {
        alert("DEBES SELECCIONAR UNA MASCOTA")
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById("mascota_enemigo")

    if(mascotaAleatoria == 1){
        spanMascotaEnemigo.innerHTML = "Oshawott"
    }
    else if (mascotaAleatoria == 2){
        spanMascotaEnemigo.innerHTML = "Snivy"
    }
    else{
        spanMascotaEnemigo.innerHTML = "Tepig"
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function inicarJuego() {
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "none"

    let sectionSeleccionarAtaque = document.getElementById("Seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = "none"

    let botonMascota = document.getElementById("seleccionar-mascota")
    botonMascota.addEventListener("click", seleccionarMascotaJugador)

    let botonAgua = document.getElementById("boton_agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonPlanta = document.getElementById("boton_planta")
    botonPlanta.addEventListener("click", ataquePlanta)
    let botonFuego = document.getElementById("boton_fuego")
    botonFuego.addEventListener("click", ataqueFuego)

    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function ataqueAgua(){
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
}
function ataquePlanta(){
    ataqueJugador = "PLANTA"
    ataqueAleatorioEnemigo()
}
function ataqueFuego(){
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1){
        ataqueEnemigo = "AGUA"
    }
    else if (ataqueAleatorio == 2){
        ataqueEnemigo = "PLANTA"
    }
    else {
        ataqueEnemigo = "FUEGO"
    }

    combate()
}

function crearMensaje() {
    let sectionMensajes = document.getElementById("resultado")
    let ataquesDelJugador = document.getElementById("ataqueAliado")
    let ataquesDelEnemigo = document.getElementById("ataqueEnemigo")

    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById("resultado")

    sectionMensajes.innerHTML = resultadoFinal

    let botonAgua = document.getElementById("boton_agua")
    botonAgua.disabled = true
    let botonPlanta = document.getElementById("boton_planta")
    botonPlanta.disabled = true
    let botonFuego = document.getElementById("boton_fuego")
    botonFuego.disabled = true

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "block"

}

function reiniciarJuego(){
     location.reload()
}

function combate() {
    let spanVidasJugador = document.getElementById("vidas_jugador")
    let spanVidasEnemigo = document.getElementById("vidas_enemigo")

    if (ataqueJugador == ataqueEnemigo){
        resultado = "EMPATE"
    }
    else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO"){
        resultado = "GANASTE"
        vidaEnemigo -= 1
        spanVidasEnemigo.innerHTML = vidaEnemigo
    }
    else if (ataqueJugador == "PLANTA" && ataqueEnemigo == "AGUA"){
        resultado = "GANASTE"
        vidaEnemigo -= 1
        spanVidasEnemigo.innerHTML = vidaEnemigo
    }
    else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "PLANTA"){
        resultado = "GANASTE"
        vidaEnemigo -= 1
        spanVidasEnemigo.innerHTML = vidaEnemigo
    }
    else{
        resultado = "PERDISTE"
        vidaJugador -= 1
        spanVidasJugador.innerHTML = vidaJugador
    }

    revisarVidas()
    crearMensaje()
}

function revisarVidas(){
    if (vidaEnemigo == 0){
        crearMensajeFinal("FELICIDADES ERES EL GANADOR")
    }
    else if(vidaJugador == 0){
        crearMensajeFinal("Lo siento perdiste. INTENTALO DE NUEVO")
    }
}