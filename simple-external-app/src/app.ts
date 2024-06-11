import { said } from "@opensouls/engine";
import { Soul } from "@opensouls/soul";
import { config } from "dotenv";

async function run() {
  config();

  if (!process.env.SOUL_ENGINE_ORGANIZATION || !process.env.SOUL_ENGINE_TOKEN) {
    throw new Error("config your .env file");
  }

  const soul = new Soul({
    blueprint: require("../package.json").name,
    organization: process.env.SOUL_ENGINE_ORGANIZATION,
    token: process.env.SOUL_ENGINE_TOKEN,
    debug: true,
  });

  soul.on("says", async ({ content }) => {
    console.log("Soul said", await content());
  });

  await soul.connect();

  soul.dispatch(said("User", "hey"));
}

run();
