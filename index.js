const site = require("./test_site.js");
const msgsNumber = 10;
const TimeBetweenMessages = 10000;
const pathToimage = "./picture.png";
let message = "";

(async () => {
  await site.initialize();


  await site.login("9896843434");

  // await site.followFollwersOfAUser(600, 40000, "kingtemaki");

  debugger;
})();
