const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const inconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');
const botonAleatorio = document.querySelector('.controles button.aleatorio');
const botonRepetir = document.querySelector('.controles button.repetir');

const playlistContainer = document.getElementById('playlist-container');
const volumeControl = document.getElementById("volumeControl");
const estado = document.getElementById('estado');
const estadoVolumen = document.getElementById('estadoVolumen');

let ultimoVolumen = volumeControl.value;

volumeControl.addEventListener("input", function (event) {
  cancion.volume = event.target.value;

  if (event.target.value == 0) {
    cancion.muted = true;
    estadoVolumen.textContent = 'muted';
  } else {
    cancion.muted = false;
    estadoVolumen.textContent = 'unmuted';
  }
});


const canciones = [
    {

        titulo: 'Introduction',
        imagen: 'img/CUP.jpg',
        nombre: 'Kristofer Kris Maddigan',
        fuente: 'music/03. Introduction.mp3',


    },
    {
        titulo: 'Gerudo Valley',
        nombre: 'Koji Kondo',
        fuente: 'music/68 Gerudo Valley.mp3',


    },
    {
        titulo: 'Windmill Hut',
        nombre: 'Koji Kondo',
        fuente: 'music/57 Windmill Hut.mp3',


    },
    {
        titulo: 'Super Smash Bros. Brawl Main Theme',
        nombre: 'Nobuo Uematsu',
        fuente: 'music/22-01. Super Smash Bros. Brawl Main Theme.mp3',


    },
    {
        titulo: 'Coconut Mall',
        nombre: 'Asuka Ohta',
        fuente: 'music/1-20. Coconut Mall_.mp3',


    },
    {
        titulo: 'Tren de la Luz Exprés',
        nombre: 'T-Pistonz+KMC',
        fuente: 'music/Spanish 09. Tren de la Luz Exprés.mp3',


    }


];

let indiceCancionActual = 0;
function actualizarInfoCancion() {

    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener('loadeddata', function () { });


};


botonReproducirPausar.addEventListener('click', reproducirPausar);
function reproducirPausar() {
    if (cancion.paused) {
        reproducirCancion();


    } else {
        pausarCancion();

    }
}


function reproducirCancion() {

    cancion.play();
    inconoControl.classList.add('bi-pause-fill')
    inconoControl.classList.remove('bi-play-fill')


}

function pausarCancion() {


    cancion.pause();
    inconoControl.classList.remove('bi-pause-fill')
    inconoControl.classList.add('bi-play-fill')

}

cancion.addEventListener('timeupdate', function () {

    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

progreso.addEventListener('input', function () {

    cancion.currentTime = progreso.value;

})
progreso.addEventListener('change', function () {

    reproducirCancion();


})
botonAdelante.addEventListener('click', function () {
    indiceCancionActual = Math.floor(Math.random() * canciones.length);
    actualizarInfoCancion();
    reproducirCancion()
})

botonAtras.addEventListener('click', function () {
    indiceCancionActual = Math.floor(Math.random() * canciones.length);
    actualizarInfoCancion();
    reproducirCancion()
})

cancion.onended = function () {
    botonAdelante.click();
};

document.addEventListener('keydown', function (event) {

    if (event.code === 'ArrowRight') {
        botonAdelante.click();
    }

    if (event.code === 'ArrowLeft') {
        botonAtras.click();
    }

});


const textos = ['Estableciendo conexión', 'Estableciendo conexión.', 'Estableciendo conexión..', 'Estableciendo conexión...', 'generando estructuras', 'generando estructuras.', 'generando estructuras..', 'generando estructuras...', 'uniendote al servidor', 'uniendote al servidor.', 'uniendote al servidor..', 'uniendote al servidor...'];
let i = 0;

setInterval(() => {
    i = (i + 1) % textos.length;
    estado.textContent = textos[i];
}, 2000);


document.onkeydown = function (e) {
  if (e.code === 'Space') {
    e.preventDefault();

    if (cancion.muted === false) {
      cancion.muted = true;
      volumeControl.value = 0;
      estadoVolumen.textContent = 'muted';
    } else {
      cancion.muted = false;
      volumeControl.value = 1;
      cancion.volume = 1;
      estadoVolumen.textContent = 'unmuted';
    }
  }
};


actualizarInfoCancion();
