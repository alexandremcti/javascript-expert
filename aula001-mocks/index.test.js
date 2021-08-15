const File = require('./file');
const { error } = require('./constants');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
    {

        const filePath = './mocks/blankFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection)
    }

    {
        const filePath = './mocks/fiveItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection)
    }

    {
        const filePath = './mocks/invalidHeader-invalid.csv';
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection)
    }

    {
        const filePath = './mocks/invalidHeader-invalid.csv';
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection)
    }

    {
        const filePath = './mocks/fourItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
              "id": 123,
              "name": "hb20",
              "age": 2012,
              "brand": "hyundai"
            },
            {
              "id": 456,
              "name": "etios",
              "age": 2016,
              "brand": "toyota"
            },
            {
              "id": 890,
              "name": "gol",
              "age": 2020,
              "brand": "wolks"
            },
            {
              "id": 109,
              "name": "palio",
              "age": 2010,
              "brand": "fiat"
            }
          ]
        deepStrictEqual(JSON.stringify(result),JSON.stringify(expected))
    }
})()