'use client'
const Home = () => {
  return (
    <section className="flex-start flex-col paddings mb-16">
      <div id="home" className="hero">
        <div className="content">
          <div className="body">
            <div className="hero-media">
              <img
                src="./assets/img/guy-lesson.png"
                alt="Learn without limits and spread knowledge."
                className="img"
              />
              <div className="hero-summary">
                <div className="item">
                  <div className="icon"><img src="./assets/icons/ui-ux.svg" alt="UI/UX" /></div>
                  <div className="info">
                    <p className="label">20 Courses</p>
                    <p className="title">UI/UX Design</p>
                  </div>
                </div>
                <div className="item">
                  <div className="icon"><img src="./assets/icons/dev.svg" alt="Dev" /></div>
                  <div className="info">
                    <p className="label">20 Courses</p>
                    <p className="title">Development</p>
                  </div>
                </div>
                <div className="item">
                  <div className="icon"><img src="./assets/icons/mkt.svg" alt="MKT" /></div>
                  <div className="info">
                    <p className="label">30 Courses</p>
                    <p className="title">Marketing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-content">
              <h1 className="heading">Learn without limits and spread knowledge.</h1>
              <p className="desc">
                Build new skills for that “this is my year” feeling with courses, certificates, and
                degrees from world-class universities and companies.
              </p>
              <div className="hero-cta-group">
                <a href="#!" className="btn hero-cta-btn">See Courses</a>
                <div className="hero-watch">
                  <div className="icon">
                    <a href="#!" className="">
                      <div className="icon"><img src="./assets/icons/watch.svg" alt="Watch" /></div>
                    </a>
                  </div>
                  <span>Watch Video</span>
                </div>
              </div>
              <p className="desc">Recent engagement</p>
              <p className="desc stats"><strong>50K</strong>"Students" <strong>70+</strong>"Courses"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
