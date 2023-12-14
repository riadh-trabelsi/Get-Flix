import React from 'react'
import './MainCarousel.css'
const MainCarousel: React.FC = () => {
  return (<>
  
  
  
  <link
    href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    rel="stylesheet"
    id="bootstrap-css"
  />
  {/*---- Include the above in your HEAD tag --------*/}
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"
    integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX"
    crossOrigin="anonymous"
  />
  <link
    href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
    rel="stylesheet"
  />
  <link
    rel="stylesheet"
    type="text/css"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
  />
  
    <div className="section" id="carousel">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mr-auto ml-auto">
            {/* Carousel Card */}
            <div className="card card-raised card-carousel">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
                data-interval={3000}
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={0}
                    className="active"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={1}
                    className=""
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={2}
                    className=""
                  />
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      src="https://rawgit.com/creativetimofficial/material-kit/master/assets/img/bg.jpg"
                      alt="First slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h4>
                        <i className="material-icons">location_on</i>
                        Yellowstone National Park, United States
                      </h4>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src="https://rawgit.com/creativetimofficial/material-kit/master/assets/img/bg2.jpg"
                      alt="Second slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h4>
                        <i className="material-icons">location_on</i>
                        Somewhere Beyond, United States
                      </h4>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src="https://rawgit.com/creativetimofficial/material-kit/master/assets/img/bg3.jpg"
                      alt="Third slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h4>
                        <i className="material-icons">location_on</i>
                        Yellowstone National Park, United States
                      </h4>
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <i className="material-icons">keyboard_arrow_left</i>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <i className="material-icons">keyboard_arrow_right</i>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            {/* End Carousel Card */}
          </div>
        </div>
      </div>
    </div>

   
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>

</>

 
  
  )
}

export default MainCarousel
