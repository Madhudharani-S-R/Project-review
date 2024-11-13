import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MoviesList = ({ onSelectMovie }) => {
  const { bookingInfo, setBookingInfo } = useContext(AuthContext);
  const [movies] = useState([
    {
      id: 1,
      title: 'Stranger Things',
      posterUrl: 'https://preview.redd.it/uuzw0xpetdb31.png?width=1080&crop=smart&auto=webp&s=d0e54358b61f4ae7b2bac430f1a12943e929afa9',
      theaters: ['PVR Cinemas', 'INOX', 'Cinepolis']
    },
    {
      id: 2,
      title: 'Maharaja',
      posterUrl: 'https://assets.telegraphindia.com/telegraph/2024/Jun/1717580397_maharaja.jpg',
      theaters: ['Carnival Cinemas', 'AGS Cinemas']
    },
    {
      id: 3,
      title: 'The Smurfs',
      posterUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQo5ooK4E8QGD5En1jI0Kd397v9UVuT8h4fQGXBP_CXBrAWDO6aPOdgadzdKkWCfQf7o-yt',
      theaters: ['PVR Cinemas', 'Sathyam Cinemas']
    },
    {
      id: 4,
      title: 'Soorarai Pottru',
      posterUrl: 'https://static.moviecrow.com/marquee/soorarai-pottru-on-sun-tv-this-pongal/182713_thumb_665.jpg',
      theaters: ['Escape Cinemas', 'Sathyam Cinemas']
    },
    {
      id: 5,
      title: 'Spider-Man: No Way Home',
      posterUrl: 'https://wallpaperbat.com/img/717755-spider-man-no-way-home-2021-wallpaper.jpg',
      theaters: ['PVR Cinemas', 'Cinepolis']
    },
    {
      id: 6,
      title: 'Ghilli',
      posterUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/454e84203526321.Y3JvcCwyNDgwLDE5MzksMCwzNDM.png',
      theaters: ['Sathyam Cinemas', 'Carnival Cinemas']
    },
    {
      id: 7,
      title: 'Premam',
      posterUrl: 'https://i.pinimg.com/736x/a0/10/1d/a0101d1cd1a6611b7c0ac01bcfd06342.jpg',
      theaters: ['PVR Cinemas', 'INOX']
    },
    {
      id: 8,
      title: 'Mankatha',
      posterUrl: 'https://i.pinimg.com/736x/a3/c1/ad/a3c1adb40a4c7504cdc39e1bcf92daaf.jpg',
      theaters: ['Sathyam Cinemas', 'AGS Cinemas']
    },
  ]);
  
  const [loading] = useState(false);
  const [error] = useState(null);

  const selectMovie = (movie) => {
    setBookingInfo({ ...bookingInfo, movie });
    onSelectMovie(); // Call the prop function to go to the next step
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Movies</h2>
      <div style={styles.movieList}>
        {movies.map((movie) => (
          <div key={movie.id} style={styles.movieItem}>
            <img src={movie.posterUrl} alt={movie.title} style={styles.poster} />
            <div style={styles.movieInfo}>
              <h3 style={styles.movieTitle}>{movie.title}</h3>
              <div style={styles.theaters}>
                <strong>Theaters:</strong>
                <ul>
                  {movie.theaters.map((theater, index) => (
                    <li key={index}>{theater}</li>
                  ))}
                </ul>
              </div>
              <button onClick={() => selectMovie(movie)} style={styles.button}>Select Movie</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px', 
  },
  heading: {
    marginBottom: '20px',
  },
  movieList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '20px',
    padding: '0 20px',
  },
  movieItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    transition: 'transform 0.2s',
  },
  poster: {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
  },
  movieTitle: {
    margin: '10px 0',
    fontSize: '16px',
    textAlign: 'center',
  },
  theaters: {
    margin: '10px 0',
    textAlign: 'center',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default MoviesList;
