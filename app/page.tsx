"use client";

import "./home.css";
import Image from "next/image";
import Image1 from "../assets/img/guy-lesson.png";
import Icon1 from "../assets/icons/ui-ux.svg";
import Icon2 from "../assets/icons/dev.svg";
import Icon3 from "../assets/icons/mkt.svg";
import Icon4 from "../assets/icons/watch.svg";
const Home = () => {
  return (
    <section className="flex-start flex-col paddings mb-16">
      <div id="home" className="hero">
        <div className="content">
          <div className="body">
            <div className="hero-media">
              <Image
                src={Image1}
                className="img"
                alt="Learn without limits and spread knowledge."
              />
              <div className="hero-summary">
                <div className="item">
                  <div className="icon">
                    <Image src={Icon1} alt="UI/UX" />
                  </div>
                  <div className="info">
                    <p className="label">20 Courses</p>
                    <p className="title">UI/UX Design</p>
                  </div>
                </div>
                <div className="item">
                  <div className="icon">
                    <Image src={Icon2} alt="Dev" />
                  </div>
                  <div className="info">
                    <p className="label">20 Courses</p>
                    <p className="title">Development</p>
                  </div>
                </div>
                <div className="item">
                  <div className="icon">
                    <Image src={Icon3} alt="MKT" />
                  </div>
                  <div className="info">
                    <p className="label">30 Courses</p>
                    <p className="title">Marketing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-content">
              <h1 className="heading">
                Learn without limits and spread knowledge.
              </h1>
              <p className="desc">
                Build new skills for that “this is my year” feeling with
                courses, certificates, and degrees from world-class universities
                and companies.
              </p>
              <div className="hero-cta-group">
                <a href="#!" className="btn hero-cta-btn">
                  See Courses
                </a>
                <div className="hero-watch">
                  <div className="icon">
                    <a href="#!" className="">
                      <div className="icon">
                        <Image src={Icon4} alt="Watch" />
                      </div>
                    </a>
                  </div>
                  <span>Watch Video</span>
                </div>
              </div>
              <p className="desc">Recent engagement</p>
              <p className="desc stats">
                <strong>50K</strong>"Students" <strong>70+</strong>"Courses"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
