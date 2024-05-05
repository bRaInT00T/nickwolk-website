import React, { useState, useEffect, useRef } from "react";

function Typewriter({ messages, heading }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const timeoutRef = useRef(null);
  const currentText = messages[index];

  useEffect(() => {
    if (subIndex === currentText.length + 1 && !reverse) {
      timeoutRef.current = setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      timeoutRef.current = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % messages.length);
      }, 500);
      return;
    }

    timeoutRef.current = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 100 : 100
    );

    return () => clearTimeout(timeoutRef.current);
  }, [subIndex, reverse, index, currentText.length, messages.length]);

  return (
    <h2>
      {heading} {currentText.substring(0, subIndex)}
      <span className="cursor"></span>
    </h2>
  );
}

function HomePage() {
  const messages = [
    "Python Developer",
    "Cloud Engineer",
    "Cloud Architect",
    "Automation Enthusiast",
    "Inquisitive Person",
    "Gadget Nerd",
    "Husband/Father",
    "Tee Ball Coach/Little League Supporter",
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {/* <h1>NickWolk.com</h1> */}
      {/* <p>This is the home page. Explore more about my professional and personal journey!</p> */}
      <div className="typewriter-text">
        <Typewriter heading="I am a" messages={messages} />
      </div>
    </div>
  );
}

export default HomePage;
