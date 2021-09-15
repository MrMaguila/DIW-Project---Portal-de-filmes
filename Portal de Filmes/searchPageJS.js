

const API_KEY = 'a95ba7870d3c5ecffc74b7b30926a739';

window.onload = () =>
{


    let filmRequest = new XMLHttpRequest();
    filmRequest.onload = loadFilms;
    
    let searchValue = localStorage.getItem("searchKey");
    if(searchValue)
    {
        document.getElementById("searchInputId2").value = JSON.parse(searchValue);
    }

    if(document.getElementById("searchInputId2"))
    {
        let searchStr = document.getElementById("searchInputId2").value;
        filmRequest.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&lang=en&query=${searchStr}&include_adult=false`);
        filmRequest.send();
    } 
    else{
        alert("Error");
    }
    

    //========================================================



    document.getElementById("inputIconId2").onclick = submitSearchKey;
    document.getElementById("searchFormId2").onsubmit = submitSearchKey;


    function loadFilms()
    {
        
        let filmStore = document.getElementById("searchResults");
        filmStore.innerHTML = "";
        let filmsStoreStr = "";

        let data = JSON.parse(this.responseText);

        
        for(let i = 0; i < data.total_results && i < 20; ++i)
        {
            let film = data.results[i];


            let date = new Date(film.release_date);

            if(film.backdrop_path)
            {
                filmsStoreStr += 
                        '<div class="row">' + 
                            '<div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">' +
                                `<img src="https://image.tmdb.org/t/p/w500${film.backdrop_path}">` +
                            '</div>' +

                            '<div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">' +
                                `<p style="font-size: larger;">${film.title}</p><br>` +
                                `${film.overview}<br><br>` +
                                `Data de Lançamento: ${film.release_date} <br>` +
                            '</div>' +
                        '</div> <br>';
            }
            console.log(film.title);
        }
        filmStore.innerHTML = filmsStoreStr;

    }
}

function submitSearchKey() 
{

    let searchText = document.getElementById("searchInputId2").value;

    if(searchText.length > 0)
    {
        //alert("123");
        localStorage.setItem("searchKey", JSON.stringify(searchText));
        window.location.reload();
    }   
}




//===================================================================================================

