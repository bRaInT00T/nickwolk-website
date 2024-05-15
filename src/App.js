import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "particles.js";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ExperiencePage from "./pages/experience";
import SkillsPage from "./pages/skills";
import ResumePage from "./pages/resume";
import KanbanBoard from "./pages/kanbanBoard";
import "./css/App.css";

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
        <div id="particles-js" />
        <FlyoutNav />
        <div>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="kanban" element={<KanbanBoard />} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;
