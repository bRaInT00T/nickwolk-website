import React from 'react';
import resumeFile from '../assets/Nicholas_Wolk_Resume.pdf'; // Make sure to upload the resume PDF to your project

const ResumeDownload = () => {
  return (
    <div className="text-container resume-download-container">
      <h1>Download My Resume</h1>
      <p>For a detailed look at my professional background and achievements, please download my resume.</p>
      <a href={resumeFile} download="Nicholas_Wolk_Resume.pdf" className="download-button">
        Download Resume
      </a>
    </div>
  );
}

export default ResumeDownload;