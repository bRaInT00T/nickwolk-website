// src/components/Footer.js

import React, { useEffect, useState } from "react";
import '../css/Footer.css';
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ({ username, repo }) => {
  const [lastCommitDate, setLastCommitDate] = useState(null);

  useEffect(() => {
    const fetchLastCommitDate = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        const data = await response.json();
        const lastCommitDate = new Date(data[0].commit.author.date);

        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };

        setLastCommitDate(lastCommitDate.toLocaleDateString(undefined, options) + " ET");
      } catch (error) {
        console.error("Error fetching last commit date:", error);
      }
    };

    fetchLastCommitDate();
  }, [username, repo]);

  return (
    <footer>
      <div className="footer-left">
        <p>Last Commit: {lastCommitDate}</p>
      </div>
      <div className="footer-right">
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/nicholaswolk" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
