// LatestPodcastSection.tsx
import React from 'react'

const LatestPodcastSection: React.FC = () => {
  return (
    <section
      className="latest-podcast-section section-padding pb-0"
      id="section_2"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-12">
            <div className="section-title-wrap mb-5">
              <h4 className="section-title">Latest episodes</h4>
            </div>
          </div>

          <div className="row justify-content-center latest-episodes"></div>
        </div>
      </div>
    </section>
  )
}

export default LatestPodcastSection
