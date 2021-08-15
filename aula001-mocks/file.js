const { readFile } = require('fs/promises');
const { error } = require('./constants');
const Car = require('./car');

const DEFAULT_OPTION = {
    maxLines: 4,
    fields: ["id", "name", "age", "brand"]
}

class File {
    static async csvToJson(filePath){
        //pegar o arquivo
        const content = await File.getFileContent(filePath);
        //validar
        const validation = File.isValid(content);
        if(!validation.valid) throw new Error(validation.error);
        //passar para json
        const cars = File.parseCsvToJson(content);
        return cars;
    }

    static async getFileContent(filePath){
        return (await readFile(filePath)).toString('utf-8');
    }

    static isValid(content, options = DEFAULT_OPTION){
        const [header, ...fileWithoutHeader] = content.split('\n');
        const isHeaderValid = header === options.fields.join(',');
        if(!isHeaderValid){
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
        const isContentAccepeted = (
            fileWithoutHeader.length > 0 && 
            fileWithoutHeader.length <= options.maxLines
        )

        if(!isContentAccepeted){
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        return {valid: true}
    }

    static parseCsvToJson(csvContent){
        const lines = csvContent.split('\n');
        const firstLine = lines.shift();
        const header = firstLine.split(',');
        const cars = lines.map(line => {
            const columns = line.split(',');
            let car = {};
            for(const index in columns){
                car[header[index]] = columns[index];
            }
            return new Car(car);
        })
        return cars
    }
}

module.exports = File