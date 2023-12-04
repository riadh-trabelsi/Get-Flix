import React from 'react'

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="text-center mb-5 pb-2">
              <h1 className="text-white">Riadh best films</h1>
              <p className="text-white">Show for free.</p>
              <a href="#section_2" className="btn custom-btn smoothscroll mt-3">
                Start
              </a>
            </div>

            <div className="owl-carousel owl-theme"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
