const axios = require("axios");

const products = [
  {
    id: "MYNF3HN/A",
    name: "iPhone 16 Pro DESSERT",
  },
  {
    id: "MYNG3HN/A",
    name: "iPhone 16 Pro NATURAL",
  },
  {
    id: "MYNE3HN/A",
    name: "iPhone 16 Pro WHITE",
  },
  {
    id: "MYND3HN/A",
    name: "iPhone 16 Pro BLACK",
  },
  {
    id: "MYWX3HN/A",
    name: "iPhone 16 Pro max DESSERT",
  },
  {
    id: "MYWY3HN/A",
    name: "iPhone 16 Pro max NATURAL",
  },
  {
    id: "MYWW3HN/A",
    name: "iPhone 16 Pro max WHITE",
  },
  {
    id: "MYWV3HN/A",
    name: "iPhone 16 Pro max BLACK",
  },
  // {
  //   id: "MYEG3HN/A",
  //   name: "iPhone 16 plus pink",
  // },
];

const telegramApi = "7925095591:AAE1pSSLaP2vyovdWUJqJtksWU_kFxjcG9I";
const chatId = "-4558496125";

async function checkStock(product) {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://www.apple.com/in/shop/fulfillment-messages?little=false&parts.0=${product.id}&mts.0=regular&mts.1=sticky&fts=true`,
      headers: {
        Cookie:
          "as_dc=ucp5; as_gloc=d186ea9e0bc568a5aecbc63c21853fb6358244ca550b001b0505dc1b614904a626bcc28616edd592d070a3719f69a1afec45425c52be09d8de07c0cbf7bbaa4d831b614d58061d53f65c11d7a0336ce9ed79bf238627b2e298ccb15b1f2dd854; as_pcts=CWi5jW4rZE3h5GFzB9cgU7hlqc_VKaaYcCpLBzgls3lrP0o2abQrZ9S5Rfwqzr9iuZyc4FTBg9G8d6t0z2a9og1c9pAZ7LeJ7jcgqwDO_6Beo45R5MZhkyqH-lXI0; dssf=1; dssid2=87d13adc-b425-4115-8b5c-17c54e9360ba",
      },
    };

    const res = await axios.request(config);

    // console.log(JSON.stringify(res.data));

    const storeName = res.data.body.content.pickupMessage.stores[0].storeName;

    const availability =
      res.data.body.content.pickupMessage.stores[0].partsAvailability[
        product.id
      ].pickupDisplay;

    if (availability === "available") {
      const message = `${product.name} is available now!`;
      await axios.get(
        `https://api.telegram.org/bot${telegramApi}/sendMessage?chat_id=${chatId}&text=${message}`
      );
    }
    console.log(product.name, " - ", availability, " - ", storeName);
  } catch (error) {
    await axios.get(
      `https://api.telegram.org/bot${telegramApi}/sendMessage?chat_id=${chatId}&text=Error:${
        error.message || "no message available"
      }`
    );
    console.error(error);
  }
}

async function checkforAll() {
  for (let product of products) {
    await checkStock(product);
  }
}

setInterval(() => {
  checkforAll(); // Check stock every minute 1000 milliseconds = 1 second * 60 = 60 seconds
}, 60 * 1000);

checkforAll();
