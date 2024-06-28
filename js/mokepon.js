const sectionSeleccionarAtaque = document.getElementById("Seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascota = document.getElementById("seleccionar-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("Seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota_jugador")

const spanMascotaEnemigo = document.getElementById("mascota_enemigo")

const spanVidasJugador = document.getElementById("vidas_jugador")
const spanVidasEnemigo = document.getElementById("vidas_enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques_del_jugador")
const ataquesDelEnemigo = document.getElementById("ataques_del_enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver_mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputOshawott
let inputSnivy
let inputTepig
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonAgua
let botonPlanta
let botonFuego
let botones = []
let indexAtaqueJugador = 0
let indexAtaqueEnemigo = 0
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidaJugador = 3
let vidaEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaDeseada
let anchoDeseado = window.innerWidth -20
const anchoMax = 650

if (anchoDeseado > anchoMax){
    anchoDeseado = anchoMax -20
}

alturaDeseada = anchoDeseado * 6/8

mapa.width = anchoDeseado
mapa.height = alturaDeseada

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto)
    }
}

let Oshawott = new Mokepon("Oshawott", "./assets/Oshawott.png", 3, "./assets/Oshawott_PA.png")
let Snivy = new Mokepon("Snivy", "./assets/Snivy.png", 3, "./assets/Snivy_PA.png")
let Tepig = new Mokepon("Tepig", "./assets/Tepig.png", 3, "./assets/Tepig_PA.png")

const Oshawott_Ataques = [
    {nombre: "AGUA", id: "boton_agua"},
    {nombre: "PLANTA", id: "boton_planta"},
    {nombre: "FUEGO", id: "boton_fuego"}
]

Oshawott.ataques.push(...Oshawott_Ataques)

const Snivy_Ataques = [{nombre: "AGUA", id: "boton_agua"},
    {nombre: "PLANTA", id: "boton_planta"},
    {nombre: "FUEGO", id: "boton_fuego"}
]

Snivy.ataques.push(...Snivy_Ataques)

const Tepig_Ataques = [{nombre: "AGUA", id: "boton_agua"},
    {nombre: "PLANTA", id: "boton_planta"},
    {nombre: "FUEGO", id: "boton_fuego"}
]

Tepig.ataques.push(...Tepig_Ataques)

mokepones.push(Oshawott, Snivy, Tepig)

function inicarJuego() {
    let spanVidasJugador = document.getElementById("vidas_jugador")
    let spanVidasEnemigo = document.getElementById("vidas_enemigo")
    spanVidasJugador.innerHTML = vidaJugador
    spanVidasEnemigo.innerHTML = vidaEnemigo
    
    sectionReiniciar.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type = "radio" name = "mascota" id=${mokepon.nombre} />
        <label class = "tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones
    inputOshawott = document.getElementById("Oshawott")
    inputSnivy = document.getElementById("Snivy")
    inputTepig = document.getElementById("Tepig")

    })
    
    sectionSeleccionarAtaque.style.display = "none"
    
    botonMascota.addEventListener("click", seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(response){
            console.log(response)
            if (response.ok){
                response.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = "none"

    //let imagenOshawott = new Image()
    //imagenOshawott.src = Oshawott.foto
    //lienzo.drawImage(imagenOshawott, 20, 40, 100, 100)

    if (inputOshawott.checked){
        spanMascotaJugador.innerHTML = inputOshawott.id
        mascotaJugador = inputOshawott.id
    }
    else if (inputSnivy.checked){
        spanMascotaJugador.innerHTML = inputSnivy.id
        mascotaJugador = inputSnivy.id
    }
    else if (inputTepig.checked){
        spanMascotaJugador.innerHTML = inputTepig.id
        mascotaJugador = inputTepig.id
    } else {
        alert("DEBES SELECCIONAR UNA MASCOTA")
    }

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id = ${ataque.id} class ="boton_de_ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonAgua = document.getElementById("boton_agua")
    botonPlanta = document.getElementById("boton_planta")
    botonFuego = document.getElementById("boton_fuego")
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent == "AGUA"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.backgroundColor = "#112f58"
                boton.disabled = true
            } else if(e.target.textContent == "PLANTA"){
                ataqueJugador.push("PLANTA")
                console.log(ataqueJugador)
                boton.style.backgroundColor = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.backgroundColor = "#112f58"
                boton.disabled = true
            }
            if(ataqueJugador.length == 3){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    });
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function(response){
            if (response.ok){
                response.json()
                    .then(function({ ataques }){
                        if (ataques.length === 3){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push("AGUA")
    }
    else if (ataqueAleatorio == 2 || ataqueAleatorio == 3){
        ataqueEnemigo.push("PLANTA")
    }
    else {
        ataqueEnemigo.push("FUEGO")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length == 3 && ataqueEnemigo.length == 3){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] == ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        }
        else if(ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
        }
        else if(ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "PLANTA"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
        }
        else if(ataqueJugador[index] == "PLANTA" && ataqueEnemigo[index] == "AGUA"){    
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
        }
    }
    
    spanVidasJugador.innerHTML = victoriasJugador
    spanVidasEnemigo.innerHTML = victoriasEnemigo
    
    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("EMPATE")
    }
    else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICIDADES GANASTE")
    }
    else {
        crearMensajeFinal("PERDISTE")
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")
    
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas(){
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach((mokeponEnemigo) => {
        mokeponEnemigo.pintarMokepon()
        revisarColision(mokeponEnemigo)
    })
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(response) {
        if (response.ok){
            response.json()
                .then(function({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        console.log(mokeponesEnemigos)
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Oshawott"){
                            mokeponEnemigo = new Mokepon("Oshawott", "./assets/Oshawott.png", 3, "./assets/Oshawott_PA.png", enemigo.id)
                        }
                        else if (mokeponNombre === "Snivy"){
                            mokeponEnemigo  = new Mokepon("Snivy", "./assets/Snivy.png", 3, "./assets/Snivy_PA.png", enemigo.id)
                        }
                        else if (mokeponNombre === "Tepig"){
                            mokeponEnemigo  = new Mokepon("Tepig", "./assets/Tepig.png", 3, "./assets/Tepig_PA.png", enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })
                })
        }
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case "ArrowRight":
            moverDerecha()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

   if (abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo){
       return
   }
   detenerMovimiento()
   clearInterval(intervalo)
   enemigoId = enemigo.id
   sectionSeleccionarAtaque.style.display = "flex"
   sectionVerMapa.style.display = "none"
   seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener("load", inicarJuego)