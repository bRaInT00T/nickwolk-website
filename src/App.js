import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "particles.js";

import "./css/App.css";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ExperiencePage from "./pages/experience";
import PortfolioPage from "./pages/portfolio";
import SkillsPage from "./pages/skills";
import BlogPage from "./pages/blog";
import TestimonialsPage from "./pages/testimonials";
import ResumePage from "./pages/resume";

import FlyoutNav from "./components/FlyoutNav";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      content: props.content,
    };
  }
  initParticlesjs() {
    if (document.getElementById("particles-js") !== undefined) {
      const Particlesjs = window.particlesJS;
      Particlesjs.load("particles-js", "./assets/particles.json", () => {});
    }
  }

  componentDidMount() {
    this.initParticlesjs();
  }
  componentDidUpdate() {}

  render() {
    return (
      <div>
        <div id="particles-js"></div>
        <FlyoutNav />

        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            {/* <Route path="contact" element={<ContactPage />} /> */}
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="resume" element={<ResumePage />} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;
