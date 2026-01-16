// se obtienen los h1 del reproductor del html
const tituloCancion = document.querySelector('.reproductor h1');
// pilla los p dentro de reproductor
const nombreArtista = document.querySelector('.reproductor p');
// pilla la barra de progreso
const progreso = document.getElementById('progreso');
// pilla el elemento de audio principal
const cancion = document.getElementById('cancion');
// icono de pausa o play que lo pilla tambien
const inconoControl = document.getElementById('iconoControl');
// este si es el bton de play y pausa
const botonReproducirPausar = document.querySelector('.controles button.repa');
// botones de atras y alante
const botonAtras = document.querySelector('.controles button.atras');

const botonAdelante = document.querySelector('.controles button.adelante');


// pilla la barra del volumen
const Vcontrol = document.getElementById("volumeControl");
// muestra los carteles de conexion
const estado = document.getElementById('estado');
// pilla el texto que muestra si ha quitado o no el audio
const estadoV = document.getElementById('estadoVolumen');

// este eventlistener hace que salte la funcion que hace que cuando se mueva la barra de volumen se ajuste este mismo
Vcontrol.addEventListener("input", function (event) {
    // esto es lo que hace que se ajuste
    cancion.volume = event.target.value;
    // condicional que hace que si llega a 0 ponga el texto de mute
    if (event.target.value == 0) {
        cancion.muted = true;
        estadoV.textContent = 'muted';
    } else {
        // si no esta en 0 muestra unmuted
        cancion.muted = false;
        estadoV.textContent = 'unmuted';
    }
});

// esta es la lista de canciones con los datos de ada cancion
const canciones = [
    {

        titulo: 'Introduction',
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
// indice de la cancion que esta seleccionada al inicio
let indiceCancionActual = 0;
// funcion que actualiza los datos de la cancion segun la cancion que salte
function actualizarInfoCancion() {
    // cambia los h1 por el titulo de la cancion que suene
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    // cambia los p que haya por el nombre del autor
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    // encrgado de cambiar la cancion
    cancion.src = canciones[indiceCancionActual].fuente;


};

// cuando se haga click este event listener ejecutara la funcion
botonReproducirPausar.addEventListener('click', reproducirPausar);
function reproducirPausar() {
    // en el aso de estar pausada la vuelve a iniciar
    if (cancion.paused) {
        reproducirCancion();


    } else {
        // si la cancion esta en otro estado osea sonando se pausa
        pausarCancion();

    }
}

// reproduce la cancion y cambia su icono al de pause
function reproducirCancion() {

    cancion.play();
    // aqui añado el icono de de pause
    inconoControl.classList.add('bi-pause-fill')
    // a su vez debo de quitar el de play
    inconoControl.classList.remove('bi-play-fill')


}
// funcion que pausa la cancion y cambia su icono al de play osea lo que hace la anterior pero a la inversa
function pausarCancion() {

    cancion.pause();
    // al igual que antes quita el icono de pause

    inconoControl.classList.remove('bi-pause-fill')
    // y pone el de play
    inconoControl.classList.add('bi-play-fill')

}
// este evento se va a ejecutar mientras la cancion avanza 
cancion.addEventListener('timeupdate', function () {
    // basicamente asigna el valor del tiempo de la cancion para definirlo el la barra
    progreso.max = cancion.duration;
    // esto lo hace mediante el tiempo actual
    progreso.value = cancion.currentTime;
});
// si se arrastra el cursor de la arra de la cancion el tiempo de la cancion varia
progreso.addEventListener('input', function () {

    cancion.currentTime = progreso.value;

})
// cuando se suelte la barra volvera a hacer la accion de reproducir la cancion
progreso.addEventListener('change', function () {

    reproducirCancion();


})
// encargado de elegir una cancion random del monton que hay 
botonAdelante.addEventListener('click', function () {
    indiceCancionActual = Math.floor(Math.random() * canciones.length);
    actualizarInfoCancion();
    reproducirCancion()
})
// al igual que antes con el otro boton selecciona una cancion random
botonAtras.addEventListener('click', function () {
    indiceCancionActual = Math.floor(Math.random() * canciones.length);
    actualizarInfoCancion();
    reproducirCancion()
})
// esto hace que cunado se acabe la cancion el boton adelante se ejecute solo pasando a una cancion random
cancion.onended = function () {
    botonAdelante.click();
};
// este es el listener del teclado que ejecutara las acciones de paar de cancion segun la tecla pulsada
document.addEventListener('keydown', function (event) {

    if (event.code === 'ArrowRight') {
        botonAdelante.click();
    }

    if (event.code === 'ArrowLeft') {
        botonAtras.click();
    }

});

// estos son los textos que apareceran por pantalla de conexion
const textos = ['Estableciendo conexión', 'Estableciendo conexión.', 'Estableciendo conexión..', 'Estableciendo conexión...', 'generando estructuras', 'generando estructuras.', 'generando estructuras..', 'generando estructuras...', 'uniendote al servidor', 'uniendote al servidor.', 'uniendote al servidor..', 'uniendote al servidor...'];
let i = 0;
// lo que hace es que cada dos segundos se ponga el siguiente texto
setInterval(() => {
    i = (i + 1) % textos.length;
    estado.textContent = textos[i];
}, 2000);

// funciona como el anterior de la tecla de alante y a tras salvoq eu esta vez es para el espacio
document.onkeydown = function (e) {
    if (e.code === 'Space') {
        e.preventDefault();
        // evita problemas con el scroll de las webs

        if (cancion.muted === false) {
            // este if hace que si la cancionno este muteada lo este y la barra pase a valer 0
            cancion.muted = true;
            Vcontrol.value = 0;
            estadoV.textContent = 'muted';
        } else {
            // en el caso de no estar muteado lo mutea y sube el volumen al maximo, lo contario a lo anterior
            cancion.muted = false;
            Vcontrol.value = 1;
            cancion.volume = 1;
            estadoV.textContent = 'unmuted';
        }
    }
};

// encargad de inicializar la cancion al abrir la web
actualizarInfoCancion();
