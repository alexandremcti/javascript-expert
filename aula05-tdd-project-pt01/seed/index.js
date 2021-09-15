const faker = require('faker')
const Car = require('./../src/entities/Car')
const CarCategory = require('./../src/entities/CarCategory')
const Customer = require('./../src/entities/Customer')

const { join } = require('path')
const { writeFile } = require('fs/promises')
const { fake } = require('faker')

const seedBaseFolder = join(__dirname, "../", "database");
const ITENS_AMOUNT = 2;

const carCategory = new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    carIds:[],
    price: faker.finance.amount(20, 100)
});

const cars = [];
const customers = [];
for(let index = 0; index < ITENS_AMOUNT; index++){
    const car = new Car({
        id: faker.datatype.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })
    carCategory.carIds.push(car.id);
    cars.push(car)


    const customer = new Customer({
        id: faker.datatype.uuid(),
        age: faker.datatype.number({min: 18, max: 50})
    })
    customers.push(customer);
}

const write = (filename, data) => writeFile(join(seedBaseFolder, filename), JSON.stringify(data))

;(async () => {
    await write('cars.json', cars);
    await write('customers.json', customers)
    await write('carCategories.json', [carCategory])

    console.log('cars', cars)
    console.log('customers', customers)
    console.log('carCategories', [carCategory])
})()