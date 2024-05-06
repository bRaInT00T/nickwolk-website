import "../css/experience.css";
import { ReactComponent as WorkIcon } from "../assets/work.svg";
import { ReactComponent as SchoolIcon } from "../assets/school.svg";
import { ReactComponent as CertIcon } from "../assets/cert.svg";
import timelineElements from "../components/timelineElements";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function experience() {
  let workIconStyles = { background: "#06D6A0" };
  let schoolIconStyles = { background: "#f9c74f" };
  let certIconStyles = { background: "#eb8e5c" };

  return (
    <div style={{ padding: '20px', margin: 'auto' }}>
      <h1 class="title">Experience</h1>
      <VerticalTimeline>
        {timelineElements.map((element) => {
          let isWorkIcon = element.icon === "work";
          let isSchoolIcon = element.icon === "school";
          let isCertIcon = element.icon === "cert";
          let showButton =
            element.buttonText !== undefined &&
            element.buttonText !== null &&
            element.buttonText !== "";
          let showlogo =
            element.logo !== undefined &&
            element.logo !== null &&
            element.logo !== "";

          return (
            <VerticalTimelineElement
              key={element.id}
              date={element.date}
              dateClassName="date"
              iconStyle={isWorkIcon ? workIconStyles : isSchoolIcon ? schoolIconStyles : isCertIcon ? certIconStyles : {}}
              icon={isWorkIcon ? <WorkIcon /> : isSchoolIcon ? <SchoolIcon /> : isCertIcon ? <CertIcon /> : <WorkIcon />}
            >
              <table cellPadding="0">
                <tbody>
                <tr>
                  <td>
                    {showlogo && (
                      <a href={element.link} target="_blank" rel="noopener noreferrer">
                        <div className="icon">
                          <img
                            className="coIcon"
                            src={element.logo}
                            title={element.logoTitle}
                            alt=""
                          />
                        </div>
                      </a>
                    )}
                  </td>
                  <td width="80%">
                    <h3 className="vertical-timeline-element-title">
                      {element.title}
                    </h3>
                    <h5 className="vertical-timeline-element-subtitle">
                      {element.location}
                    </h5>
                    {showButton && (
                      <a
                        className={`button ${isWorkIcon ? "workButton" : "schoolButton"
                          }`}
                        href="/"
                      >
                        {element.buttonText}
                      </a>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p id="description">{element.description}</p>
                  </td>
                </tr>
                </tbody>
                </table>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}

export default experience;
