import React, { useState, useEffect } from "react";

function Typewriter({ messages, heading, pauseDuration = 1000 }) {
  const [index, setIndex] = useState(0); // Index of the current message
  const [subIndex, setSubIndex] = useState(0); // Index of the sub-character
  const [reverse, setReverse] = useState(false); // Whether we are in reverse mode
  const [pauseBefore, setPauseBefore] = useState(true); // Pause before starting to type
  const [pauseAfter, setPauseAfter] = useState(false); // Pause after a message is typed
  const currentText = messages[index];

  useEffect(() => {
    let timeout;

    if (pauseBefore) {
      timeout = setTimeout(() => {
        setPauseBefore(false);
      }, pauseDuration);
    } else if (pauseAfter) {
      timeout = setTimeout(() => {
        setPauseAfter(false);
        setReverse(true);
      }, pauseDuration + 1000);
    } else if (reverse) {
      if (subIndex > 0) {
        // Check if the remaining substring matches the start of the next message
        const nextIndex = (index + 1) % messages.length;
        const nextMessageStart = messages[nextIndex].slice(0, subIndex);
        if (messages[index].slice(0, subIndex) === nextMessageStart) {
          setReverse(false);
          setIndex(nextIndex);
          setPauseBefore(true); // Set pause before starting the next message
        } else {
          setTimeout(() => setSubIndex(subIndex - 1), 100);
        }
      } else {
        setReverse(false);
        setIndex((prev) => (prev + 1) % messages.length);
        setPauseBefore(true); // Set pause before starting the next message
      }
    } else {
      if (subIndex < messages[index].length) {
        timeout = setTimeout(() => setSubIndex(subIndex + 1), 100);
      } else {
        setPauseAfter(true); // Set pause after completing the message
      }
    }

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, messages, pauseBefore, pauseAfter, pauseDuration]);

  return (
    <div>
      {heading} {currentText.substring(0, subIndex)}
      <span className="cursor">_</span>
    </div>
  );
}

function HomePage() {
  const messages = [
    "a Husband, Father, and Tee Ball Coach",
    "a Python Developer",
    "a Cloud Engineer",
    "a Cloud Architect",
    "a gadget nerd",
    "a problem solver",
    "a visionary",
    "adaptable",
    "always learning",
    "an automation enthusiast",
    "an effective communicator",
    "analytical",
    "collaborative",
    "creative",
    "customer-centric",
    "dedicated",
    "innovative",
    "innovative",
    "inquisitive",
    "insightful",
    "resilient",
    "resourceful",
    "result-oriented",
    "supportive",
  ];

  return (
    <div className="typewriter-text">
      <Typewriter heading="I am" messages={messages} />
    </div>
  );
}

export default HomePage;
