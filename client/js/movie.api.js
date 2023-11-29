const api_key = '1cc614b6cd01c73622141ccf0bdceac5'
const access_token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2M2MTRiNmNkMDFjNzM2MjIxNDFjY2YwYmRjZWFjNSIsInN1YiI6IjY1NjQ5MWJhYTZjMTA0MDEzODJiMGZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pLiucY7Ytlm6fNHo2cRqaDEdJMoCG7dD42qJCgqcOwI'

const base_url = 'https://api.themoviedb.org/3'
const get_movies = '/discover/movie'
const base_img = 'https://image.tmdb.org/t/p/w500'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${access_token}`,
  },
}

//const fetch = require('node-fetch');

const search_form = document.getElementById('search_form')
search_form.addEventListener('submit', function (e) {
  e.preventDefault()
  const url = `${base_url}/search/movie?query=${this.search.value}` // Utilisez des backticks ici
  const search_results = document.querySelector('.search-results')
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      json.results.map((result) => {
        search_results.innerHTML += `
 <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block custom-block-overlay">
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src=${base_img}${result.poster_path} class="custom-block-image img-fluid" alt="">
                                </a>

                                <div class="custom-block-info custom-block-overlay-info">
                                    <h5 class="mb-1">
                                        <a href="listing-page.html">
                                        ${result.original_title}
                                        </a>
                                    </h5>

                                    <p class="badge mb-0">50 Episodes</p>
                                </div>
                            </div>
                        </div>`
      })
    })
})

async function fetchMovies(api) {
  const response = await fetch(api)
  const data = await response.json()
  setCarousel(data.results)
  getMovieDetails(data.results)
}

function getMovieDetails(movies) {
  let movies_urls = []

  const latest_episodes = document.querySelector('.latest-episodes')

  movies.map((movie) => {
    const url = `${base_url}/movie/${movie.id}`
    movies_urls.push(url)
  })
  const movies_urls_to_fetch = movies_urls.slice(0, 4)
  movies_urls_to_fetch.forEach((url) => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        latest_episodes.innerHTML += `<div class="col-lg-6 col-12 mb-4 mb-lg-0">
                    <div class="custom-block d-flex">
                        <div class="">
                            <div class="custom-block-icon-wrap">
                                <div class="section-overlay"></div>
                                <a href="detail-page.html" class="custom-block-image-wrap">
                                    <img src="${base_img}${json.poster_path}" class="custom-block-image img-fluid" alt="">
                                    <a href="#" class="custom-block-icon">
                                        <i class="bi-play-fill"></i>
                                    </a>
                                </a>
                            </div>
        
                            <div class="mt-2">
                                <a href="#" class="btn custom-btn">
                                    Subscribe
                                </a>
                            </div>
                        </div>
        
                        <div class="custom-block-info">
                            <div class="custom-block-top d-flex mb-1">
                                <small class="me-4">
                                    <i class="bi-clock-fill custom-icon"></i>
                                    50 Minutes
                                </small>
                                <small>Episode <span class="badge">15</span></small>
                            </div>
        
                            <h5 class="mb-2">
                                <a href="detail-page.html">
                                    ${json.original_title}
                                </a>
                            </h5>
        
                            <div class="profile-block d-flex">
                                <img src="${base_img}${json.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">
                                <p>
                                ${json.production_companies[0].name}
                                    <img src="images/verified.png" class="verified-image img-fluid" alt="">
                                    <strong>  ${json.production_companies[0].origin_country}</strong></p>
                            </div>
        
                            <p class="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
        
                            <div class="custom-block-bottom d-flex justify-content-between mt-3">
                                <a href="#" class="bi-headphones me-1">
                                    <span>120k</span>
                                </a>
                                <a href="#" class="bi-heart me-1">
                                    <span>42.5k</span>
                                </a>
                                <a href="#" class="bi-chat me-1">
                                    <span>11k</span>
                                </a>
                                <a href="#" class="bi-download">
                                    <span>50k</span>
                                </a>
                            </div>
                        </div>
        
                        <div class="d-flex flex-column ms-auto">
                            <a href="#" class="badge ms-auto">
                                <i class="bi-heart"></i>
                            </a>
                            <a href="#" class="badge ms-auto">
                                <i class="bi-bookmark"></i>
                            </a>
                        </div>
                    </div>
                </div>`
      })
  })
}

async function setCarousel(movies) {
  const carousel = document.querySelector('.owl-carousel')
  console.log(carousel)

  await movies.map((movie) => {
    const movie_title = movie.original_title.split(' ').slice(0, 3).join(' ')

    carousel.innerHTML += `
            <div class='owl-carousel-info-wrap item'>
                <img src= ${base_img}${
                  movie.poster_path
                } class='owl-carousel-image img-fluid' alt=''>
                <img src="images/${
                  movie.adult ? 'icon_18' : 'verified'
                }.png" class='owl-carousel-verified-image img-fluid' alt=''>
                <div class='owl-carousel-info'>
                    <h6 class='mb-2'>
                        ${movie_title} 
                    </h6>
                    <span class='badge'>${movie.release_date}</span>
                    <span class='badge'>${movie.original_language}</span>
                </div>
            </div>`
  })

  $('.owl-carousel').owlCarousel({
    center: true,
    loop: true,
    margin: 30,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
      },
      767: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  })
}

const api_url = `${base_url}${get_movies}?api_key=${api_key}`
fetchMovies(api_url)
