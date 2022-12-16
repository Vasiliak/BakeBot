async function SteamOwnedGames(id) {
    const { steamapikey } = require('./config.json');
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(steamapikey);

    let GamesOwned = [];

    steam.getUserOwnedGames(id).then(games => {
        for (let i = 0; i < games.length; i++) {
            GamesOwned[i] = games[i].name
        }
    })
}

SteamOwnedGames();