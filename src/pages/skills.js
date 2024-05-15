// src/pages/SkillsPage.js
import React from 'react';

function SkillsPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: "rgb(39, 62, 71, .6)", borderRadius: "15px"}}>
      <h1>My Skills</h1>
      <p>Programming Languages: Python, PowerShell, Java, JavaScript, Shell, Batch, SQL, Go, Visual Basic</p>
      <p>Cloud Technologies: AWS (EC2, Lambda, S3, RDS, IAM, KMS, SQS, SNS, CloudFormation), F5 WAF</p>
      <p>Content Management Systems: Sitecore</p>
      <p>Data Ingestion & Delivery: SSIS, AWS Lambda</p>
      <p>Report Generation & Visualization: Tableau, Microsoft Power BI, Actuate BI</p>
      <p>Build & Deployment Automation: Bamboo, Bitbucket, Artifactory</p>
      <p>Secrets Management: CyberArk, AWS IAM</p>
      <p>Application Monitoring: Splunk, AWS CloudWatch, Grafana</p>
      <p>Version Control: Git, Stash</p>
      <p>Risk Management: Black Duck, Fortify</p>
      <p>Issue Tracking & Project Management: JIRA, BMC Remedy</p>
      <p>Workload Automation: Apache Airflow, AutoSys</p>
      <p>Operating Systems: Windows, Linux (UNIX)</p>
      <p>Networking Administration: Active Directory, NGINX</p>
      <p>ETL Data: Aladdin, Conduent (Formally ACS), MorningStar, FactSet, Vermilion Reporting</p>
      <p>Others: Salesforce, Postman</p>
      {/* Other skills */}
    </div>
  );
}

export default SkillsPage;
