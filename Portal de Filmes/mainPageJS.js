

const API_KEY = 'a95ba7870d3c5ecffc74b7b30926a739';
var numOfPosters = 4;
var numOfAvaliations = 3;
var loadedAvaliations = 0;
var numOfReviews = 4;



window.onload = () => {


    document.getElementById("searchFormId").addEventListener('submit', submitSearchKey2)
    
    /*onsubmit = submitSearchKey2;*/
    document.getElementById("inputIconId").onclick = submitSearchKey2;


    loadPostersButtonId.onclick = () =>    
    {
        if(numOfPosters < 20)
        {
            numOfPosters += 4;
            filmPosterRequest.onload();
        }

    }

    loadAvaliationsButtonId.onclick = () =>
    {
        if(numOfAvaliations < 15)
        {
            numOfAvaliations += 3;
            filmPosterRequest.onload();
        }
    }
 
    //======================================================================================

    function loadCarouselFilms()
    {   
        //clear all carousel elements
        document.getElementById("carouselContainerId").innerHTML = "";
        let carouselElementsStr = "";

        let data = JSON.parse(this.responseText);

        for(let i = 0; i < data.total_results && i < 20; ++i)
        {
            let film = data.results[i];
            
            /*
                            '<iframe ' +
                                'class="d-block w-100"' +
                                `src="https://www.youtube.com/embed/HJuRheR11Lc"` +
                                'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"' +
                                'frameborder="0" allowfullscreen>' +
                            '</iframe>'
            */
            let date = new Date(film.release_date);

            if(film.backdrop_path && film.overview)
            {
                carouselElementsStr += 
                '<div class="carousel-item' + (i == 0 ? ' active' : ' ')  + '" style="min-height: 100%;">' +                
                    '<div class="row">' +
                        '<div class="col-12 col-sm-12 col-md-12 col-md-12 col-lg-6 col-xl-6 filmData">' +
                            `<img src="https://image.tmdb.org/t/p/w500${film.backdrop_path}">` +
                        '</div>' +
                        '<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 filmData">' +
                            '<h1>' +
                                `${film.title}` +
                            '</h1>' +
                            '<p>' +
                                `Sinopse: ${film.overview}` +
                            '</p>' +
                            '<p>' +
                                `Estreia: ${film.release_date}` +
                            '</p> ' +

                            '<p>' +
                                'Avaliação: &#9733 &#9733 &#9733 &#9733 &#9733' +
                            '</p>' +
                                            
                        '</div>' +

                    '</div>' +
                '</div>';


            }
            
        }
        document.getElementById("carouselContainerId").innerHTML = carouselElementsStr;
    }


    //============================================

    function loadFilmPosters()
    {   
        //clear all carousel elements
        document.getElementById("postersId").innerHTML = "";
        let postersStr = "";

        let data = JSON.parse(this.responseText);

        for(let i = 0; i < data.total_results && i < numOfPosters; ++i)
        {
            let film = data.results[i];
            
            if(film.poster_path)
            {
                postersStr += 
                '<div class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 poster">' +
                    `<img src="https://image.tmdb.org/t/p/w500${film.poster_path}">` + 
                '</div>';
            }
            
        }
        document.getElementById("postersId").innerHTML = postersStr;
        document.getElementById("avaliationsId").innerHTML = "";
        loadedAvaliations = 0;

        for(let i = 0; i < data.total_results; ++i)
        {
            let film = data.results[i];

            let filmAvaliationRequest = new XMLHttpRequest();
            filmAvaliationRequest.onload = function() { loadAvaliation(this, film.title); };
            filmAvaliationRequest.open('GET', `https://api.themoviedb.org/3/movie/${film.id}/reviews?api_key=${API_KEY}&lang=en&include_adult=false`)
            filmAvaliationRequest.send();  
        }


    }

    function loadAvaliation(evento, filmTitle)
    {
        
        //clear all carousel elements
        let data = JSON.parse(evento.responseText);

        //alert(data.results.length);
        for(let i = 0; i < data.total_results && loadedAvaliations < numOfAvaliations; ++i)
        {
            let avaliation = data.results[i];
            ++loadedAvaliations;

            let date = new Date(avaliation.created_at);

            document.getElementById("avaliationsId").innerHTML += 
                '<div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 avaliation">' + 
                    `<h3>${filmTitle} </h3>` +
                    `<p> Author: ${avaliation.author_details.name ? avaliation.author_details.name : avaliation.author_details.username} </p> <p> ${avaliation.content.length < 400 ? avaliation.content : avaliation.content.substring(0, 400)} </p>` + 
                        `<p>&#9733 &#9733 &#9733 &#9734 &#9734  &nbsp ${date.toLocaleDateString()}</p><br>` +  
                        `<a href="${avaliation.url}"> Mais detalhes </a><br><br><br>`
                '</div>';           
        }

    } ;


    let filmRequest = new XMLHttpRequest();
    filmRequest.onload = loadCarouselFilms;
    filmRequest.open('GET', `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&lang=en&include_adult=false`);
    filmRequest.send();

    let filmPosterRequest = new XMLHttpRequest();
    filmPosterRequest.onload = loadFilmPosters;
    filmPosterRequest.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&lang=en&sort_by=popularity.desc&include_adult=false`);
    filmPosterRequest.send();



    //======================================================================================

    function changeCategory()
    {
        
        let genreCode = '0';

        switch(document.getElementById("postersCategoryId").value)
        {
            case '0':
                genreCode = '0';
                break;
            case '1':
                genreCode = '12';
                break;
            case '2':
                genreCode = '10749';
                break;
            case '3':
                genreCode = '35';

                break;
            case '4': 
                genreCode = '16';
                break;
            default:
                genreCode = '0';
                break;
        }

        let genreStr = (genreCode == 0 ? '&' : `&with_genres=${genreCode}&`);
        
        filmPosterRequest.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&lang=en&sort_by=popularity.desc${genreStr}include_adult=false`);

        numOfPosters = 4;

        filmPosterRequest.send();

    }


    document.getElementById("postersCategoryId").onchange = changeCategory;




} 

function submitSearchKey2() 
{
    let searchText = document.getElementById("searchInputId").value;

    
    if(searchText.length > 0)
    {   
        localStorage.setItem("searchKey", JSON.stringify(searchText));
        window.location.href = "searchPage.html";

    }

    return true;
}



