async function SteamGameAchievements(id, search) {
    const { steamapikey } = require('./config.json');
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(steamapikey);

    let total_achieved = 0;
    let total_achievements = 0;
    let ListAchievements = [];

    steam.getUserOwnedGames(id).then(games => {
        for (let i = 0; i < games.length; i++) {
            if (games[i].name == search) {
                var gameid = (games[i].appID);

                steam.getUserAchievements(id,gameid).then(GameAchievements => {
                    for (let l = 0; l < GameAchievements.achievements.length; l++) {
                        if (GameAchievements.achievements[l].achieved == true) {
                            total_achieved++;
                            total_achievements++;
                            ListAchievements[l] = (GameAchievements.achievements[l].name, GameAchievements.achievements[l].achieved);
                        }
                        else {
                            total_achievements++;
                            ListAchievements[l] = (GameAchievements.achievements[l].name, GameAchievements.achievements[l].achieved);
                        }
                    }
                    return {total_achieved, total_achievements, ListAchievements}
                })
            }
        }
    });
}

SteamGameAchievements();