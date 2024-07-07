    document.addEventListener("DOMContentLoaded", function() {
      // Obtener referencias a los elementos del DOM
      var searchInput = document.getElementById("searchInput");
      var searchButton = document.getElementById("searchButton");
      var searchResultsDiv = document.getElementById("searchResults");
      var peliculaIdInput = document.getElementById("peliculaId");
      var apiKeyInput = document.getElementById("apiKey");
      var saveButton = document.getElementById("saveButton");
      var resetButton = document.getElementById("resetButton");
      var messageElement = document.getElementById("message");
      var enlace1Input = document.getElementById("enlace1");
      var enlace2Input = document.getElementById("enlace2");
      
      var enlaceTransmitirDescargarInput = document.getElementById("enlaceTransmitirDescargar");
      var generarButton = document.getElementById("generar");
      var resultadoDiv = document.getElementById("resultado");
      var copiarButton = document.getElementById("copiar-btn");
      var enlace3Input = document.getElementById("enlace3"); // Agregado
    var enlace4Input = document.getElementById("enlace4"); // Agregado
    var webInput = document.getElementById("web"); // Agregado
    var dmInput = document.getElementById("dm"); // Agregado
    var oInput = document.getElementById("o");
    var sandInput = document.getElementById("sand");

      
      // Cargar la API Key guardada en el almacenamiento local y establecerla en el campo de entrada
      var apiKeyGuardada = localStorage.getItem("apiKey");
      if (apiKeyGuardada) {
        apiKeyInput.value = apiKeyGuardada;
      }
  
      // Manejar el evento de clic en el botón de guardar
      saveButton.addEventListener("click", function() {
        var apiKey = apiKeyInput.value;
        localStorage.setItem("apiKey", apiKey);
        messageElement.textContent = "Se Ha guardado Tu API KEY";
        resetButton.style.display = "inline-block";
      });
  
      // Manejar el evento de clic en el botón de restablecer
      resetButton.addEventListener("click", function() {
        localStorage.removeItem("apiKey");
        apiKeyInput.value = "";
        messageElement.textContent = "";
        resetButton.style.display = "none";
      });
  
      // Manejar el evento de clic en el botón de buscar
      searchButton.addEventListener("click", function() {
        var query = searchInput.value.trim();
  
        if (query === "") {
          alert("Por favor, ingresa un término de búsqueda.");
          return;
        }
  
        // Hacer una solicitud a la API de TMDb para buscar películas
        $.ajax({
          url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKeyInput.value}&query=${encodeURIComponent(query)}&language=es`,
          method: "GET",
          success: function(data) {
            var results = data.results;
            var html = "";
  
            if (results.length === 0) {
              html = "<p>No se encontraron resultados para tu búsqueda.</p>";
            } else {
              html = "<p>Resultados de la búsqueda:</p>";
  
              for (var i = 0; i < results.length; i++) {
                var movie = results[i];
                var title = movie.title;
                var posterPath = movie.poster_path;
                var movieId = movie.id;
  
                if (posterPath === null) {
                  posterPath = "https://via.placeholder.com/150";
                } else {
                  posterPath = "https://image.tmdb.org/t/p/w200" + posterPath;
                }
  
                html += `<div class="movie" data-movie-id="${movieId}">`;
                html += `<img src="${posterPath}" alt="${title}">`;
                html += `<p>${title}</p>`;
                html += `</div>`;
              }
            }
  
            // Mostrar los resultados de la búsqueda
            searchResultsDiv.innerHTML = html;
          },
          error: function(error) {
            console.log("Error al buscar películas:", error);
            alert("Error al buscar películas. Verifica tu API Key.");
          }
        });
      });
  
      // Manejar el evento de clic en una película de los resultados de búsqueda
      searchResultsDiv.addEventListener("click", function(event) {
        var target = event.target;
  
        while (!target.classList.contains("movie")) {
          target = target.parentNode;
  
          if (target === null || target === searchResultsDiv) {
            return;
          }
        }
  
        var movieId = target.getAttribute("data-movie-id");
  
        // Cargar la información de la película seleccionada en los campos correspondientes
        peliculaIdInput.value = movieId;
      });
  
      // Manejar el evento de clic en el botón de generar
      generarButton.addEventListener("click", function() {
        var peliculaId = peliculaIdInput.value;
        var apiKey = apiKeyInput.value;
        var enlace1 = enlace1Input.value.trim();
        var enlace2 = enlace2Input.value.trim();
         var enlace3 = enlace3Input.value.trim();
          var enlace4 = enlace4Input.value.trim();
          var web = webInput.value.trim();
          var dm = dmInput.value.trim();
          var o = oInput.value.trim();
        var enlaceTransmitirDescargar = enlaceTransmitirDescargarInput.value.trim();
        var sand = sandInput.value.trim();
       
        
  
        // Hacer una solicitud a la API de TMDb para obtener los detalles de la película
        $.ajax({
          url: `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}&language=es`,
          method: "GET",
          success: function(data) {
            var titulo = data.title;
            var generos = data.genres.slice(0, 3).map(function(genero) {
    return genero.name;
});

var genero = generos.join(', ');

            var sipnosis = data.overview;
            var anio = data.release_date.substr(0, 4);
            var duracionEnMinutos = data.runtime;
var horas = Math.floor(duracionEnMinutos / 60);
var minutos = duracionEnMinutos % 60;
var duracion = horas + "h " + minutos + "m";

            var imagen = "https://image.tmdb.org/t/p/w500" + data.poster_path;
            
           
            
            
  
            // Generar la plantilla HTML
            var html = `
            
              
<!DOCTYPE html>
<html>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="https://ia902708.us.archive.org/16/items/sarp-generador-series-pelis/Sarp%20Generador%20SeriesPelis.css">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titulo}</title>
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
url('${imagen}');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
z-index: -1;
}






.reproducir-btn,.salir{padding:10px 20px;background-color:red;color:#fff;border:0;border-radius:8px;cursor:pointer}

.ventana-emergente {
  display: none;
  width: 75%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(to right, #000, #333, #222);
  border: 2px solid #fff;
  padding: 20px;
  z-index: 1999999;
  border-radius: 10px;
  overflow-y: auto; /* Agrega esto para permitir el desplazamiento vertical */
  max-height: 80vh; /* Establece una altura máxima, puedes ajustar el valor según tus necesidades */
}


@media screen and (min-width: 768px) {
.ventana-emergente {
  
}

}

.iframe-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}



.iframe-container iframe{position:absolute;top:0;left:0;width:98%;border:1.8px solid #fff;border-radius:10px;height:auto}

@media screen and (min-width: 768px) {
.iframe-container iframe {height:70%;
  
}

}


.Tituloxd,.ventana-emergente a{color:#fff;font-weight:700;font-style:italic}



.ventana-emergente a{display:block;margin-bottom:10px;text-decoration:none;border:1.8px solid #fff;border-radius:8px;display:flex;justify-content:center;width:auto}.Titulocg{text-align:center}#ventana-checkbox{display:none}#ventana-checkbox:checked+.ventana-emergente{display:block}.TituYT{text-shadow:9px 9px 9px rgba(9,9,9,.9)}

.app-outer-container{overflow-x:auto}

@media screen and (min-width: 768px) {
.app-outer-container{

} 
}

.app-container{display:flex;justify-content:flex-start}


.app{margin:10px;width:120px}.app-image{border-radius:50%;width:60px;height:60px;overflow:hidden;position:relative}

@media screen and (min-width: 768px) {
.app-image{

}
}






.app-image img{width:100%;height:100%;object-fit:cover}

.app-name{font-size:10px;color:#fff;text-align:center;margin-top:5px}

@media screen and (min-width: 768px) {
.app-name{ display:none;

}
}

.containerRe{width:auto;height:30%;overflow-y:auto;padding:10px;display:flex;flex-direction:column}

@media screen and (min-width: 768px) {
.containerRe {
  
}


}

.link-container{display:inline-flex;align-items:center;text-decoration:none;background-color:transparent;padding:8px;border-radius:50px;color:#000;font-size:16px;margin-bottom:10px;}

@media screen and (min-width: 768px) {

}

.round-image{border-radius:50%;width:50px;height:50px;margin-right:8px}

@media screen and (min-width: 768px) {
.round-image{

}
}

.white-divider{width:100%;height:2px;background-color:#fff;border-radius:9px;margin-bottom:10px}



.salir{border-radius:4px;font-weight:700;font-style:italic;float:right;}

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
<img src="${imagen}" class="poster-img" alt="${titulo}" />

<button id="favoritoBtn" data-identificador="${enlace3}" onclick="toggleFavorito()">Agregar a Favoritos</button>






<div id="favoritoData" style="display: none;">
  <img id="favoritoImagen" class="poster" src="${imagen}" alt="Poster de la Película">
  <a id="favoritoEnlace" href="${enlace4}"></a>
  <span id="nombre">${titulo}</span>
</div>                        


</div>

<div class="post-header__info">
<h1>${titulo}</h1>
<ul>

<a id="transmitButton" class="Trsa" href="#" data-intent="wvc-x-callback://open?url=${web}&secure_uri=true" onclick="abrirApp()"">  <i class="fas fa-tv"></i> Transmitir</a>


<li>${duracion}</li>
<li>${anio}</li>
</ul>
<p class="resume">${sipnosis}</p>
<div class="more-data">
<p>Generos: ${genero}</p>
</div>
</div>
</div>

<center><label for="ventana-checkbox" class="reproducir-btn">Reproducir</label></center>

<input type="checkbox" id="ventana-checkbox"><div class="ventana-emergente"> <center><h3 class="Tituloxd">Escoge Tu Servidor</h3> </center><div class="iframe-container"> <iframe src="${enlace1}" frameborder="0" allowfullscreen="" width="auto" height="auto" ${sand}></iframe> </div>
              
              <a href="${enlace2}" >${o}</a>
              <label for="ventana-checkbox" class="salir">Salir</label>
              </div>
<br><br><br><br><br><br><br><br>
	
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
function abrirEX() {
  var intentUrl = document.getElementById("EX").getAttribute("data-intentEX");
  
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
function abrirX() {
  var intentUrl = document.getElementById("X").getAttribute("data-intentX");
  
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
function abrirVLC() {
  var intentUrl = document.getElementById("VLC").getAttribute("data-intentVLC");
  
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
function abrirADM() {
  var intentUrl = document.getElementById("ADM").getAttribute("data-intentADM");
  
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
function abrirD() {
  var intentUrl = document.getElementById("D").getAttribute("data-intenD");
  
  // Crear un elemento "iframe" oculto para intentar abrir la URL personalizada
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = intentUrl;
  document.body.appendChild(iframe);
  
  // Esperar un tiempo breve y redirigir al enlace si el intent no se ejecutó
  setTimeout(function() {
    document.body.removeChild(iframe);
    window.location.href = "https://play.google.com/store/apps/details?id=downloader.video.download.free"; // Redirige al enlace original
  }, 3000); // Espera 3 segundos antes de redirigir (ajusta según necesites)
}
</script>
  
             
              




</html>

              
            `;
  
  
  
 
  
  
            // Mostrar la plantilla generada
            resultadoDiv.innerHTML = html;
            copiarButton.style.display = "block";
          },
          error: function(error) {
            console.log("Error al obtener los detalles de la película:", error);
            alert("Error al obtener los detalles de la película. Verifica el ID de la película y la API Key.");
          }
        });
      });
  
      // Manejar el evento de clic en el botón de copiar
      copiarButton.addEventListener("click", function() {
        var resultado = resultadoDiv.innerHTML;
  
        var tempElement = document.createElement("textarea");
        tempElement.value = resultado;
        document.body.appendChild(tempElement);
  
        tempElement.select();
        tempElement.setSelectionRange(0, 99999); // Para dispositivos móviles
  
        document.execCommand("copy");
  
        document.body.removeChild(tempElement);
  
        alert("La plantilla se ha copiado al portapapeles.");
      });
    });
    
    
    
