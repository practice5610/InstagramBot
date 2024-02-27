const puppeteer = require("puppeteer"); ////*
const Login_URL = "https://www.instagram.com/accounts/login/";
const Home_URL = "https://www.instagram.com/";
const pathTofile = require("path").join(__dirname, "link.txt");
const fs = require("fs");
const cookiesFilePath = require("path").join(__dirname, "cookies.json");
// var stream = fs.createWriteStream(pathTofile);

const TAG_URL = (tag) => {
  return "https://www.test_site.com/explore/tags/" + tag + "/";
};
const mainObj = {
  browser: null,
  page: null,
  initialize: async () => {
    mainObj.browser = await puppeteer.launch({
      headless: false,
    });

    mainObj.page = await mainObj.browser.newPage();
    // await mainObj.page.setViewport({
    //   width: 1580, // Replace with your desired width
    //   height: 1280, // Replace with your desired height
    //   deviceScaleFactor: 1,
    // });

    await mainObj.page.goto(Login_URL, {
      waitUntil: "networkidle2",
    });
  },
  save_cookies: async () => {
    const cookiesObject = await mainObj.page.cookies();
    var data = JSON.stringify(cookiesObject);
    console.log("started saving sessiong");

    await fs.writeFile(
      cookiesFilePath,
      data,
      {
        spaces: 2,
      },
      function (err) {
        if (err) {
          console.log("The file could not be written.", err);
        }
        console.log("Session has been successfully saved");
      }
    );
  },
  turn_on_notifications: async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Wait for 5 seconds before logging in successfully
    await delay(8000);
    const notificationDivSelector = "div._a9-z";
    const notNowButtonSelector = "button._a9--._ap36._a9_1";

    // Wait for the notification div to be present
    await mainObj.page.waitForSelector(notificationDivSelector);

    // Check if the "Not Now" button is present in the notification div
    const notNowButton = await mainObj.page.$(notNowButtonSelector);

    if (notNowButton) {
      // Click the "Not Now" button if it's present
      await notNowButton.click();
      console.log("Clicked on 'Not Now' button");
    } else {
      console.log("No 'Not Now' button found");
    }
  },
  load_cookies: async () => {
    let cb = async function (_cookies) {
      try {
        await mainObj.page.setCookie(_cookies);
      } catch (error) {
        console.log("could not inject cookies : " + error);
        return false;
      }
    };
    let data;
    try {
      data = await fs.readFileSync(cookiesFilePath);
    } catch (error) {
      console.log("could not read File : " + cookiesFilePath + "=>" + error);
      return false;
    }
    let cookies = JSON.parse(data);
    for (var i = 0, len = cookies.length; i < len; i++) await cb(cookies[i]);
    try {
      await mainObj.page.goto(Home_URL, {
        waitUntil: "networkidle2",
      });
    } catch (error) {
      console.log("could not go to home url" + error);
    }
    return true;
    // try {
    //   LoginButton = await mainObj.page.$x(
    //     '//*[@id="react-root"]/section/main/article/div/div/div/div[2]/button'
    //   );
    //   if (LoginButton[0]) return false;
    //   else return true;
    // } catch (error) {
    //   return false;
    // }
  },
  login: async (username, password) => {
    await mainObj.page.waitForSelector('button[type="submit"]');
    await mainObj.page.type('input[name="username"]', username);

    // Type the password into the password input field
    await mainObj.page.type('input[name="password"]', password);

    // Assuming your login button has a selector 'button[type="submit"]'
    await mainObj.page.click('button[type="submit"]');
    await mainObj.page.waitForSelector("button._acan._acap._acas._aj1-._ap30");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Wait for 5 seconds before logging in successfully
    await delay(10000);
    console.log("Login successful!");
  },
  extract_users: async (message, followingURL) => {
    await test_site.page.goto(followingURL, {
      waitUntil: "networkidle2",
    });
    await test_site.page.waitFor(1000);
    Appbutton = await test_site.page.$x(
      '//*[@id="react-root"]/section/main/div/header/section/div[1]/div/button'
    );
    await Appbutton[0].click();
    Applaunch = await test_site.page.$x("/html/body/div[3]/div/div[2]");
    const newPagePromise = new Promise((x) =>
      test_site.browser.once("targetcreated", (target) => x(target.page()))
    ); // declare promise
    await test_site.page.waitFor(2000);
    await Applaunch[0].click();
    await test_site.page.waitFor(2000);
    const popup = await newPagePromise; // declare new tab /window,
    await popup.waitFor(3000);
    NoButton = await popup.$x("/html/body/div[3]/div/div/div[3]/button[2]");
    await NoButton[0].click();
    await popup.waitFor(2000);
    profilButton = await popup.$x(
      '//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span'
    );
    await popup.waitFor(2000);
    await profilButton[0].click();
    await popup.waitFor(2000);
    followingButton = await popup.$x(
      '//*[@id="react-root"]/section/main/div/header/section/ul/li[3]/a'
    );
    await popup.waitFor(2000);
    await followingButton[0].click();
    await popup.waitFor(3000);
    const scrollable_section =
      'body > div[role="presentation"] > div > div:nth-child(3)';
    await popup.waitFor(2000);
    const scrollableSection = await popup.$x(
      "/html/body/div[3]/div/div[2]/ul/div/li[1]/div/div[1]/div[2]/div[2]"
    );
    await popup.mouse.move(400, 136);
    await popup.waitFor(1000);
    await popup.mouse.down();
    await popup.waitFor(1000);
    await popup.keyboard.press("Space");
    await popup.waitFor(1000);

    await popup.mouse.move(400, 136);
    await popup.waitFor(1000);
    await popup.mouse.down();
    await popup.waitFor(1000);
    await popup.keyboard.press("Space");
    await popup.waitFor(1000);

    for (let i = 0; i < 20; i++) {
      await popup.keyboard.press("Space");
      await popup.waitFor(1000);
    }
    let users = await popup.$x(
      "/html/body/div[3]/div/div[2]/ul/div/li/div/div[1]/div[2]/div[1]/a"
    );
    let fd;
    for (i = 0; i < users.length; i++) {
      let user = await popup.evaluate((el) => {
        // do what you want with featureArticle in page.evaluate
        return el.textContent;
      }, users[i]);

      let link = "www.test_site.com/" + user;

      try {
        fd = fs.openSync(pathTofile, "a");
        await fs.appendFileSync(fd, link + "\n");
      } catch (err) {
        console.log("link was not appended error : " + err);
      } finally {
        if (fd !== undefined) fs.closeSync(fd);
      }
    }
    return pathTofile;
  },
  loadusers: () => {
    let array = [];
    var data = fs.readFileSync(pathTofile);
    array = data.toString().split("\n");
    console.log(array.length);
    end = array.length;
    for (let k = 0; k < end; k++) {
      //gettin the user-target
      let user = array.shift();
      //sending message

      //array to file
      console.log("user is : " + user);
      updatedlist = array.join("\n");
      fs.writeFileSync(pathTofile, updatedlist);
      data = fs.readFileSync(pathTofile);
      array = data.toString().split("\n");
      console.log(array.length);
    }
    //file to array
    //loop back
  },

  sendMessages: async (
    message,
    pathToimage,
    TimeBetweenMessages,
    msgsNumber
  ) => {
    try {
      await test_site.page.waitForXPath(
        '//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span'
      );
      MyProfilButton = await test_site.page.$x(
        '//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span'
      );
      await MyProfilButton[0].click();
      await test_site.page.waitFor(1000);
    } catch (error) {
      console.log("profile Button : " + error);
    }
    try {
      await test_site.page.waitForXPath(
        '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/button'
      );
      Appbutton = await test_site.page.$x(
        '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/button'
      );
      await Appbutton[0].click();
    } catch (error) {
      console.log("App button : " + error);
    }
    await test_site.page.waitForXPath("/html/body/div[3]/div/div[2]/a");
    Applaunch = await test_site.page.$x("/html/body/div[3]/div/div[2]/a");
    const newPagePromise = new Promise((x) =>
      test_site.browser.once("targetcreated", (target) => x(target.page()))
    ); // declare promise
    try {
      await test_site.page.waitFor(2000);
      await Applaunch[0].click();
    } catch (error) {
      console.log("popup : " + error);
    }

    await test_site.page.waitFor(2000);
    const popup = await newPagePromise; // the popup opened now we controlling it
    try {
      await popup.waitForXPath("/html/body/div[3]/div/div/div[3]/button[2]");
      NoButton = await popup.$x("/html/body/div[3]/div/div/div[3]/button[2]");
      await NoButton[0].click();
    } catch (error) {
      console.log("first notification in popup : " + error);
    }

    try {
      await popup.waitForXPath(
        '//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span'
      );
      profilButton = await popup.$x(
        '//*[@id="react-root"]/section/nav[2]/div/div/div[2]/div/div/div[5]/a/span'
      );
      await profilButton[0].click();
    } catch (error) {
      console.log("profilButton in popup : " + error);
    }
    let array = [];
    let data = "";
    try {
      data = fs.readFileSync(pathTofile);
    } catch (error) {
      console.log(
        "file of users : " + pathTofile + "couldn't load >> " + error
      );
    }
    array = data.toString().split("\n");
    console.log("we have " + array.length + "user in this file");
    end = array.length;
    if (msgsNumber <= end)
      for (let k = 0; k < msgsNumber; k++) {
        word1 = [
          "hello",
          "Hi",
          "whatsapp ! ^^ ",
          "Hey there ! ",
          "Holla ! :p ",
        ];
        word2 = [
          "this Tshirt ",
          "this outfit ",
          "im sure this t-shirt ",
          "Believe me this T-Shirt ",
        ];
        word3 = [
          "Going to look great on you",
          " is going to look awsome on you",
          "is going to look good on you ^^ ",
        ];
        word4 = [
          "Get one for only 17$ ",
          "buy one for only 17$ ",
          "and its only for 17$ ",
        ];
        word5 = [
          "From here => ",
          "You get it From here => ",
          "you can find it in here => ",
          "===> ",
        ];
        word6 = ["  http://bit.ly/tshirt_skull "];

        //gettin random mix of message
        message =
          word1[Math.floor(Math.random() * word1.length)] +
          "\n" +
          word2[Math.floor(Math.random() * word2.length)] +
          word3[Math.floor(Math.random() * word3.length)] +
          "\n" +
          word4[Math.floor(Math.random() * word4.length)] +
          "\n" +
          word5[Math.floor(Math.random() * word5.length)] +
          word6[Math.floor(Math.random() * word6.length)];
        console.log(message + "\n" + "-----------------------------" + "\n");
        //gettin the first user from the array
        let user = array.shift();
        console.log("the user you are sending to now is : " + user);
        //go to the user profile
        try {
          await popup.goto("https://" + user + "/", {
            waitUntil: "networkidle2",
          });
        } catch (error) {
          console.log("couldn't go to the url error : " + error);
        }
        //clicking message button
        try {
          await popup.waitForXPath(
            '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/button'
          );
          messageButton = await popup.$x(
            '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/button'
          );
          await messageButton[0].click();
        } catch (error) {
          console.log("messageButton in popup: " + error);
        }

        //uploading the image
        try {
          const input = await popup.$('input[type="file"]');
          await input.uploadFile(pathToimage);
        } catch (error) {
          console.log("couldn't upload image : ./picture.png " + error);
        }
        //focusing textarea
        try {
          await popup.waitForXPath(
            '//*[@id="react-root"]/section/div[2]/div[2]/div/div/div/textarea'
          );
          textarea = await popup.$x(
            '//*[@id="react-root"]/section/div[2]/div[2]/div/div/div/textarea'
          );
          await textarea[0].click();
        } catch (error) {
          console.log("textarea : " + error);
        }

        //typing the message
        try {
          await popup.type('textarea[placeholder="Message..."]', message, {
            delay: 50,
          });
        } catch (error) {
          console.log("couldn't type in text area: " + error);
        }

        //clicking send button
        try {
          await popup.waitForXPath(
            '//*[@id="react-root"]/section/div[2]/div[2]/div/div/div[2]/button'
          );
          sendButton = await popup.$x(
            '//*[@id="react-root"]/section/div[2]/div[2]/div/div/div[2]/button'
          );
          await sendButton[0].click();
        } catch (error) {
          console.log("sendButton :  " + error);
        }
        //waiting for the time been set between messages
        await popup.waitFor(TimeBetweenMessages);

        //array to file
        updatedlist = array.join("\n");
        fs.writeFileSync(pathTofile, updatedlist);
        data = fs.readFileSync(pathTofile);
        array = data.toString().split("\n");
        console.log(array.length);
      }
    else {
      console.log(
        "users list has finished || message number is bigger than users number in the list "
      );
    }
  },
  followFollwersOfAUser: async (numberToFollow, delay, user) => {
    await mainObj.page.goto("https://www.instagram.com/" + user + "/", {
      waitUntil: "networkidle2",
    });
    await mainObj.page.waitForSelector("div._ap3a._aaco._aacw._aad6._aade");
    const buttonText = await mainObj.page.$eval(
      "div._ap3a._aaco._aacw._aad6._aade",
      (div) => div.textContent
    );

    if (buttonText === "Follow") {
      // Click the Follow button
      await mainObj.page.click("div._ap3a._aaco._aacw._aad6._aade");
      console.log(`${user} followed successfully`);
    } else if (buttonText === "Requested") {
      console.log(`${user} has already been requested`);
    } else if (buttonText === "Following") {
      console.log(`${user} is already being followed`);
    } else {
      console.log(`Unexpected button state: ${buttonText}`);
    }
  },
  sendMessageToUser: async (user, message) => {
    await mainObj.page.goto(Home_URL + user + "/");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Wait for 5 seconds before logging in successfully
    await delay(20000);
    const messageButtonSelector =
      ".x1i10hfl.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x972fbf.xcfux6l.x1qhh985.xm0m39n.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x18d9i69.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x1lku1pv.x1a2a7pz.x6s0dn4.xjyslct.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x9f619.x1ypdohk.x78zum5.x1f6kntn.xwhw2v2.x10w6t97.xl56j7k.x17ydfre.x1swvt13.x1pi30zi.x1n2onr6.x2b8uid.xlyipyv.x87ps6o.x14atkfc.xcdnw81.x1i0vuye.x1gjpkn9.x5n08af.xsz8vos";

    await mainObj.page.waitForSelector(messageButtonSelector, {
      visible: true,
    });

    // Click the message button
    await mainObj.page.click(messageButtonSelector);
    await mainObj.page.waitForNavigation({ waitUntil: "networkidle2" });

    // Wait for 5 seconds before logging in successfully
    await delay(10000);
    const messageInputSelector = 'div[aria-label="Message"]';
    console.log("message typing...");
    await mainObj.page.type(messageInputSelector, message, {
      delay: 50,
    });

    const sendButtonSelector =
      'div.x1i10hfl.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.xdl72j9.x2lah0s.xe8uvvx.xdj266r.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x1lku1pv.x1a2a7pz.x6s0dn4.xjyslct.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x9f619.x1ypdohk.x1f6kntn.xwhw2v2.xl56j7k.x17ydfre.x2b8uid.xlyipyv.x87ps6o.x14atkfc.xcdnw81.x1i0vuye.xjbqb8w.xm3z3ea.x1x8b98j.x131883w.x16mih1h.x972fbf.xcfux6l.x1qhh985.xm0m39n.xt0psk2.xt7dq6l.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1n5bzlp.x173jzuc.x1yc6y37.xfs2ol5[role="button"][tabindex="0"]';
    await mainObj.page.click(sendButtonSelector);
    console.log("message sent");

    // Wait for navigation or any other required event
    await mainObj.page.waitForNavigation({ waitUntil: "networkidle2" });

    // Click the "Send" button
  },
  getFollowersFollowingPosts: async (user) => {
    await mainObj.page.goto(Home_URL + user + "/");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(5000);

    await mainObj.page.waitForSelector(".x78zum5"); // Wait for the specific class to ensure the content is loaded
    const data = await mainObj.page.evaluate(() => {
      const postsElement = document.querySelector(
        ".xl565be:nth-child(1) ._ac2a .x11i5rnm"
      );
      const followersElement = document.querySelector(
        ".xl565be:nth-child(2) ._ac2a .x11i5rnm"
      );
      const followingElement = document.querySelector(
        ".xl565be:nth-child(3) ._ac2a .x11i5rnm"
      );

      const posts = postsElement ? postsElement.innerText : "0";
      const followers = followersElement ? followersElement.innerText : "0";
      const following = followingElement ? followingElement.innerText : "0";

      return { posts, followers, following };
    });

    console.log(`User: ${user}`);
    console.log(`Posts: ${data.posts}`);
    console.log(`Followers: ${data.followers}`);
    console.log(`Following: ${data.following}`);
  },
};
module.exports = mainObj;
