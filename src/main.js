const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});



async function getTrendingMoviesPreview() {
    const {data} = await api('trending/movie/day');
    

    const movies = data.results;

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');


        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    

    const categories = data.genres;

    categories.forEach(categorie => {
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');


        const categorieContainer = document.createElement('div')
        categorieContainer.classList.add('category-container');

        const categorieTitle = document.createElement('h3');
        categorieTitle.classList.add('category-title');
        categorieTitle.setAttribute('id', 'id' + categorie.id);
        const categorieTitleText = document.createTextNode(categorie.name);

        categorieTitle.appendChild(categorieTitleText);
        

        categorieContainer.appendChild(categorieTitle);
        previewCategoriesContainer.appendChild(categorieContainer);
    });
}

// getTrendingMoviesPreview();
// getCategoriesPreview();

