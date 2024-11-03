const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

//Helpers

function createMovies(movies, container){
    container.innerHTML = '';

    movies.forEach(movie => {
        


        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

//Llamados a API


async function getTrendingMoviesPreview() {
    const {data} = await api('trending/movie/day');
    

    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);

    // trendingMoviesPreviewList.innerHTML = "";

    // movies.forEach(movie => {
        


    //     const movieContainer = document.createElement('div')
    //     movieContainer.classList.add('movie-container');

    //     const movieImg = document.createElement('img');
    //     movieImg.classList.add('movie-img');
    //     movieImg.setAttribute('alt', movie.title);
    //     movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

    //     movieContainer.appendChild(movieImg);
    //     trendingMoviesPreviewList.appendChild(movieContainer);
    // });
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    

    const categories = data.genres;

    categoriesPreviewList.innerHTML = "";

    categories.forEach(categorie => {
        const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list');


        const categorieContainer = document.createElement('div')
        categorieContainer.classList.add('category-container');

        const categorieTitle = document.createElement('h3');
        categorieTitle.classList.add('category-title');
        categorieTitle.setAttribute('id', 'id' + categorie.id);
        categorieTitle.addEventListener('click', () => {
            location.hash = `#categories=${categorie.id}-${categorie.name}`;
        })
        const categorieTitleText = document.createTextNode(categorie.name);

        categorieTitle.appendChild(categorieTitleText);
        

        categorieContainer.appendChild(categorieTitle);
        categoriesPreviewList.appendChild(categorieContainer);
    });
}

async function getMoviesbyCategory(id) {
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    

    const movies = data.results;

    genericSection.innerHTML = "";

    movies.forEach(movie => {
        


        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);
    });
}

// getTrendingMoviesPreview();
// getCategoriesPreview();

