import React, { useState, useEffect } from "react";
import '../css/Terminal.css';

function Typewriter({ messages, heading, terminalBodyRef, pauseDuration = 750 }) {
  const [currentText, setCurrentText] = useState(""); // Current text being displayed
  const [index, setIndex] = useState(0); // Index of the current message
  const [subIndex, setSubIndex] = useState(0); // Index of the sub-character
  const [pauseBefore, setPauseBefore] = useState(true); // Pause before starting to type
  const [pauseAfter, setPauseAfter] = useState(false); // Pause after a message is typed
  const [allMessagesWritten, setAllMessagesWritten] = useState(false); // State to track if all messages have been written

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
  };
  useEffect(() => {
    if (allMessagesWritten) return;
    let timeout;

    if (pauseBefore) {
        timeout = setTimeout(() => {
          setPauseBefore(false);
        }, pauseDuration);
      } else if (pauseAfter) {
        timeout = setTimeout(() => {
          setPauseAfter(false);
          if (index + 1 === messages.length) {
            setAllMessagesWritten(true);
          } else {
            setIndex((prev) => (prev + 1) % messages.length);
            setSubIndex(0);
            setCurrentText((prev) => prev + "\n"); // Start a new line
            setPauseBefore(true); // Set pause before starting the next message
          }
        }, pauseDuration);
    } else {
      if (subIndex < messages[index].length) {
        timeout = setTimeout(() => {
          setCurrentText((prev) => prev + messages[index][subIndex]);
          setSubIndex(subIndex + 1);
          if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
          }
        }, randomNumberInRange(50, 20));
      } else {
        setPauseAfter(true); // Set pause after completing the message
      }
    }

    return () => clearTimeout(timeout);
  }, [subIndex, index, messages, pauseBefore, pauseAfter, pauseDuration, terminalBodyRef, allMessagesWritten]);

  const date = new Date();
  const showTime = date.getHours() + ':' + date.getMinutes();
  const pwd = "~/src/reactjs/nickwolk";
  const branch = "develop";
  const ahead = "↑3";

  return (
    <div>
      <span style={{color: "orange"}}>{pwd}</span> [<span style={{color: "#7C607C", fontWeight: "bold"}}>
        {branch}
      </span>|<span style={{color: "blue", fontWeight: "bold"}}>
        {ahead} </span>
      <span style={{color: "green", fontWeight: "bold"}}>
        +1
      </span>]
      <br />
      {showTime}  $ {heading} <pre style={{display: 'inline'}}>{currentText}</pre>
      <span className="terminal-cursor">_</span>
    </div>
  );
}

export default Typewriter;
