// reqired packages
const app = require("./app");
const config = require("./config");
const sequelizeClient = require("./database/sequelize")



// start database then express app

sequelizeClient.sync().then(() => {
    console.log(`Database connected`)
    app.listen(config.app.port, () => {
        console.log(`app is running on port ${config.app.port}`);
    });
}).catch((err) => console.log(err));


