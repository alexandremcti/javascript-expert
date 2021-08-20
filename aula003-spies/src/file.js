const { readFile } = require('fs/promises');

const url = './mocks/films.csv';

class File {

    static async getFile(){
        const content = (await readFile(url)).toString('utf8');
        return content
    }
}

module.exports = File