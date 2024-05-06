import React, { useEffect } from "react";

function AboutPage() {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>About Nicholas Wolk</h1>
      <p>Highly motivated and solutions-focused IT professional with extensive experience in software engineering, DevOps, and cloud computing...</p>
      <p>My career is dedicated to optimizing system performance, establishing seamless production environments, and leveraging cutting-edge technology to solve complex problems...</p>
      <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="nicholaswolk" data-version="v1"></div>
      </div>
  );
}

export default AboutPage;
