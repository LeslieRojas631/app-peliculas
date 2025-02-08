document.getElementById('searchButton').addEventListener('click', searchMovies)

let api_key = 'a7ad9206729a237c62612fe0bdc4377a'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'

function searchMovies() {
    let searchInput = document.getElementById('searchInput').value

    // Validación para evitar búsqueda vacía
    if (!searchInput.trim()) {
        alert("Por favor, escribe algo para buscar.");
        return;
    }

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
}

function displayMovies(movies) {
    let resultContainer = document.getElementById('resultContainer')
    resultContainer.innerHTML = ''

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p> No se encontraron resultados para tu búsqueda <p/>'
        return
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = movie.overview || 'Descripción no disponible.';

        let posterPath = movie.poster_path ? `${urlImg}${movie.poster_path}` : 'default-image.jpg';
        let poster = document.createElement('img')
        poster.src = posterPath

        let voteAverage = document.createElement('p');
        voteAverage.textContent = `⭐ Calificación: ${movie.vote_average}`;

        let popularity = document.createElement('p');
popularity.textContent = `🔥 Popularidad: ${movie.popularity}`;

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)
        movieDiv.appendChild(voteAverage)
        movieDiv.appendChild(popularity);

        resultContainer.appendChild(movieDiv)
    });
}