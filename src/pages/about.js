import '../css/about.css';
import React, { useEffect } from "react";

function AboutPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <table>
      <tbody>
        <tr>
          <td colSpan="100%">
            <h1>
              About Nicholas Wolk
            </h1>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              Highly motivated, solutions-focused IT professional with a breadth
              of experience in customer-facing positions across multifaceted
              areas, including software engineering, DevOps, and cloud
              computing. Well-versed in full infrastructure lifecycle duties,
              such as updates, upgrades, migration, and automation, with the
              ability to contribute to end-to-end application and software
              development. Exhibit high regard for optimal security,
              reliability, efficiency, and continuous improvement of
              infrastructures and software and application systems. Poised to
              address complex technical issues using cutting-edge solutions,
              aptly utilizing a vast array of tools, platforms, and
              technologies. Able to educate customers on architectural and
              strategic IT decisions, helping establish scalable and resilient
              infrastructures and systems. Commended for enhancing system
              performance and workflows, instituting a high-functioning IT
              environment, and producing measurable business value.
              Knowledgeable in the fundamentals of computer science and IT
              management. Armed with solid technical depth and flexible
              interpersonal skills.
            </p>
            <br />
            <p>
              My career is dedicated to optimizing system performance,
              establishing seamless production environments, and leveraging
              cutting-edge technology to solve complex problems...
            </p>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "center" }}>
            <div
              className="badge-base LI-profile-badge"
              data-locale="en_US"
              data-size="medium"
              data-theme="dark"
              data-type="VERTICAL"
              data-vanity="nicholaswolk"
              data-version="v1"
            ></div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AboutPage;
