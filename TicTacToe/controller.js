let turno = 1;
let fichas = ["O", "X"];
let puestas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
let botones = Array.from(document.getElementsByTagName("button"));

botones.forEach(button => button.addEventListener("click", ponerFicha));

function ponerFicha(event) {
    let botonPulsado = event.target;
    if (!partidaAcabada && botonPulsado.innerHTML == "") {
        botonPulsado.innerHTML = fichas[turno];
        puestas += 1;
        
        let estadoPartida = estado();
        if (estadoPartida == 0) {
            cambiarTurno();
            if (puestas < 9) {
                ia();
                estadoPartida = estado();
                puestas += 1;
                cambiarTurno();    
            }   
        }
        
        if (estadoPartida == 1 || estadoPartida == -1) {
            let mensaje = estadoPartida == 1 ? "You win! :)" : "You lost :(";
            textoVictoria.innerHTML = mensaje;
            textoVictoria.style.visibility = "visible";
            partidaAcabada = true;
            mostrarRecargarPagina();
        }
    }   
}

function cambiarTurno() {
    turno = turno === 1 ? 0 : 1;
}

function estado() {
    let lineasGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]             // diagonales
    ];

    for (let linea of lineasGanadoras) {
        let [a, b, c] = linea;
        if (botones[a].innerHTML !== "" &&
            botones[a].innerHTML === botones[b].innerHTML &&
            botones[a].innerHTML === botones[c].innerHTML) {
            botones[a].style.backgroundColor = "Fuchsia";
            botones[b].style.backgroundColor = "Fuchsia";
            botones[c].style.backgroundColor = "Fuchsia";
            return botones[a].innerHTML === fichas[1] ? 1 : -1;
        }
    }
    return puestas === 9 ? 2 : 0;
}

function ia() {
    let valores = botones.map(button => button.innerHTML);
    let pos = valores.indexOf("");

    if (pos === -1) return;

    botones[pos].innerHTML = "O";
}

function mostrarRecargarPagina() {
    let recargarPagina = document.getElementById("recargarPagina");
    recargarPagina.style.display = "block";
}

function ocultarRecargarPagina() {
    let recargarPagina = document.getElementById("recargarPagina");
    recargarPagina.style.display = "none";
}