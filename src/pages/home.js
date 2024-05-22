import React, { useRef } from 'react';
// import Terminal from '../components/Terminal';
import Typewriter from '../components/TypeWriter';
import '../css/Terminal.css';

function HomePage() {
  const messages = [
    "cat <<EOF > ./NickWolk.yml",
    "About:",
    "  - Name: Nick Wolk",
    "    Type: Possibly Human",
    "    Location: Philadelphia, PA",
    "    Title:",
    "      - Cloud Engineer",
    "      - Cloud Architect",
    "      - Python Developer",
    "Attributes:",
    "  - Problem Solver",
    "  - Visionary",
    "  - Adaptable",
    "  - Effective Communicator",
    "  - Analytical",
    "  - Collaborative",
    "  - Creative",
    "  - Customer-centric",
    "  - Dedicated",
    "  - Innovative",
    "  - Inquisitive",
    "  - Insightful",
    "  - Resilient",
    "  - Resourceful",
    "  - Result-oriented",
    "  - Supportive",
    "  - Always Learning",
    "  - Automation Enthusiast",
    "Personal Traits:",
    "  - Gadget Nerd",
    "  - Husband",
    "  - Father",
    "  - Tee Ball Coach",
    "EOF",
    "$ cat ./NickWolk.yml >> YourCompany.yml",
  ];

  const terminalBodyRef = useRef(null);

  return (
    <div style={{paddingTop: "40px"}}>
      <div className="terminal">
        <div className="terminal-header">
          <div></div>
          <div></div>
          <div></div>
          <span>nickwolk@MacBook-Pro:~/src/reactjs/nickwolk</span>
        </div>
        <div className="terminal-body" ref={terminalBodyRef}>
          <Typewriter heading="" messages={messages} terminalBodyRef={terminalBodyRef} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
