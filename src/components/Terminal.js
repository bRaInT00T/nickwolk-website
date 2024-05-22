import React, { useState, useEffect } from 'react';
import '../css/Terminal.css';

const Terminal = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100); // Adjust the speed of typing here
      return () => clearTimeout(timeoutId);
    }
  }, [index, text]);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="terminal-body">
        <span className="typewriter-text">{displayedText}</span>
      </div>
    </div>
  );
};

export default Terminal;