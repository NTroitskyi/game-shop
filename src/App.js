import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialGames, fetchAdditionalGames } from './actions/gameActions';
import { logout } from './actions/authActions';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

const initialGameIds = ['270766', '202350', '202278']; // Example list of game IDs

function App() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.games);
  const additionalGames = useSelector((state) => state.games.additionalGames);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [loadedGames, setLoadedGames] = React.useState(3);
  const gamesPerLoad = 8;

  useEffect(() => {
    dispatch(fetchInitialGames(initialGameIds));
    dispatch(fetchAdditionalGames());
    loadMoreGames()
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreGames();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const loadMoreGames = () => {
    setLoadedGames((prevLoadedGames) => Math.min(prevLoadedGames + gamesPerLoad, games.length + additionalGames.length));
  };

  return (
    <div className="App">
      <header>
        <div className="nav-left">
          <h1><Link to="/">Game Shop</Link></h1>
        </div>
        <nav className="nav-right">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Games</Link></li>
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Contact</Link></li>
          </ul>
          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <span>Welcome, {user.username}</span>
                <button className="btn logout" onClick={() => dispatch(logout())}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/register" className="btn register">Register</Link>
                <Link to="/login" className="btn sign-up">Sign In</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={
          <div id="game-shop">
            <div id="first-three-games" className="game-row">
              {games.slice(0, 3).map((game, index) => (
                <div key={index} className="game-item">
                  <img src={game.image} alt={game.title} />
                  <h2>{game.title}</h2>
                  <p>{game.price}</p>
                </div>
              ))}
            </div>
            <hr />
            <div id="remaining-games" className="game-column">
              {games.slice(3, loadedGames).map((game, index) => (
                <div key={index} className="remaining-game-item">
                  <img src={game.image} alt={game.title} />
                  <div className="game-details">
                    <h2>{game.title}</h2>
                    <p>{game.price}</p>
                  </div>
                </div>
              ))}
              {additionalGames.slice(0, loadedGames - games.length).map((game, index) => (
                <div key={index + games.length} className="remaining-game-item">
                  <img src={game.image} alt={game.title} />
                  <div className="game-details">
                    <h2>{game.title}</h2>
                    <p>{game.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
