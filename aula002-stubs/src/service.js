const https = require('https')
const { resolve } = require('path')

class Service {
    async makeRequest(url){
        return new Promise((resolve, reject) => {
            https.get(url, response => {
                response.on('data', data => resolve(JSON.parse(data)))
                response.on('error', reject)
            })
        })
    }

    async getPlanets(url){
        const result = await this.makeRequest(url);
        return {
            name: result.name,
            population: result.population
        }
    }
}

module.exports = Service