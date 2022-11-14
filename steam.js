async function main() {
    const { steamapikey } = require('./config.json');
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(steamapikey);

    steam.resolve('https://steamcommunity.com/id/PobaGaming').then(id => {
        steam.getUserOwnedGames(id).then(games => {
            console.log(games);
        })
        steam.getUserAchievements(id,appID).then(achievements => {
            console.log(achievements);
        })
    });

}

main();