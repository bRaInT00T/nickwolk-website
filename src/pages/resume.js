import React from 'react';
import BubbleText from "../components/BubbleText.js";
import { FaFileWord, FaFilePdf } from 'react-icons/fa';
import resumePdf from '../assets/Nicholas_Wolk_Resume.pdf';
import resumeDocx from '../assets/Nicholas_Wolk_Resume.docx';
import '../css/resume.css';

const ResumeDownload = () => {
  return (
    <div className="text-container resume-download-container">
      <BubbleText initialText="Download My Resume" headingLevel="h1" />
      <p>For a detailed look at my professional background and achievements, please download my resume.</p>
        <a href={resumePdf} download="Nicholas_Wolk_Resume.pdf" className="resume-download-button">
        Download Resume
      </a>
      <div className="resume-split-button">
        <div className="resume-dropdown">
          <button className="resume-dropdown-toggle">
            <span>▼</span>
          </button>
          <div className="resume-dropdown-menu">
            <a href={resumePdf} download="Nicholas_Wolk_Resume.pdf"><FaFilePdf /> PDF</a>
            <a href={resumeDocx} download="Nicholas_Wolk_Resume.docx"><FaFileWord/>DOCX</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDownload;
