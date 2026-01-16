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
const audio = document.getElementById("myAudio");
const volumeControl = document.getElementById("volumeControl");

volumeControl.addEventListener("input", function (event) {
    audio.volume = event.target.value;
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

    if (!cancion.paused) {
        progreso.vaue = cancion.currentTime;
    }




})

progreso.addEventListener('input', function () {

    cancion.currentTime = progreso.value;

})
progreso.addEventListener('change', function () {

    reproducirCancion();


})
botonAdelante.addEventListener('click', function () {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion()
})


botonAtras.addEventListener('click', function () {
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion()
})


actualizarInfoCancion();


