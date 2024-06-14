import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PhilliesSchedule.css';

const PhilliesSchedule = () => {
  const [record, setRecord] = useState([]);
  const [nextGames, setNextGames] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const formattedToday = `${yyyy}-${mm}-${dd}`;
      const formattedDay5 = `${yyyy}-${mm}-${day5}`;
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
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">
          <img src={`https://www.mlbstatic.com/team-logos/143.svg`} alt="Phillies Logo" className="spinner-logo" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ color: '#fff', padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'center', fontFamily: 'Tahoma, sans-serif' }}>
      <h1><img src={`https://www.mlbstatic.com/team-logos/143.svg`} alt="P" style={{ height: '1em' }} />hiladelphia</h1>
      <h1><img src={`https://www.mlbstatic.com/team-logos/143.svg`} alt="P" style={{ height: '1em' }} />hillies</h1>
      <h2>{record.leagueRank}</h2>
      <Carousel 
        showArrows={true} 
        renderIndicator={false} 
        infiniteLoop={true} 
        autoPlay={true} 
        interval={8000} 
        showStatus={true} 
        stopOnHover={true}
        selectedItem={0}
      >
        {nextGames.map((game, index) => {
          const venue = game.venue.name;
          const venueId = game.venue.id;
          const date = new Date(game.gameDate);
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const day = days[date.getDay()];
          const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;
          const time = date.toLocaleTimeString('en-US', { minute: '2-digit', hour: '2-digit', hour12: true });
          const awayRecord = game.teams.away.leagueRecord;
          const awayLogo = game.teams.away.team.id;
          const homeRecord = game.teams.home.leagueRecord;
          const homeLogo = game.teams.home.team.id;
          const txtColor = game.dayNight === 'night' ? '#fff' : '#000000';
          const textShadow = game.dayNight === 'night' ? '2px 2px 4px rgba(255, 255, 255, 0.5)' : '2px 2px 4px rgba(0, 0, 0, 0.5)';
          return (
            <div key={index}>
              <div className='Phillies-container'>
                  <img className='venue_img' src={`https://prod-gameday.mlbstatic.com/responsive-gameday-assets/1.3.0/images/stadiums/${game.dayNight}/${venueId}.jpg`} alt="Stadium" />
                  <span className='venue' style={{ textShadow: `${textShadow}`, color: `${txtColor}` }}>
                    {venue}
                  </span>
                  {/* Logos */}
                  <img className='logo' src={`https://www.mlbstatic.com/team-logos/${homeLogo}.svg`} alt="Home Team Logo" style={{ right: '30%', maxwidth: '10%' }} />
                  <img className='logo'src={`https://www.mlbstatic.com/team-logos/${awayLogo}.svg`} alt="Away Team Logo" style={{ left: '30%', width: '75px' }} />
                  {/* Win-Loss Record */}
                  <span className='winLose' style={{ right: '31%' }}>{homeRecord.wins}-{homeRecord.losses}</span>
                  <span className='winLose' style={{ left: '30%' }}>{awayRecord.wins}-{awayRecord.losses}</span>
                  <span className='at'>@</span>
                  <span style={{ position: 'absolute', bottom: '0', fontSize: '1rem', color: "#fff", zIndex: '2' }}>{day} {formattedDate} {time}</span>
                
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default PhilliesSchedule;
