const site = require("./test_site.js");
const msgsNumber = 10;
const TimeBetweenMessages = 10000;
const pathToimage = "./picture.png";
let message = "";

(async () => {
  await site.initialize();
  // await site.login("testuser12name", "03176836874Asimali@");
  // await site.save_cookies();
  if (await site.load_cookies()) {
    console.log("cookies loaded succesfully :D");
    await site.turn_on_notifications();
  } else {
    console.log("couldn't load cookies.. loging and creating new cookies : ");
    await site.login("testuser12name", "03176836874Asimali@");
    await site.save_cookies();
  }

  debugger;
})();
