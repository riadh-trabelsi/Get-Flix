import React from 'react'
import { Link } from 'react-router-dom'
import './TopicsSection.css'
const TopicsSection: React.FC = () => {
  return (<>
    <section className="topics-section section-padding pb-0" id="section_3"   style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://atelierdalbion.com/wp-content/uploads/2019/12/Top-10-films-2019-1.jpg)',
          backgroundBlendMode: 'multiply',
          
        }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="section-title-wrap mb-5">
            
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
            <h1>Movies</h1>
              <a href="/" className="custom-block-image-wrap" >
              
                <img
                  src="https://schedule.arena.ch/__images/artwork/1013317.ch_it.jpg"
                  className="custom-block-image img-fluid"
                  alt="Physician consulting his patient in a clinic" 
                />
                
              </a>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
                  <a href="listing-page.html"></a>
                </h5>
              
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
            <h1>Series</h1>
              <a href="detail-page.html" className="custom-block-image-wrap">
                <img
                  src="https://fr.web.img3.acsta.net/c_310_420/pictures/22/04/01/11/50/1018209.jpg"
                  className="custom-block-image img-fluid"
                  alt="Repairman doing air conditioner service"
                />
              </a>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
             
                </h5>
               
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
            <h1>Basic</h1>
              <a href="detail-page.html" className="custom-block-image-wrap">
                <img
                  src="https://www.giardiniblog.it/wp-content/uploads/2009/07/film-streaming2.jpg"
                  className="custom-block-image img-fluid"
                  alt="Woman practicing yoga at home"
                />
              </a>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
                
                </h5>
              
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
            <h1>Premium</h1>
              <Link to="/pay" className="custom-block-image-wrap">
                <img
                  src="https://cdn.digitbin.com/wp-content/uploads/Movies-HD.jpg"
                  className="custom-block-image img-fluid"
                  alt="Delicious meal with sambal arrangement"
                />
              </Link>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
               
                </h5>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    
   
   
  </>
  
  )
}

export default TopicsSection
