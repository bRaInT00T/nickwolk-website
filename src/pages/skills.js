import React from 'react';
import '../css/SkillsPage.css';
import { FaPython, FaGitAlt, FaLinux, FaNetworkWired, FaCloud } from 'react-icons/fa';
import { DiVisualstudio, DiJira } from 'react-icons/di';
import { SiTableau } from "react-icons/si";
import { MdOutlineAutoMode, MdMonitorHeart } from "react-icons/md";
import { LiaDatabaseSolid, LiaUserSecretSolid } from "react-icons/lia";
import { RiSkullLine } from "react-icons/ri";
import { TbLambda } from "react-icons/tb";
import { BiBookContent } from "react-icons/bi";
import { BsMotherboard } from "react-icons/bs";
import BubbleText from "../components/BubbleText.js";

const skills = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'PowerShell', 'React', 'Java', 'JavaScript', 'Shell', 'Batch', 'SQL', 'Go', 'Visual Basic'],
    icon: <FaPython />
  },
  {
    category: 'Cloud Technologies',
    skills: ['AWS (EC2, Lambda, S3, RDS, IAM, KMS, SQS, SNS, CloudFormation)', 'F5 WAF'],
    icon: <FaCloud />
  },
  {
    category: 'Content Management Systems',
    skills: ['Sitecore'],
    icon: <BiBookContent />
  },
  {
    category: 'Data Ingestion & Delivery',
    skills: ['SSIS', 'AWS Lambda'],
    icon: <TbLambda />
  },
  {
    category: 'Report Generation & Visualization',
    skills: ['Tableau', 'Microsoft Power BI', 'Actuate BI'],
    icon: <SiTableau />
  },
  {
    category: 'Build & Deployment Automation',
    skills: ['Bamboo', 'Bitbucket', 'Artifactory'],
    icon: <DiVisualstudio />
  },
  {
    category: 'Secrets Management',
    skills: ['CyberArk', 'AWS IAM'],
    icon: <LiaUserSecretSolid />
  },
  {
    category: 'Application Monitoring',
    skills: ['Splunk', 'AWS CloudWatch', 'Grafana'],
    icon: <MdMonitorHeart />
  },
  {
    category: 'Version Control',
    skills: ['Git', 'Stash'],
    icon: <FaGitAlt />
  },
  {
    category: 'Risk Management',
    skills: ['Black Duck', 'Fortify'],
    icon: <RiSkullLine />
  },
  {
    category: 'Issue Tracking & Project Management',
    skills: ['JIRA', 'BMC Remedy'],
    icon: <DiJira />
  },
  {
    category: 'Workload Automation',
    skills: ['Apache Airflow', 'AutoSys'],
    icon: <MdOutlineAutoMode />
  },
  {
    category: 'Operating Systems',
    skills: ['Windows', 'Linux (UNIX)'],
    icon: <FaLinux />
  },
  {
    category: 'Networking Administration',
    skills: ['Active Directory', 'NGINX'],
    icon: <FaNetworkWired />
  },
  {
    category: 'ETL Data',
    skills: ['Aladdin', 'Conduent (Formally ACS)', 'MorningStar', 'FactSet', 'Vermilion Reporting'],
    icon: <LiaDatabaseSolid />
  },
  {
    category: 'Others',
    skills: ['Salesforce', 'Postman'],
    icon: <BsMotherboard />
  }
];

function SkillsPage() {
  return (
    <div className="skills-container">
      <BubbleText initialText="My Skills" headingLevel="h1" />
      <div className="skills-grid">
        {skills.map((skillCategory, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-icon">{skillCategory.icon}</div>
            <h2>{skillCategory.category}</h2>
            <ul>
              {skillCategory.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;
