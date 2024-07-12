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
                    
                        
                    let tags = '';
    
                    datos.genres.forEach(genre => {
                        if (genre.name != datos.genres[datos.genres.length - 1].name) {
                            tags += `${genre.name}, `
                        } else {
                            tags += datos.genres[datos.genres.length - 1].name
                        }
                    });

                    let creators = '';
    
                    datos.created_by.forEach((creator, i) => {
                        if (i == datos.created_by.length - 1){
                            creators += creator.name
                        } else{
                            creators += `${creator.name}, `

                        }
                    });
    
                       
                    let episodeList = '';
    
                    datosTemporada.episodes.forEach(episode => {
                        let runtime ;
                        if (episode.runtime != null) {
                            runtime = convertMinutes(episode.runtime);
                        } else {
                            runtime = ''
                        }
                        episodeList += `
                        
                        
                        <a href="#!ENLACEDETUVIDEO" class="capitulo">
                <div class="imagen">
                    <img src="https://image.tmdb.org/t/p/w300/${episode.still_path}" alt="Capítulo 1">
                    <div class="duracion">${runtime}</div>
                    <div class="titulo">${episode.episode_number}. ${episode.name}</div>
<div class="play-icon">
            <i class="fas fa-play"></i>
        </div>                    
                </div>
            </a>
                        
                        
                        `
                    })
    
                    let seasonsOption = '';
    
                    datos.seasons.forEach(season => {
                        
                        if(season.name != "Especiales"){
                            seasonsOption += `<option value="capitulos-temporada${season.season_number}">Temporada ${season.season_number}</option>
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
                    
<!DOCTYPE html>
<html>
                            
  <link rel="stylesheet" href="https://ia902708.us.archive.org/16/items/sarp-generador-series-pelis/Sarp%20Generador%20SeriesPelis.css">                          
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
       
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
   <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${datos.name}</title>     
<style>
.post-header::before {
  content: "";
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1.1)),
  url('https://image.tmdb.org/t/p/w300/${datos.poster_path}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

#favoritoBtn {
    Font-weight;700;
    color:white;
    font-size:20px;
    background:rgba(0, 0, 0,.5);
    padding:10px;
    border: 2px solid white;
    border-radius:12px;
}

#favoritoBtn:hover{background:rgba(121, 121, 255,.5);}

/* Estilos de CSS */
a {
text-decoration: none; /* Elimina el subrayado de los enlaces */
color: inherit; /* Hereda el color del texto circundante */
cursor: pointer; /* Cambia el cursor al pasar por encima de los enlaces */
-webkit-tap-highlight-color: transparent; /* Elimina el resaltado en dispositivos tÃ¡ctiles */
}


.post-body-wrapper {
max-width: 90%;
margin: 20px auto
}


body{
background-color: black;
color: white;
margin:0;
padding: 0;

}

a {
text-decoration: none; /* Para quitar el subrayado */
user-select: none; /* Para evitar la selecciÃ³n de texto */
}
ul, ol {
list-style: none;
}


.post-header {
color:white;
padding: 20px;
border-radius: 10px;
overflow: hidden;
display: grid;

grid-template-columns: 200px 1fr;
grid-gap: 20px;
position: relative; /* AÃ±ade esta lÃ­nea para que el contenido interno se muestre por encima del fondo */

}


.post-header .image-and-btn img {
width: 100%;
border-radius: 10px;
aspect-ratio: 2/3;
margin-bottom: 10px
}

.bs-favs,.delete-btn {
display: block;
width: 100%;
padding: 15px 20px;
font-size: 15px;
background: rgba(255,255,255,.15);
border: 1px solid rgba(255,255,255,.1);
border-radius: 10px;
cursor: pointer
}

.delete-btn {
background: blue;
}

.none-btn {
display: none
}

.post-header__info {
display: flex;
flex-direction: column;
gap: 5px;
position: relative;
top: -100px;
opacity: 0;
animation: appearFromTop 1s forwards;
}

@keyframes appearFromTop {
0% {
top: -100px;
opacity: 0;
}
100% {
top: 0;
opacity: 1;
}
}
.post-header__info ul {
display: flex;
gap: 15px
}

.post-header__info ul li {
display: inline-block;
border: 2px solid rgba(255,255,255,.4);
padding: 5px 10px;
border-radius: 5px;
font-weight: 500
}

.post-header__info ul li.tmdb-rate {
background: gold;
border: 1px solid #736201
}

.tmdb-rate,.tmdb-rate i {
color: #000
}

.post-header__info p.resume {
font-weight: 700;
}

.sub-menu {
border-top: 3px solid var(--main-color)
}

@media screen and (max-width:870px) {
.post-header {
grid-template-columns: 1fr;
text-align: center
}

.image-and-btn {

width: 40%;
margin: 0 auto;
text-align: center;
position: relative;
top: -100px;
opacity: 0;
animation: appearFromTop 1s forwards;
}

@keyframes appearFromTop {
0% {
top: -100px;
opacity: 0;
}
100% {
top: 0;
opacity: 1;
}
}

.post-header .image-and-btn img {
width: 80%;
margin: 0 auto

}

.post-header__info {
align-items: center
}

.post-header__info p.resume {
text-align: justify
}
}

@media screen and (max-width:490px) {
.post-header__info ul li {
font-size: 14px
}

.image-and-btn {
width: 60%

}

.post-header__info {
align-items: center
}

.post-header__info p.resume {
text-align: justify
}
}

@media only screen and (max-width:870px) {
.sub-menu {
border-top: none
}
}




.poster-img {
border: 2px solid white;
}






.contenedor-scroll {
display: flex;
overflow-x: auto;
width: 90%;
white-space: nowrap;
padding-top: 10px;
padding-right: 0;
padding-left: 20px;
background-color: #;
border-radius: 10px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
margin-top: 20px;
height: 210px;
margin-left: auto;
margin-right: auto;
}

.capitulo {
display: inline-block;
margin-right:16px;
text-align: center;


text-decoration: none;
position: relative;
color: #000;
opacity: 0; /* Comienza invisible */
animation: aparecer 1s forwards; /* Aplica la animaciÃ³n */
}

@keyframes aparecer {
to {
opacity: 1; /* Termina completamente visible */
}
}

.imagen {
position: relative;
display: inline-block;
max-width: 200px;
max-height: 300px;

}
.imagen img {
max-width: 100%;
border-radius: 9px;
max-height: 100%;
}
.duracion {
position: absolute;
top: 10px;
left: 10px;
background-color: rgba(0, 0, 0, 0.7);
color: white;
padding: 5px;
border-radius: 5px;
max-width: 80%; /* Asegura que no se desborde si el texto es muy largo */
direction: rtl; /* Cambia la direcciÃ³n del texto a derecha a izquierda */
}

.titulo {
position: absolute;
top: 100%; /* Cambiar a "bottom: 0;" para colocarlo debajo de la imagen */
left: 0;
width: 96%; /* Ajustar el ancho del tÃ­tulo */
background-color: #222222;
color: white;
padding: 5px;
border-radius: 5px;
white-space: normal;
margin-top: 10px;

}
.temporadas {
margin-top: 20px;
text-align: center;
font-weight: 700;
background: black;
color:white;
width: 200px;
height: 60px;
border-radius:8px;
border: 2px solid yellow;
}

#seleccionar-temporada {
background: #333333;
font-weight: 700;
color: white;
border-radius:6px;
height: 30px;
border:none;
margin-top: 6px;
outline: none;



}
#seleccionar-temporada:hover {
background: red;
}

.capitulo .imagen {
position: relative;
transition: transform 0.5s; /* Agregamos una transiciÃ³n */
}

.capitulo:hover .imagen {
transform: scale(1.1); /* Cambia el tamaÃ±o de la imagen al colocar el cursor sobre el enlace */
}

.play-icon {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
font-size: 40px; /* Ajusta el tamaÃ±o segÃºn tu preferencia */
color: rgba(255, 255, 255, 0.5); /* Color del Ã­cono */
opacity: 0; /* Comienza invisible */
transition: opacity 0.5s;
}

.play-icon a {
display: block;
width: 100%;
height: 100%;
color: inherit; /* Hereda el color del enlace padre */
text-decoration: none; /* Elimina la decoraciÃ³n del enlace */
}

.capitulo:hover .play-icon {
opacity: 1; /* Se hace visible cuando el enlace se coloca sobre Ã©l */
}

.capitulo .informacion {
margin-top: 5px; /* Ajusta el margen superior para separar la informaciÃ³n */
text-align: center;
}

/* Estilos del iframe */
.video-container {
position: relative;
padding-bottom: 56.25%;
padding-top: 30px;
height: 0;
overflow: hidden;
border: 2px solid #ffffff;
width: 90%;
height: auto;
border-radius: 9px;
}
.video-container iframe,
.video-container object,
.video-container embed {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
/* Estilos de los botones de servidor */
.server-buttons {
text-align: center;
margin-top: 20px;
}
.server-buttons button {
background-color: #333333;
color: white;
border: none;
padding: 10px 20px;
margin: 0 10px;
cursor: pointer;
font-size: 16px;
border-radius: 5px;
}
</style>                  

</head>
<body>
                    
<div class="post-header">
<div class="image-and-btn">
<img src="https://image.tmdb.org/t/p/w300/${datos.poster_path}" class="poster-img" alt="" />

<button id="favoritoBtn" data-identificador="${enlace14}" onclick="toggleFavorito()">Agregar a Favoritos</button>

<div id="favoritoData" style="display: none;">
  <img id="favoritoImagen" class="poster" src="https://image.tmdb.org/t/p/w300/${datos.poster_path}" alt="Poster de la Película">
  <a id="favoritoEnlace" href="${enlace4}"></a>
  <span id="nombre">${datos.name}</span>
</div>                        







</div>

<div class="post-header__info">
<h1>${datos.name}</h1>
<ul>
<li class="tmdb-rate"><i class="far fa-star"></i> ${datos.vote_average.toFixed(1)}</li>
<li>${datos.number_of_seasons + genSeasonsCount}</li>
<li>${datos.first_air_date.slice(0,4)}</li>
</ul>

<!--- Agrega la sipnosis en <p class="resume">AQUI VA LA SIPNOSIS SI NO TE LA DA EL GENERADOR</p> --->

<p class="resume">${datos.overview}</p>
<div class="more-data">
<p>Generos: ${tags}</p>




<p>Created by: ${creators}</p>
</div>
</div>
</div>



      <!--EPISODIOS Y TEMPORADAS-->
      
  <center><div class="temporadas">
        <label for="seleccionar-temporada">Seleccionar temporada</label>
        <select id="seleccionar-temporada">
            ${seasonsOption}
        </select>
    </div></center>



    <div class="contenedor-scroll" id="contenedor-capitulos">
      
        <div class="capitulos" id="capitulos-temporada${seasonNumber}">
            <!-- Capítulos  temporada ${seasonNumber} -->
            
            ${episodeList}
        </div>
         
         <!-- PEGA AQUÍ LAS TEMPORADAS FALTANTES -->



        </div>
        
</body>        
        
 <script>
   const temporadas = document.querySelectorAll(".capitulos");
   const seleccionarTemporada = document.getElementById("seleccionar-temporada");

   temporadas.forEach(temporada => {
     temporada.style.display = "none";
   });

   temporadas[0].style.display = "block"; // Mostrar la primera temporada por defecto

   seleccionarTemporada.addEventListener("change", () => {
     temporadas.forEach(temporada => {
       temporada.style.display = "none";
     });

     const temporadaSeleccionada = document.getElementById(seleccionarTemporada.value);
     temporadaSeleccionada.style.display = "block";
   });
 </script>

<script>
    document.addEventListener("DOMContentLoaded", () => {
  const temporadas = document.querySelectorAll(".capitulos");
  const seleccionarTemporada = document.getElementById("seleccionar-temporada");

  temporadas.forEach(temporada => {
    temporada.style.display = "none";
  });

  const temporadaGuardada = localStorage.getItem("temporadaSeleccionada");
  if (temporadaGuardada && document.getElementById(temporadaGuardada)) {
    temporadas.forEach(temporada => {
      temporada.style.display = "none";
    });

    const temporadaSeleccionada = document.getElementById(temporadaGuardada);
    temporadaSeleccionada.style.display = "block";
    seleccionarTemporada.value = temporadaGuardada;
  } else {
    temporadas[0].style.display = "block"; // Mostrar la primera temporada por defecto
    localStorage.setItem("temporadaSeleccionada", temporadas[0].id);
  }

  seleccionarTemporada.addEventListener("change", () => {
    temporadas.forEach(temporada => {
      temporada.style.display = "none";
    });

    const temporadaSeleccionada = document.getElementById(seleccionarTemporada.value);
    if (temporadaSeleccionada) {
      temporadaSeleccionada.style.display = "block";

      localStorage.setItem("temporadaSeleccionada", seleccionarTemporada.value);
    }
  });
});

</script>
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
  
</html>      
    
                    `;
                    
                    let seasonOnly = `
                    <div class="capitulos" id="capitulos-temporada${seasonNumber}">
            <!-- Capítulos  temporada ${seasonNumber} -->
            
            ${episodeList}
        </div>
    
    
    
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



                let tags = '';

                datos.genres.forEach(genre => {
                    if (genre.name != datos.genres[datos.genres.length - 1].name) {
                        tags += `${genre.name}, `
                    } else {
                        tags += datos.genres[datos.genres.length - 1].name
                    }
                });


                    let template = document.getElementById('html-final');

                    let justHtml = `
<!DOCTYPE html>
<html>
                    
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="https://ia902708.us.archive.org/16/items/sarp-generador-series-pelis/Sarp%20Generador%20SeriesPelis.css">                
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${datos.title}</title>
<style>
.post-header::before {
  content: "";
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1.1)),
  url('https://image.tmdb.org/t/p/w300/${datos.poster_path}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

#favoritoBtn {
    Font-weight;700;
    color:white;
    font-size:20px;
    background:rgba(0, 0, 0,.5);
    padding:10px;
    border: 2px solid white;
    border-radius:12px;
}

#favoritoBtn:hover{background:rgba(121, 121, 255,.5);}

.Trsa {
    Font-weight;700;
    color:white;
    font-size:16px;
    background:rgba(0, 0, 0,.5);
    padding:05px 10px;
    border: 2px solid white;
    border-radius:12px;
}

.Trsa:hover {background:rgba(0, 255, 0,.5);}

</style>

</head>      
 <body>                   
                    <div class="post-header">
    <div class="image-and-btn">
        <img src="https://image.tmdb.org/t/p/w300/${datos.poster_path}" class="poster-img" alt="" />
        
<button id="favoritoBtn" data-identificador="${enlace14}" onclick="toggleFavorito()">Agregar a Favoritos</button>

<div id="favoritoData" style="display: none;">
  <img id="favoritoImagen" class="poster" src="https://image.tmdb.org/t/p/w300/${datos.poster_path}" alt="Poster de la Película">
  <a id="favoritoEnlace" href="${enlace4}"></a>
  <span id="nombre">${datos.title}</span>
</div>                        
        
    </div>

    <div class="post-header__info">
        <h1>${datos.title}</h1>
        
        <a id="transmitButton" class="Trsa" href="#" data-intent="wvc-x-callback://open?url=${enlace43}&secure_uri=true" onclick="abrirApp()"">  <i class="fas fa-tv"></i> Transmitir</a>
        
        <ul>
            <li class="tmdb-rate"><i class="far fa-star"></i> ${datos.vote_average.toFixed(1)}</li>
            <li>${convertMinutes(datos.runtime)}</li>
            <li>${datos.release_date.slice(0,4)}</li>
        </ul>
        <p class="resume">${datos.overview}</p>
        <div class="more-data">
            <p>Generos: ${tags}</p>
        </div>
    </div>
</div>

    <!--SERVIDORES BOTONES-->

 <div class="server-buttons">
      <button onclick="changeVideo('${enlaceY1}')">Server 1</button>
      <button onclick="changeVideo('${enlaceY2}')">Server 2</button>
      <button onclick="changeVideo('${enlaceY3}')">Server 3</button>
    </div><br>
    
      <!--- IFRAME VIDEO--->
    
  <center><div class="video-container">
    <iframe id="video-iframe" src="${enlaceY1}" frameborder="0" allowfullscreen></iframe>
  </div></center>
  
  
<br><br>
</body>
  <script>
    var currentVideoUrl = '';
    var iframe = document.getElementById('video-iframe');
    
    function changeVideo(videoUrl) {
      if (videoUrl !== currentVideoUrl) {
        iframe.src = videoUrl;
        currentVideoUrl = videoUrl;
      }
    }

    // Manejar el evento al salir de la página
    window.addEventListener('beforeunload', function() {
      iframe.src = '';
    });
    
    // Manejar el evento al cerrar la página
    window.addEventListener('unload', function() {
      iframe.src = '';
    });
  </script>
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
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
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



