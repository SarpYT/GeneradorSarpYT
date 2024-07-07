let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');



let types = document.querySelectorAll('input[type=radio][name=type]');

types.forEach(type => {
    type.addEventListener('change', () =>{
        if (type.value == "movie") {
            document.getElementById('season-selector').style.display = "none";
        } else if (type.value == "serie"){
            document.getElementById('season-selector').style.display = "block";
        }
    })
})


function convertMinutes(minutess){
    let hours = Math.floor(minutess / 60) ,
    minutes = Math.floor(minutess % 60),
    total = '';

    if (minutess < 60){
        total = `${minutes}m`
        return total
    } else if (minutess > 60){
      total = `${hours}h ${minutes}m`
      return total
    } else if (minutess = 60){
        total = `${hours}h`
        return total
    }
}



async function searchMoviesAndSeries() {
  const searchQuery = document.getElementById('search-input').value;
  const languaje = "es-MX";



  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}&query=${searchQuery}`);
    const data = await response.json();

    // Mostrar los resultados en la página
    displaySearchResults(data.results);
  } catch (error) {
    console.log(error);
  }
}




function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('search-results');
  const moviesContainer = document.getElementById('movies-container');
  const seriesContainer = document.getElementById('series-container');

  // Limpiar resultados anteriores
  moviesContainer.innerHTML = "";
  seriesContainer.innerHTML = "";

  results.forEach((result) => {
    const resultItem = document.createElement('div');
    resultItem.className = "search-result-item";

    // Crear elemento para mostrar la carátula o póster
    const posterImg = document.createElement('img');
    posterImg.src = `https://image.tmdb.org/t/p/w300/${result.poster_path}`;
    posterImg.alt = result.title || result.name;
    resultItem.appendChild(posterImg);

    // Crear elemento para mostrar el nombre de la película o serie
    const nameElement = document.createElement('span');
    nameElement.textContent = result.title || result.name;
    resultItem.appendChild(nameElement);

    resultItem.addEventListener('click', () => {
      // Al seleccionar un resultado, cierra todos los resultados y actualiza el generador con el ID de la película o serie seleccionada
      document.getElementById('search-results').style.display = "none";
      document.getElementById('numero').value = result.id;
    });

    // Separar resultados en películas y series
    if (result.media_type === "movie") {
      moviesContainer.appendChild(resultItem);
    } else if (result.media_type === "tv") {
      seriesContainer.appendChild(resultItem);
    }
  });

  // Mostrar los resultados en pantalla
  searchResultsContainer.style.display = "block";
}













function generar() {
    let serieKey = document.getElementById('numero').value;
    let languaje = "es-MX"
    let seasonNumber = document.getElementById('numeroTemporada').value;

    const cargarPeliculas = async() => {

        if (isSerie.checked) {
            try {

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);
                const respuesta3 = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}/season/${seasonNumber}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);
                
                
    
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    const datosTemporada = await respuesta3.json();
                    
                    
let enlace4 = document.getElementById('enlace4').value; // Capturar el valor de enlace4
let enlace14 = document.getElementById('enlace14').value; // Capturar el valor de enlace14
let sand = document.getElementById('sand').value;        
                    
                        
                    let tags1 = '';
let tags2 = '';
let tags3 = '';
let tags4 = '';

for (let i = 0; i < Math.min(4, datos.genres.length); i++) {
    if (i < 1) {
        tags1 += `${datos.genres[i].name}  `;
    } else if (i < 2) {
        tags2 += `${datos.genres[i].name}  `;
    } else if (i < 3) {
        tags3 += `${datos.genres[i].name}  `;
    } else {
        tags4 += `${datos.genres[i].name}  `;
    }
}

// Elimina el último carácter "|" si hay al menos un género
tags1 = tags1.slice(0, -1);
tags2 = tags2.slice(0, -1);
tags3 = tags3.slice(0, -1);
tags4 = tags4.slice(0, -1);




                    let creators = '';

if (datos.created_by && datos.created_by.length > 0) {
    datos.created_by.forEach((creator, i) => {
        if (i === datos.created_by.length - 1) {
            creators += creator.name;
        } else {
            creators += `${creator.name}, `;
        }
    });
} else {
    creators = "no registrado";
}

    
                       
                    let episodeList = '';
const defaultImage = `https://image.tmdb.org/t/p/w300/${datos.poster_path}`; // Utiliza la URL del póster o la carátula de la serie como imagen predeterminada

datosTemporada.episodes.forEach(episode => {
    let runtime ;
    if (episode.runtime != null) {
        runtime = convertMinutes(episode.runtime);
    } else {
        runtime = ''
    }
    
    // Verificar si hay una imagen disponible para el episodio
    let imageUrl = episode.still_path ? `https://image.tmdb.org/t/p/w300/${episode.still_path}` : defaultImage;

    // Agregar la fecha de estreno
    let airDate = new Date(episode.air_date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// Crear un contenedor para la descripción del episodio
let descriptionContainer = '';

// Verificar si hay una descripción disponible para el episodio
if (episode.overview) {
    descriptionContainer = episode.overview;
} else {
    descriptionContainer = 'Sin descripción del capítulo';
}


// Crear un contenedor para la valoración del episodio
    let ratingContainer = '';

    // Verificar si hay una valoración disponible para el episodio
    if (episode.vote_average) {
        ratingContainer = episode.vote_average;
    } else {
        ratingContainer = '0';
    }



    episodeList += `
    
<li><a class="fa-play-circle d-inline-flex align-items-center rounded" href="#EPISODELINK"><figure>
    <center>
        <div class="texto-Sarp">
            ${airDate}
        </div>
    </center>

<img src="${imageUrl}" style="border-radius:9px;"></figure><div class="flex-grow-1"><p>${datos.name}<span> ${episode.episode_number}
<div class="toggle-container" id="${episode.name}.2.${episode.episode_number}.${runtime}">
<div class="toggle-label">No visto</div>
<div class="toggle-switch">
<div class="toggle-slider"></div>
</div>
</div>
</span></div></a></li>`;
});





                    
    
                    let seasonsOption = '';
    
                    datos.seasons.forEach(season => {
                        
                        if(season.name != "Especiales"){
                            seasonsOption += `
                            
<div class="option" data-option="Temporada ${season.season_number}" onclick="selectOption('Temporada ${season.season_number}')">Temporada ${season.season_number}</div>

                            `
                        }
                    })
    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Temporada"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Temporadas"
                    }
                    
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = ` 
                    
<html lang="es"><head>
<meta charset="utf-8">
<meta content="es" name="language">
<title>${datos.name}</title>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<link rel="stylesheet" href="https://tioanime.com/assets/css/bootstrap.min.css?v=1.0.1" media="all">
<link rel="stylesheet" href="https://tioanime.com/assets/css/main.css?v=2.2.6" media="all">
<style>
	#favoritoBtn {
Font-weight;700;
color:white;

font-size:11px;
background:rgba(0, 0, 0,.5);
padding:06px 10px;
border: 2px solid white;
border-radius:12px;
}

#favoritoBtn:hover{background:rgba(121, 121, 255,.5);}

.toggle-container {
display: flex;
flex-direction: column;

padding: 03px ;
background-color: #;
width: auto;
border-radius: 5px;
cursor: pointer;
margin-bottom: 10px;
margin-left: auto;

}

.toggle-label {
font-size: 14px;
margin-bottom: 5px;
transition: color 0.3s;
color:white;
}

.toggle-switch {
width: 55px;
height: 25px;
background-color: #ddd;
border-radius: 15px;
position: relative;
margin-right: 01px;
}

.activado .toggle-switch {
background-color: green;
}

.toggle-slider {
width: 25px;
height: 25px;
border-radius: 50%;
background-color: #888;
position: absolute;
top: 0;
left: 0;
transform: translateX(0);
transition: transform 0.3s, background-color 0.3s;
}

.activado .toggle-slider {
transform: translateX(100);
background-color: #00ff00; /* Color verde cuando está activado */
}

.activado .toggle-label {
color: #00ff00; /* Color verde cuando está activado */
}

*{-webkit-tap-highlight-color:transparent;}

        

        .texto-Sarp {
white-space: nowrap;
overflow: hidden;
font-size:9px;

}

	</style>

<link href="https://fonts.googleapis.com/css?family=Asap:400,700" rel="stylesheet">
<script src="https://kit.fontawesome.com/2a41106415.js" crossorigin="anonymous"></script>
<link rel="icon" href="/assets/img/icon-32x32.png" sizes="32x32">
<link rel="manifest" href="/manifest.json">
<body class="dark">
<div id="tioanime">


<div class="container">
<a class="navbar-brand" href="/">

</a>
</div>
</nav>
</header>
<article class="anime-single">
<div class="container">
<div class="row">
<aside class="col col-sm-4 col-lg-3 col-xl-2">
<div class="thumb">
<figure><img src="https://image.tmdb.org/t/p/w500/${datos.poster_path}"></figure>
<a class="btn btn-danger btn-block status"><i class="fa-play-circle"></i>Finalizado</a>
</div>
</aside>
<aside class="col col-sm-8 col-lg-9 col-xl-10">
<h1 class="title">${datos.name} (${datos.first_air_date.slice(0,4)})</h1>
<div class="meta">
<span class="anime-type-peli">Anime</span>
<span class="season">
</span>
</div>
<p class="genres">
<span class="btn btn-sm btn-primary rounded-pill">
 <a href="" class="btn btn-sm btn-light rounded-pill">${tags1}</a>
</span>

<span class="btn btn-sm btn-primary rounded-pill">
 <a href="" class="btn btn-sm btn-light rounded-pill">${tags2}</a>
</span>

<span class="btn btn-sm btn-primary rounded-pill">
 <a href="" class="btn btn-sm btn-light rounded-pill">${tags3}</a>
</span>

<span class="btn btn-sm btn-primary rounded-pill">
 <a href="" class="btn btn-sm btn-light rounded-pill">${tags4}</a>
</span>



</p>
<p class="sinopsis">${datos.overview}</p>

</aside>
</div>
</div>
<figure class="backdrop"><img src="https://image.tmdb.org/t/p/original/${datos.poster_path}"></figure>



</article>
<div class="container">
<div class="row justify-content-between">
<aside class="principal col-12">

<center><button id="favoritoBtn" data-identificador="${enlace14}" onclick="toggleFavorito()">Agregar a Favoritos</button></center><br>

<div id="favoritoData" style="display: none;">
<img id="favoritoImagen" class="poster" src="https://image.tmdb.org/t/p/w300/${datos.poster_path}" alt="Poster de la Película">
<a id="favoritoEnlace" href="${enlace4}"></a>
<span id="nombre">${datos.name}</span>
</div>



<section>
	
<div class="header">
<h3 class="title fa-list-ul">Temporada ${seasonNumber}</h3>

<ul class="episodes-list list-unstyled">

${episodeList}




</ul>
</section>

<!--PEGA AQUÍ LA TEMPORADA SIGUIENTE-->

</aside>
</div>
</div>
<script src="https://tioanime.com/assets/js/bootstrap.min.js?v=1.2.0"></script>
</body>
<script>
const favoritoBtn = document.getElementById('favoritoBtn');
const identificador = favoritoBtn.getAttribute('data-identificador');

function toggleFavorito() {
const favoritoEnlace = document.getElementById('favoritoEnlace');
const imagen = document.getElementById('favoritoImagen');
const nombre = document.getElementById('nombre').textContent; // Obtener el texto del span
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const encontrado = favoritos.some(favorito => favorito.identificador === identificador);

if (encontrado) {
const nuevosFavoritos = favoritos.filter(favorito => favorito.identificador !== identificador);
favoritoBtn.textContent = 'Agregar a Favoritos';
localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
} else {
favoritos.push({
identificador: identificador,
imagen: imagen.outerHTML,
enlace: favoritoEnlace.href,
nombre: nombre, // Agregar el nombre al objeto
});

favoritoBtn.textContent = 'Borrar de Favoritos';
localStorage.setItem('favoritos', JSON.stringify(favoritos));
}
}

const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const encontradoInicial = favoritos.some(favorito => favorito.identificador === identificador);

if (encontradoInicial) {
favoritoBtn.textContent = 'Borrar de Favoritos';
} else {
favoritoBtn.textContent = 'Agregar a Favoritos';
}
</script>
<script>
    
// Obtener todos los elementos con la clase 'toggle-container'
const toggleContainers = document.querySelectorAll('.toggle-container');

// Iterar sobre cada toggle-container y asignar eventos
toggleContainers.forEach(container => {
const toggleLabel = container.querySelector('.toggle-label');
const toggleSlider = container.querySelector('.toggle-slider');

// Cargar estado desde el almacenamiento local
const storedToggleState = localStorage.getItem(container.id);
if (storedToggleState === 'activado') {
activarToggle(container, toggleLabel, toggleSlider);
}

// Asignar evento de clic a cada toggle-container
container.addEventListener('click', (event) => toggleSwitch(event, container, toggleLabel, toggleSlider));
});

function toggleSwitch(event, container, status, slider) {
// Detener la propagación del evento para evitar que el enlace se abra
event.stopPropagation();

// Prevenir el comportamiento predeterminado del enlace
event.preventDefault();

if (container.classList.contains('activado')) {
desactivarToggle(container, status, slider);
} else {
activarToggle(container, status, slider);
}
}

function activarToggle(container, status, slider) {
container.classList.add('activado');
status.textContent = 'Visto';
slider.style.transform = 'translateX(36px)';
slider.style.backgroundColor = '#ccc';
localStorage.setItem(container.id, 'activado');
}

function desactivarToggle(container, status, slider) {
container.classList.remove('activado');
status.textContent = 'No visto';
slider.style.transform = 'translateX(0)';
slider.style.backgroundColor = '#ccc';
localStorage.setItem(container.id, 'desactivado');
}

function desactivarToggle(container, status, slider) {
container.classList.remove('activado');
status.textContent = 'No visto';
slider.style.transform = 'translateX(0)';
slider.style.backgroundColor = '#ccc';
localStorage.setItem(container.id, 'desactivado');
}
</script>

<script>
document.addEventListener('click', function(event) {
// Verificar si el clic fue dentro de un contenedor con la clase 'toggle-container'
if (event.target.closest('.toggle-container')) {
event.preventDefault();
}
});
</script>

</html>
    
                    `;
                    
                    let seasonOnly = `
                    
                    <section>
	
<div class="header">
<h3 class="title fa-list-ul">Temporada ${seasonNumber}</h3>

<ul class="episodes-list list-unstyled">

${episodeList}




</ul>
</section>
    
 <!--PEGA AQUÍ LA TEMPORADA SIGUIENTE-->
    
                    `;
    
                    const btnCopiar = document.getElementById('copiar');
    
                    if (seasonNumber == 1) {
                        template.innerText = justHtml;
                    } else if (seasonNumber > 1){
                        template.innerText = seasonOnly;
                    }
    
                    let templateHTML = template.innerText;
                    console.log(justHtml, typeof justHtml)
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
                    genTitle.innerText = datos.name;
                    genSeasons.innerText = datos.number_of_seasons + genSeasonsCount;
                    genYear.innerText = datos.first_air_date.slice(0,4);
    
    
    
    
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }
        } else
        if(isMovie.checked){
            try {

            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${serieKey}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                console.log(datos);
                
let enlaceY1 = document.getElementById('enlaceY1').value;         
let enlaceY2 = document.getElementById('enlaceY2').value;            
let enlaceY3 = document.getElementById('enlaceY3').value;           
let enlace4 = document.getElementById('enlace4').value; // Capturar el valor de enlace4
let enlace14 = document.getElementById('enlace14').value; // Capturar el valor de enlace14     
let enlace43 = document.getElementById('enlace43').value; // Capturar el valor de enlace43    



                let tags1 = '';
let tags2 = '';
let tags3 = '';
let tags4 = '';

for (let i = 0; i < Math.min(4, datos.genres.length); i++) {
    if (i < 1) {
        tags1 += `${datos.genres[i].name}  `;
    } else if (i < 2) {
        tags2 += `${datos.genres[i].name}  `;
    } else if (i < 3) {
        tags3 += `${datos.genres[i].name}  `;
    } else {
        tags4 += `${datos.genres[i].name}  `;
    }
}

// Elimina el último carácter "|" si hay al menos un género
tags1 = tags1.slice(0, -1);
tags2 = tags2.slice(0, -1);
tags3 = tags3.slice(0, -1);
tags4 = tags4.slice(0, -1);
                    
                


                    let template = document.getElementById('html-final');

                    let justHtml = `





<html lang="es"><head>
<meta charset="utf-8">
<meta content="es" name="language">
<title>${datos.title}</title>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<link rel="stylesheet" href="https://tioanime.com/assets/css/bootstrap.min.css?v=1.0.1" media="all">
<link rel="stylesheet" href="https://tioanime.com/assets/css/main.css?v=2.2.6" media="all">
<style>
#favoritoBtn {
Font-weight;700;
color:white;

font-size:11px;
background:rgba(0, 0, 0,.5);
padding:06px 10px;
border: 2px solid white;
border-radius:12px;
}

#favoritoBtn:hover{background:rgba(121, 121, 255,.5);}

.toggle-container {
display: flex;
flex-direction: column;
border: 0.5px solid white;
padding: 03px ;
background-color: rgba(255, 0, 0, 0.1);

width: auto;
border-radius: 5px;
cursor: pointer;
margin-bottom: 10px;
margin-left: auto;

}

.toggle-label {
font-size: 14px;
margin-bottom: 5px;
transition: color 0.3s;
color:white;
}

.toggle-switch {
width: 55px;
height: 25px;
background-color: transparent;
border-radius: 15px;
border: 0.5px solid white;
position: relative;
margin-right: 01px;
}

.activado .toggle-switch {
background-color: rgba(255, 255, 0, 0.1);
}

.toggle-slider {
width: 25px;
height: 25px;
border-radius: 50%;
background-color: #888;
position: absolute;
top: 0;
left: 0;
transform: translateX(0);
transition: transform 0.3s, background-color 0.3s;
}

.activado .toggle-slider {
transform: translateX(100);
background-color: #00ff00; /* Color verde cuando está activado */
}

.activado .toggle-label {
color: #00ff00; /* Color verde cuando está activado */
}

*{-webkit-tap-highlight-color:transparent;}



.texto-Sarp {
white-space: nowrap;
overflow: hidden;
font-size:9px;

}

.Isabella {


width: 70px;
margin: 5px;
top: 95;
left: 06;
}

.containerImgF {
width: 160px;
height: 96px;
overflow: hidden;
left:-10;
position: relative;
border-radius:9px;
}

.containerImgF img {
width: 100%;
height: auto;
object-fit: cover;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}

.contenedorSD {
  display: flex;
}

.SarpVG {
	font-size: 14px;
margin-bottom: 5px;
transition: color 0.3s;
color:white;
	}
</style>

<link href="https://fonts.googleapis.com/css?family=Asap:400,700" rel="stylesheet">
<script src="https://kit.fontawesome.com/2a41106415.js" crossorigin="anonymous"></script>
<link rel="icon" href="/assets/img/icon-32x32.png" sizes="32x32">
<link rel="manifest" href="/manifest.json">
<body class="dark">
<div id="tioanime">


<div class="container">
<a class="navbar-brand" href="/">

</a>
</div>
</nav>
</header>
<article class="anime-single">



<div class="container">
<div class="row">
<aside class="col col-sm-4 col-lg-3 col-xl-2">
<div class="thumb">
<figure><img src="https://image.tmdb.org/t/p/w500/${datos.poster_path}"></figure>


<a id="transmitButton" class="btn btn-danger btn-block status" href="#" data-intent="wvc-x-callback://open?url=${enlace43}&secure_uri=true" onclick="abrirApp()"><i class="fas fa-tv"></i> <i class="fas fa-wifi"></i>
Transmistir</a>



</div>
</aside>



<aside class="col col-sm-8 col-lg-9 col-xl-10">
	
	
	<div class="contenedorSD">
  

<div class="Isabella">

<div class="toggle-container">
	<center>
<div class="SarpVG">${convertMinutes(datos.runtime)}</div>
<span class="anime-type-peli">Película</span>
</div>
	</center>
</div>

<div class="Isabella">

<div class="toggle-container">
	<center>
<div class="SarpVG">${datos.vote_average.toFixed(1)} <i class="far fa-star"></i></div>
<span class="anime-type-peli">Anime</span>
</div>
	</center>
</div>

<div class="Isabella">

<div class="toggle-container" id="${convertMinutes(datos.runtime)}.${datos.release_date.slice(0,4)}.${datos.title}.${tags1}${tags2} ${tags3} ${tags4}">
		<center>
<div class="toggle-label">No visto</div>
<div class="toggle-switch">
<div class="toggle-slider"></div>
</div>
</div>
	</center>
</div>

</div>

	
<h1 class="title">${datos.title} (${datos.release_date.slice(0,4)})</h1>
<div class="meta">



<span class="season">
</span>
</div>
<p class="genres">
<span class="btn btn-sm btn-primary rounded-pill">
<a href="" class="btn btn-sm btn-light rounded-pill">${tags1}</a>
</span>

<span class="btn btn-sm btn-primary rounded-pill">
<a href="" class="btn btn-sm btn-light rounded-pill">${tags2}</a>
</span>

<span class="btn btn-sm btn-primary rounded-pill">
<a href="" class="btn btn-sm btn-light rounded-pill">${tags3}</a>
</span>

<span class="btn btn-sm btn-primary rounded-pill">
<a href="" class="btn btn-sm btn-light rounded-pill">${tags4}</a>
</span>



</p>
<p class="sinopsis">
${datos.overview}
</p>

</aside>
</div>
</div>

<figure class="backdrop"><img src="https://image.tmdb.org/t/p/original/${datos.poster_path}"></figure>



</article>
<div class="container">
<div class="row justify-content-between">
<aside class="principal col-12">



<center><button id="favoritoBtn" data-identificador="${enlace14}" onclick="toggleFavorito()">Agregar a Favoritos</button></center><br>

<div id="favoritoData" style="display: none;">
<img id="favoritoImagen" class="poster" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}" alt="Poster de la Película">
<a id="favoritoEnlace" href="${enlace4}"></a>
<span id="nombre">${datos.title}</span>
</div>


<section>

<div class="header">
<h3 class="title fa-list-ul">Servidores 💿📀💽</h3>

<ul class="episodes-list list-unstyled">



<li><a class="fa-play-circle d-inline-flex align-items-center rounded" href="${enlaceY1}"><figure>

<div class="containerImgF">
<img src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">
</div>

</figure><div class="flex-grow-1"><p>SERVIDOR<span> #1
</span></div></a></li>

<li><a class="fa-play-circle d-inline-flex align-items-center rounded" href="${enlaceY2}"><figure>

<div class="containerImgF">
<img src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">
</div>

</figure><div class="flex-grow-1"><p>SERVIDOR<span> #2
</span></div></a></li>


<li><a class="fa-play-circle d-inline-flex align-items-center rounded" href="${enlaceY3}"><figure>

<div class="containerImgF">
<img src="https://image.tmdb.org/t/p/w500/${datos.poster_path}">
</div>

</figure><div class="flex-grow-1"><p>SERVIDOR<span> #3
</span></div></a></li>



</ul>
</section>

<!--PEGA AQUÍ LA TEMPORADA SIGUIENTE-->

</aside>
</div>
</div>
<script src="https://tioanime.com/assets/js/bootstrap.min.js?v=1.2.0"></script>
</body>
<script>
const favoritoBtn = document.getElementById('favoritoBtn');
const identificador = favoritoBtn.getAttribute('data-identificador');

function toggleFavorito() {
const favoritoEnlace = document.getElementById('favoritoEnlace');
const imagen = document.getElementById('favoritoImagen');
const nombre = document.getElementById('nombre').textContent; // Obtener el texto del span
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const encontrado = favoritos.some(favorito => favorito.identificador === identificador);

if (encontrado) {
const nuevosFavoritos = favoritos.filter(favorito => favorito.identificador !== identificador);
favoritoBtn.textContent = 'Agregar a Favoritos';
localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
} else {
favoritos.push({
identificador: identificador,
imagen: imagen.outerHTML,
enlace: favoritoEnlace.href,
nombre: nombre, // Agregar el nombre al objeto
});

favoritoBtn.textContent = 'Borrar de Favoritos';
localStorage.setItem('favoritos', JSON.stringify(favoritos));
}
}

const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const encontradoInicial = favoritos.some(favorito => favorito.identificador === identificador);

if (encontradoInicial) {
favoritoBtn.textContent = 'Borrar de Favoritos';
} else {
favoritoBtn.textContent = 'Agregar a Favoritos';
}
</script>
<script>
function abrirApp() {
var intentUrl = document.getElementById("transmitButton").getAttribute("data-intent");

// Crear un elemento "iframe" oculto para intentar abrir la URL personalizada
var iframe = document.createElement("iframe");
iframe.style.display = "none";
iframe.src = intentUrl;
document.body.appendChild(iframe);

// Esperar un tiempo breve y redirigir al enlace si el intent no se ejecutó
setTimeout(function() {
document.body.removeChild(iframe);
window.location.href = "#"; // Redirige al enlace original
}, 3000); // Espera 3 segundos antes de redirigir (ajusta según necesites)
}
</script>
<script>

// Obtener todos los elementos con la clase 'toggle-container'
const toggleContainers = document.querySelectorAll('.toggle-container');

// Iterar sobre cada toggle-container y asignar eventos
toggleContainers.forEach(container => {
const toggleLabel = container.querySelector('.toggle-label');
const toggleSlider = container.querySelector('.toggle-slider');

// Cargar estado desde el almacenamiento local
const storedToggleState = localStorage.getItem(container.id);
if (storedToggleState === 'activado') {
activarToggle(container, toggleLabel, toggleSlider);
}

// Asignar evento de clic a cada toggle-container
container.addEventListener('click', (event) => toggleSwitch(event, container, toggleLabel, toggleSlider));
});

function toggleSwitch(event, container, status, slider) {
// Detener la propagación del evento para evitar que el enlace se abra
event.stopPropagation();

// Prevenir el comportamiento predeterminado del enlace
event.preventDefault();

if (container.classList.contains('activado')) {
desactivarToggle(container, status, slider);
} else {
activarToggle(container, status, slider);
}
}

function activarToggle(container, status, slider) {
container.classList.add('activado');
status.textContent = 'Visto';
slider.style.transform = 'translateX(36px)';
slider.style.backgroundColor = '#ccc';
localStorage.setItem(container.id, 'activado');
}

function desactivarToggle(container, status, slider) {
container.classList.remove('activado');
status.textContent = 'No visto';
slider.style.transform = 'translateX(0)';
slider.style.backgroundColor = '#ccc';
localStorage.setItem(container.id, 'desactivado');
}

function desactivarToggle(container, status, slider) {
container.classList.remove('activado');
status.textContent = 'No visto';
slider.style.transform = 'translateX(0)';
slider.style.backgroundColor = '#ccc';
localStorage.setItem(container.id, 'desactivado');
}
</script>

<script>
document.addEventListener('click', function(event) {
// Verificar si el clic fue dentro de un contenedor con la clase 'toggle-container'
if (event.target.closest('.toggle-container')) {
event.preventDefault();
}
});
</script>

</html>


`;                  
                    template.innerText = justHtml;
                    let templateHTML = template.innerText;
                    
                    const btnCopiar = document.getElementById('copiar');
                    
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })
    
    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    
                                   
                    
                    
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${datos.poster_path}`)

                    genTitle.innerText = datos.title;
                    genSeasons.innerText = "";
                    genYear.innerText = datos.release_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }           
        }

    }

    cargarPeliculas();

}



generar();



