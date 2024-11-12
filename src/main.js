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
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container) {
    container.innerHTML = "";

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
        container.appendChild(categorieContainer);
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

    createCategories(categories, categoriesPreviewList)

    // categoriesPreviewList.innerHTML = "";

    // categories.forEach(categorie => {
    //     const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list');


    //     const categorieContainer = document.createElement('div')
    //     categorieContainer.classList.add('category-container');

    //     const categorieTitle = document.createElement('h3');
    //     categorieTitle.classList.add('category-title');
    //     categorieTitle.setAttribute('id', 'id' + categorie.id);
    //     categorieTitle.addEventListener('click', () => {
    //         location.hash = `#categories=${categorie.id}-${categorie.name}`;
    //     })
    //     const categorieTitleText = document.createTextNode(categorie.name);

    //     categorieTitle.appendChild(categorieTitleText);
        

    //     categorieContainer.appendChild(categorieTitle);
    //     categoriesPreviewList.appendChild(categorieContainer);
    // });
}

async function getMoviesbyCategory(id) {
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    

    const movies = data.results;

    createMovies(movies, genericSection);

    // genericSection.innerHTML = "";

    // movies.forEach(movie => {
        


    //     const movieContainer = document.createElement('div')
    //     movieContainer.classList.add('movie-container');

    //     const movieImg = document.createElement('img');
    //     movieImg.classList.add('movie-img');
    //     movieImg.setAttribute('alt', movie.title);
    //     movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

    //     movieContainer.appendChild(movieImg);
    //     genericSection.appendChild(movieContainer);
    // });
}

async function getMoviesBySearch(query) {
    query = decodeURI(query);
    const {data} = await api('search/movie', {
        params: {
            query
        }
    });
    

    const movies = data.results;

    createMovies(movies, genericSection);

    
}

async function getMovieById(id){
    
    const {data: movie} = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id){
    const {data} = await api('movie/' + id + '/similar');

    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);

    relatedMoviesContainer.scrollTo(0, 0);
}

// getTrendingMoviesPreview();
// getCategoriesPreview();

