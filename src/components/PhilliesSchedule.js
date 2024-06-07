import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/PhilliesSchedule.css';

const PhilliesSchedule = () => {
  const [record, setRecord] = useState([]);
  const [nextGames, setNextGames] = useState([]);


  useEffect(() => {
    const fetchSchedule = async () => {
      const leagueId = 104;
      const teamId = 143;
      const currYear = new Date().getFullYear();
      const apiBaseUrl = 'https://rosbh5qh7k.execute-api.us-east-1.amazonaws.com';
      const stage = 'dev';
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      const day5 = dd + 10;
        if (dd < 10) {
            dd = `0${dd}`;
        }
        if (mm < 10) {
            mm = `0${mm}`;
        }
      const formattedToday = mm + '/' + dd + '/' + yyyy;
      const formattedDay5 = mm + '/' + day5 + '/' + yyyy;
      try {
        // Fetch team's current record
        const standingsResponse = await axios.get(`${apiBaseUrl}/${stage}/standings`, {
          params: {
            leagueId: leagueId,
            date: formattedToday,
            teamID: teamId,
            season: currYear,
          },
        });

        const teamRecord = standingsResponse.data.records[0].teamRecords[0];
        setRecord({ wins: teamRecord.wins, losses: teamRecord.losses, pct: teamRecord.pct });
        
        // Fetch next 5 games
        const scheduleResponse = await axios.get(`${apiBaseUrl}/${stage}/schedule`, {
          params: {
            sportId: '1',
            teamId: teamId,
            startDate: formattedToday,
            endDate: formattedDay5,
          },
        });

        const games = scheduleResponse.data.dates.flatMap(date => date.games).slice(0, 5);
        setNextGames(games);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div style={{color: '#fff', padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center", fontFamily: "Tahoma, sans-serif"}}>
      <h1><img src={`https://www.mlbstatic.com/team-logos/143.svg`} alt="P" style={{ height: "50px" }}/>hiladelphia <img src={`https://www.mlbstatic.com/team-logos/143.svg`} alt="P" style={{ height: "50px" }}/>hillies</h1>
      <h2>{record.leagueRank}</h2>
      {nextGames.map(game => {
          const venue = game.venue.name;
          const venueId = game.venue.id
          const date = new Date(game.gameDate).toDateString();
          const time = new Date(game.gameDate).toLocaleTimeString();
          const awayRecord = game.teams.away.leagueRecord;
          const awayLogo = game.teams.away.team.id
          const homeRecord = game.teams.home.leagueRecord;
          const homeLogo = game.teams.home.team.id
          const txtColor = game.dayNight === 'night' ? '#fff' : '#000000';
          const textShadow = game.dayNight === 'night' ? '2px 2px 4px rgba(255, 255, 255, 0.5)' : '2px 2px 4px rgba(0, 0, 0, 0.5)';
          return (
            <div>
              <div style={{ margin: "0", padding: "15px 0px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <div style={{ position: "relative", width: "100%", maxWidth: "800px" }}>
               
                  <img src={`https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.3.0/images/stadiums/${game.dayNight}/${venueId}.jpg`} alt="Stadium" style={{ position: "relative", width: "100%", maxWidth: "800px", border: "1px solid", borderColor: "rgb(255, 255, 255, .6)" }} />
                
                  <span style={{ position: "absolute", top: "5%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "1.5rem", textShadow: `${textShadow}`, color: `${txtColor}`, zIndex: "2" }}>
                    {venue} <br />
                    <span style={{ position: "absolute", top: "135%", left: "50%", transform: "translate(-50%, -50%)", fontSize: ".7rem", fontWeight: "100", whiteSpace: "nowrap", textShadow: "none" }} >{date} {time}</span>
                  </span>
                  <img src={`https://www.mlbstatic.com/team-logos/${awayLogo}.svg`} alt="Phillies Logo" style={{ position: "absolute", top: "30%", left: "32%", width: "75px", height: "auto", zIndex: "2" }} />
                  <span style={{ position: "absolute", bottom: "12%", right: "33%", fontSize: "1rem", zIndex: "3", color: "#fff" }}>{homeRecord.wins} - {homeRecord.losses}</span>
                  <span style={{ position: "absolute", top: "35%", left: "47%", fontSize: "3rem", zIndex: "4", color: "#fff" }}>@</span>
                  <img src={`https://www.mlbstatic.com/team-logos/${homeLogo}.svg`} alt="Phillies Logo" style={{ position: "absolute", top: "30%", right: "30%", width: "75px", height: "auto", zIndex: "5" }} />
                  <span style={{ position: "absolute", bottom: "12%", left: "33%", fontSize: "1rem", zIndex: "6", color: "#fff" }}>{awayRecord.wins} - {awayRecord.losses}</span>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default PhilliesSchedule;
