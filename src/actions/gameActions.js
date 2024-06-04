import axios from 'axios';

export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const FETCH_ADDITIONAL_GAMES_SUCCESS = 'FETCH_ADDITIONAL_GAMES_SUCCESS';

export const fetchGamesSuccess = (games) => ({
  type: FETCH_GAMES_SUCCESS,
  payload: games,
});

export const fetchAdditionalGamesSuccess = (games) => ({
  type: FETCH_ADDITIONAL_GAMES_SUCCESS,
  payload: games,
});

export const fetchInitialGames = (ids) => {
  return async (dispatch) => {
    const promises = ids.map((id) => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://www.cheapshark.com/api/1.0/games?ids=${id}`,
        headers: {},
      };

      return axios(config)
        .then((response) => {
          const gameData = response.data[id];
          return {
            title: gameData.info.title,
            image: gameData.info.thumb,
            price: `$${gameData.deals[0].price}`,
          };
        })
        .catch((error) => {
          console.error(`Error fetching game data for ID ${id}:`, error);
          return null;
        });
    });

    try {
      const results = await Promise.all(promises);
      const filteredResults = results.filter((game) => game !== null);
      dispatch(fetchGamesSuccess(filteredResults));
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };
};

export const fetchAdditionalGames = () => {
  return async (dispatch) => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://www.cheapshark.com/api/1.0/games?title=batman',
      headers: {},
    };

    try {
      const response = await axios(config);
      const gameData = response.data.map((game) => ({
        title: game.external,
        image: game.thumb,
        price: `$${game.cheapest}`,
      }));
      dispatch(fetchAdditionalGamesSuccess(gameData));
    } catch (error) {
      console.error('Error fetching additional game data:', error);
    }
  };
};
