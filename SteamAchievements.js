async function main() {
    const { steamapikey } = require('./config.json');
    const SteamAPI = require('steamapi');
    const steam = new SteamAPI(steamapikey);
    const prompt = require("prompt-sync")();

    banned = [17390,17440,29800,24720,33210,33340,303210,858460,391540,438100,439700,470220,790740,359550,623990,892970,654310,
        1281930,1714040,407530,304390,7670,1782210,219740,322330,39210,273350,1554840,367540,2098630,104360,433850,4593280];

    let total_achieved = 0;
    let total_achievements = 0;
    var user = prompt("Please enter your steam username: ");

    steam.resolve(`https://steamcommunity.com/id/${user}`).then(id => {
        steam.getUserOwnedGames(id).then(games => {
            for (let i = 0; i < games.length; i++) {
                var gameid = (games[i].appID);
                
                if (!banned.includes(gameid)) {
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
                        
                        console.log("");
                        console.log(`Total achievements completed:`, total_achieved + '/' + total_achievements);
                    })
                }
            }
            console.log(total_achieved);
        });
    });
}

main();