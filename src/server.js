// reqired packages
const app = require("./app");
const config = require("./config");
const sequelizeClient = require("./database/sequelize")


// import database relationships 
const relationships = require("./database/relationships")

//import database seeders
const seeding = require("./database/seeders")


// start database then express app
sequelizeClient.sync().then(() => {
    console.log(`Database connected`)
    seeding()
    app.listen(config.app.port, () => {
        console.log(`app is running on port ${config.app.port}`);
    });
}).catch((err) => console.log(err));


