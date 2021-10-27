// reqired packages
const app = require("./app");
const config = require("./config");




// start express app
app.listen(config.app.port, () => {
    console.log(`app is running on port ${config.app.port}`);
});
  