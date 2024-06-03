window.addEventListener("load", inicarJuego)

function seleccionarMascotaJugador() {

    let inputOshawott = document.getElementById("Oshawott")
    let inputSnivy = document.getElementById("Snivy")
    let inputTepig = document.getElementById("Tepig")

    if (inputOshawott.checked){
        alert("ELEGISTE A OSHAWOTT")
    }
    else if (inputSnivy.checked){
        alert("ELEGISTE A SNIVY")
    }
    else if (inputTepig.checked){
        alert("ELEGISTE A TEPIG")
    } else {
        alert("DEBES SELECCIONAR UNA MASCOTA")
    }
}

function inicarJuego() {
    let botonMascota = document.getElementById("seleccionar-mascota")
    botonMascota.addEventListener("click", seleccionarMascotaJugador)
}