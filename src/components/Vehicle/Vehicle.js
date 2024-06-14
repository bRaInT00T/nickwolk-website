import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import carImage from '../../assets/kia_telluride_2022_black.png';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarCrash, faFire } from '@fortawesome/free-solid-svg-icons';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const Root = styled('div')({
  maxWidth: '800px',
  margin: 'auto',
  borderRadius: '30px',
  backgroundColor: 'rgba(10, 69, 87, 0.3)',
  color: '#ffffff',
  minHeight: '100vh',
  padding: '15px',
  textAlign: 'center',
});

const CustomTabs = styled(Tabs)({
  justifyContent: 'center',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
  },
  '& .MuiTab-root': {
    color: '#ffffff',
  },
  '& .Mui-selected': {
    color: '#ffffff',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffffff',
  },
});

const Header = styled('h1')({
  color: '#ffffff',
});

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
});

const KiaLogo = styled('img')({
  width: '8rem',
  filter: 'invert(100%)',
});

const VehicleData = () => {
  const [recalls, setRecalls] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recallsResponse = await fetch('https://xnznp2vl1j.execute-api.us-east-1.amazonaws.com/dev/recalls');
        const complaintsResponse = await fetch('https://xnznp2vl1j.execute-api.us-east-1.amazonaws.com/dev/complaints');

        if (!recallsResponse.ok || !complaintsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const recallsData = await recallsResponse.json();
        const complaintsData = await complaintsResponse.json();

        setRecalls(recallsData.results);
        setComplaints(complaintsData.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <KiaLogo src='https://cdn.worldvectorlogo.com/logos/kia-4.svg' alt='Kia Logo' />
        <CircularProgress color="inherit" />
      </LoadingContainer>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Header>2022</Header>
        <Header><img alt='Kia Logo' src='https://cdn.worldvectorlogo.com/logos/kia-4.svg' style={{ width: '8rem', filter: 'invert(100%)' }} /> Telluride</Header>
        <img src={carImage} alt='2022 Kia Telluride' style={{ padding: '20px', width: '40%', borderRadius: '15px' }} />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <CustomTabs value={activeTab} onChange={handleTabChange} aria-label="vehicle data tabs">
            <Tab label={`Recalls (${recalls.length})`} />
            <Tab label={`Complaints (${complaints.length})`} />
          </CustomTabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          {recalls.length === 0 ? (
            <p>No recalls found.</p>
          ) : (
            <ul style={{paddingInlineStart: "0px"}}>
              {recalls.map((recall) => (
                <li key={recall.recall_number} className="recall-item" style={{ listStyleType: 'none', padding: '15px', border: '1px solid #3f4388', borderRadius: '15px' }}>
                  <h3>{recall.Manufacturer} - {recall.NHTSACampaignNumber}</h3>
                  <p><strong>Component:</strong> {recall.Component}</p>
                  <p><strong>Summary:</strong> {recall.Summary}</p>
                  <p><strong>Consequence:</strong> {recall.Consequence}</p>
                  <p><strong>Remedy:</strong> {recall.Remedy}</p>
                  <p><strong>Report Date:</strong> {recall.ReportReceivedDate.split("/")[1] + '/' + recall.ReportReceivedDate.split("/")[0] + '/' + recall.ReportReceivedDate.split("/")[2]}</p>
                  <p><strong>Notes:</strong> {recall.Notes}</p>
                </li>
              ))}
            </ul>
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <ul style={{paddingInlineStart: "0px"}}>
              {complaints.map((complaint) => (
                <li key={complaint.complaint_number} className="complaint-item" style={{ listStyleType: 'none', border: '1px solid #3f4388', borderRadius: '15px' }}>
                  <h3>{complaint.odino}</h3>
                  <p><strong>Date of Incident:</strong> {new Date(complaint.dateOfIncident).toLocaleDateString()}</p>
                  <p><strong>Component:</strong> {complaint.components}</p>
                  <p><strong>Summary:</strong> {complaint.summary}</p>
                  {complaint.crash && <p style={{color: "red", fontWeight: "bold", fontSize: "30px"}}><FontAwesomeIcon icon={faCarCrash} color="red" /> Crash</p>}
                  {complaint.fire && <p><FontAwesomeIcon icon={faFire} color="red" /> Fire</p>}
                </li>
              ))}
            </ul>
          )}
        </TabPanel>
      </Root>
    </ThemeProvider>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default VehicleData;
