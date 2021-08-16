const Service = require('./service');
const sinon = require('sinon');
const {deepStrictEqual} = require('assert');


const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const mocks = {
    tatooine: require('./mocks/tatooine.json')
}

;(async () => {
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);
    
    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)
    
    {
        const expected = {
            "name": "Tatooine",
            "population":"200000"
        }

        const result = await service.getPlanets(BASE_URL_1);
        
        deepStrictEqual(result, expected);
    }


})()