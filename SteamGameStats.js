async function SteamGameStats(id) {
    const { steamapikey } = require('./config.json');
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(steamapikey);
    const prompt = require("prompt-sync")();

    let total_achieved = 0;
    let total_achievements = 0;
    var user = prompt("Please enter your steam username: ");

    steam.resolve(`https://steamcommunity.com/id/${user}`).then(id => {
        steam.getUserOwnedGames(id).then(games => {
            for (let i = 0; i < games.length; i++) {
                console.log(games[i].name)
            }
            var game = prompt("Please enter the game you want to check: ");
            for (let i = 0; i < games.length; i++) {
                if (games[i].name == game) {
                    var gameid = (games[i].appID);

                    steam.getUserAchievements(id,gameid).then(GameAchievements => {
                        for (let l = 0; l < GameAchievements.achievements.length; l++) {
                            if (GameAchievements.achievements[l].achieved == true) {
                                total_achieved++;
                                total_achievements++;
                            }
                            else {
                                total_achievements++;
                            }
                        }
                        console.log("")
                        console.log(`Achievements completed in ${game}:`, total_achieved + '/' + total_achievements);
                    })
                }
            }
        });
    });
}

SteamGameStats();