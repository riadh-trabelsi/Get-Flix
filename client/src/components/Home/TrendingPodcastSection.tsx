import React from 'react'

const TrendingPodcastSection: React.FC = () => {
  return (
    <section className="trending-podcast-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="section-title-wrap mb-5">
              <h4 className="section-title">Trending episodes</h4>
            </div>
          </div>

          <div className="col-lg-4 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-full">
              <div className="custom-block-image-wrap">
                <a href="detail-page.html">
                  <img
                    src="images/podcast/27376480_7326766.jpg"
                    className="custom-block-image img-fluid"
                    alt=""
                  />
                </a>
              </div>

              <div className="custom-block-info">
                <h5 className="mb-2">
                  <a href="detail-page.html"> Vintage Show </a>
                </h5>

                <div className="profile-block d-flex">
                  <img
                    src="images/profile/woman-posing-black-dress-medium-shot.jpg"
                    className="profile-block-image img-fluid"
                    alt=""
                  />

                  <p>
                    Elsa <strong>Influencer</strong>
                  </p>
                </div>

                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>

                <div className="custom-block-bottom d-flex justify-content-between mt-3">
                  <a href="#" className="bi-headphones me-1">
                    <span>100k</span>
                  </a>

                  <a href="#" className="bi-heart me-1">
                    <span>2.5k</span>
                  </a>

                  <a href="#" className="bi-chat me-1">
                    <span>924k</span>
                  </a>
                </div>
              </div>

              <div className="social-share d-flex flex-column ms-auto">
                <a href="#" className="badge ms-auto">
                  <i className="bi-heart"></i>
                </a>

                <a href="#" className="badge ms-auto">
                  <i className="bi-bookmark"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-full">
              <div className="custom-block-image-wrap">
                <a href="detail-page.html">
                  <img
                    src="images/podcast/27670664_7369753.jpg"
                    className="custom-block-image img-fluid"
                    alt=""
                  />
                </a>
              </div>

              <div className="custom-block-info">
                <h5 className="mb-2">
                  <a href="detail-page.html"> Vintage Show </a>
                </h5>

                <div className="profile-block d-flex">
                  <img
                    src="images/profile/cute-smiling-woman-outdoor-portrait.jpg"
                    className="profile-block-image img-fluid"
                    alt=""
                  />

                  <p>
                    Taylor
                    <img
                      src="images/verified.png"
                      className="verified-image img-fluid"
                      alt=""
                    />
                    <strong>Creator</strong>
                  </p>
                </div>

                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>

                <div className="custom-block-bottom d-flex justify-content-between mt-3">
                  <a href="#" className="bi-headphones me-1">
                    <span>100k</span>
                  </a>

                  <a href="#" className="bi-heart me-1">
                    <span>2.5k</span>
                  </a>

                  <a href="#" className="bi-chat me-1">
                    <span>924k</span>
                  </a>
                </div>
              </div>

              <div className="social-share d-flex flex-column ms-auto">
                <a href="#" className="badge ms-auto">
                  <i className="bi-heart"></i>
                </a>

                <a href="#" className="badge ms-auto">
                  <i className="bi-bookmark"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="custom-block custom-block-full">
              <div className="custom-block-image-wrap">
                <a href="detail-page.html">
                  <img
                    src="images/podcast/12577967_02.jpg"
                    className="custom-block-image img-fluid"
                    alt=""
                  />
                </a>
              </div>

              <div className="custom-block-info">
                <h5 className="mb-2">
                  <a href="detail-page.html"> Daily Talk </a>
                </h5>

                <div className="profile-block d-flex">
                  <img
                    src="images/profile/handsome-asian-man-listening-music-through-headphones.jpg"
                    className="profile-block-image img-fluid"
                    alt=""
                  />

                  <p>
                    William
                    <img
                      src="images/verified.png"
                      className="verified-image img-fluid"
                      alt=""
                    />
                    <strong>Vlogger</strong>
                  </p>
                </div>

                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>

                <div className="custom-block-bottom d-flex justify-content-between mt-3">
                  <a href="#" className="bi-headphones me-1">
                    <span>100k</span>
                  </a>

                  <a href="#" className="bi-heart me-1">
                    <span>2.5k</span>
                  </a>

                  <a href="#" className="bi-chat me-1">
                    <span>924k</span>
                  </a>
                </div>
              </div>

              <div className="social-share d-flex flex-column ms-auto">
                <a href="#" className="badge ms-auto">
                  <i className="bi-heart"></i>
                </a>

                <a href="#" className="badge ms-auto">
                  <i className="bi-bookmark"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrendingPodcastSection
