/**
const HttpClient = require('../http.js')
const BaseProvider = require('./base.js')
const cli = require('cli-ux').cli
const baseDecorator = require('./base')
**/
async function main() {
    var XboxApiClient = require('../src/client')
    var client = XboxApiClient({
        clientId: '5e5ead27-ed60-482d-b3fc-702b28a97404'
    })
    
    client.isAuthenticated().then(function(){
        console.log('User is authenticated.')

        client.getProvider('achievements').getRecentAchievment().then(function(result){
            console.log('resolve', result)

        }).catch(function(error){
            console.log('reject', error)
        })

    }).catch(function(error){
        console.log('User is not authenticated. Run authentication flow first.', error)
    })
}
main();