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
];

const telegramApi = "7925095591:AAE1pSSLaP2vyovdWUJqJtksWU_kFxjcG9I";
const chatId = "-4558496125";

async function checkStock(product) {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://www.apple.com/in/shop/fulfillment-messages?little=false&parts.0=${product.id}&mts.0=regular&mts.1=sticky&fts=true`,
    };

    const res = await axios.request(config);
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
    console.log(product.name, " - ", availability);
  } catch (error) {
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
