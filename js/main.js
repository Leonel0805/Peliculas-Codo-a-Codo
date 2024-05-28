
// Declaramos variables
let url_img;
const URL_BASE = "https://image.tmdb.org/t/p/w500";

// Obtenemos el container
const section_tendencias = document.querySelector('.section__tendencias__allcards');
const section_top = document.querySelector('.section__top__allcards');



// Consumimos api TMDB
function cargarDatos(api_key){

    for(let i = 1; i<=19; i++){
        fetch (`https://api.themoviedb.org/3/movie/${i}?api_key=2b9e8a23219886ffe72d2eb854de4b28`)
            .then( response =>{
               return response.json() //verificamos la promesa
            })
            // manipulamos el posterPath
            .then(json => {
                console.log(json.poster_path)
                if( json.poster_path){
                    url_img = URL_BASE + json.poster_path
                    mostrarPelicula(url_img, 'section__tendencias__card', 'section__tendencias__image');
    
                }else{
                    console.log('no poster')
                }

            })
            .catch( error => {
                console.log(error)
            })
    
    ;
    }   

}

// Obtener top peliculas
function cargarTop(api_key){


    fetch (`https://api.themoviedb.org/3/movie/top_rated?api_key=2b9e8a23219886ffe72d2eb854de4b28`)
        .then( response =>{
            return response.json() //verificamos la promesa
        })
        // manipulamos el posterPath
        .then(json => {
            console.log('asdfasd')
            console.log(json.results)

            for (let i = 0; i < json.results.length; i++) {
                let result = json.results[i];
                let url_img = URL_BASE + result.poster_path;
                mostrarPelicula(url_img, 'section__top__card', 'section__top__image')
            }


        })
        .catch( error => {
            console.log(error)
        });


}


// Creamos un nuevo elemento agregando la imagen obtenida de la API
function mostrarPelicula(url_img, nameClass, imgClass){

    let newElement = document.createElement('div');
    newElement.classList.add(nameClass);

    let img = document.createElement('img');
    img.classList.add(imgClass);
    img.src = url_img;

    // Agregamos el img al div creado
    newElement.appendChild(img);

    // Agregramos el nuevo elemento al container de las cards

    if (nameClass == 'section__tendencias__card'){
        section_tendencias.appendChild(newElement);

    }else{
        section_top.appendChild(newElement);
    }
}


cargarDatos();
cargarTop();

