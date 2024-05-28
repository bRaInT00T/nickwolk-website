import React, { useState } from "react";
import "../css/BubbleText.css"; // Assuming you renamed the CSS file to BubbleText.css

const BubbleText = ({ initialText, headingLevel }) => {
  const [text] = useState(initialText);

  const Heading = headingLevel || 'h1'; // Default to h1 if no heading level is provided

  return (
    <div className="container">
      <Heading className="text">
        {text.split("").map((char, idx) => (
          <span className="hoverText" key={idx}>
            {char}
          </span>
        ))}
      </Heading>
    </div>
  );
};

export default BubbleText;
