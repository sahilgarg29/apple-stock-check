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
      url: "https://www.apple.com/in/shop/fulfillment-messages?store=R756&little=false&parts.0=MYNG3HN/A&mts.0=regular&mts.1=sticky&fts=true",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        cookie:
          "dssid2=a1b8a58d-459c-4d52-9690-5a1cd905cce1; dssf=1; geo=IN; s_afc=p238%7Csfo291LJq-dc_mtid_187079nc38483_pcrid_715593096672_pgrid_109516736059_pntwk_g_pchan__pexid__ptid_kwd-12522920_; s_campaign=aos-IN-kwgo-brand--slid---product-; s_cc=true; pxro=1; dslang=IN-EN; site=IND; as_ltn_in=AAQEAMDQp02rgoZpvt7fmAygoY7n6t2pbEe1s0HziTCj1iuP_Pd6qxJ3-vVO54NxLUv4KChQBnhIf0s_OWAOyvx7uvge1KQAdWw; at_check=true; as_pcts=CS_+gUwxij_LkSAsetTq__BO2h-hZ5jAseU:pQ+ANvWWn84yqDuA:9E91Qg1cMN7hr7:CC_cJaAvL:FxhQEr7D_s0oA3FcgU7PEGQQjNMhFfAOIWjSRWcygHqDF+::PFiXhcZ9ld6tbp+t96YsyzvJDfSTjdGv_oSOxmXOCtl4kkN5nLZdCZP5Oi+zitMml_9z8fFg7+2qq+FqsmZjIpd1pyqN8Xq; as_sfa=Mnxpbnxpbnx8ZW5fSU58Y29uc3VtZXJ8aW50ZXJuZXR8MHwwfDE; as_dc=ucp6; as_affl=p238%7C%7Cmtid%3A%3A187079nc38483%26mnid%3A%3Asfo291LJq-dc_mtid_187079nc38483_pcrid_715593096672_pgrid_109516736059_pntwk_g_pchan__pexid__ptid_kwd-12522920_%26cid%3A%3Aaos-IN-kwgo-brand--slid---product-%26%7C%7C20241015_012600; s_fid=1FAD1509BC647694-07E1FECB3AE05771; s_vi=[CS]v1|338713826E034B2C-40000A420A979A0E[CE]; as_rumid=1728980748.311; as_atb=1.0|MjAyNC0xMC0xNSAwMToyNTo0OA|607d1c9180b2ced39c9ff6df747530f6c49bbb7f; as_uct=0; as_loc=a433b4f18b063adbd1ab7cca57cf031df3536b1076bf9e58829c2eb8bda42382a9d11668d04815da3b33f5064c08a527dd10de23697ef4877f83377f3d4ec5f9b92dde609e77bb04b44fda2ed74675bd7c84f093e497735171293f5a7e5b8dcd; rtsid=%7BIN%3D%7Bt%3Da%3Bi%3DR756%3B%7D%3B%7D; s_sq=%5B%5BB%5D%5D; as_gloc=d186ea9e0bc568a5aecbc63c21853fb6358244ca550b001b0505dc1b614904a626bcc28616edd592d070a3719f69a1afec45425c52be09d8de07c0cbf7bbaa4d831b614d58061d53f65c11d7a0336ce9ed79bf238627b2e298ccb15b1f2dd854; as_pcts=CWi5jW4rZE3h5GFzB9cgU7hlqc_VKaaYcCpLBzgls3lrP0o2abQrZ9S5Rfwqzr9iuZyc4FTBg9G8d6t0z2a9og1c9pAZ7LeJ7jcgqwDO_6Beo45R5MZhkyqH-lXI0; dssf=1; dssid2=87d13adc-b425-4115-8b5c-17c54e9360ba",
        priority: "u=1, i",
        referer:
          "https://www.apple.com/in/shop/buy-iphone/iphone-16-pro/6.3%22-display-128gb-desert-titanium",
        "sec-ch-ua":
          '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      },
    };

    const res = await axios.request(config);

    // console.log(JSON.stringify(res.data));

    const storeName = res.data.body.content.pickupMessage.stores[0].storeName;

    let availability =
      res.data.body.content.pickupMessage.stores[0]["partsAvailability"];

    for (let e in availability) {
      availability = availability[e].pickupDisplay;
      break;
    }

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
