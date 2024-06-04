import { Soul, said } from "@opensouls/soul";
import { config } from "dotenv";
import readline from "readline";

async function run() {
  config();

  if (!process.env.SOUL_ENGINE_ORGANIZATION) {
    throw new Error("config your .env file");
  }

  const soul = new Soul({
    blueprint: require("../package.json").name,
    organization: process.env.SOUL_ENGINE_ORGANIZATION,
    token: process.env.SOUL_ENGINE_TOKEN,
    debug: process.env.SOUL_ENGINE_DEBUG === "true",
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async function readUserInput() {
    rl.question("Chat with the soul: ", async (message) => {
      soul.dispatch(said("User", message));
    });
  }

  soul.on("says", async ({ content }) => {
    console.log("Soul said", await content());
  });

  soul.on("logs", async ({ content }) => {
    console.log("Soul logged", await content());
  });

  soul.on("yields", async ({ content }) => {
    console.log("Soul yielded");
    await content();

    setTimeout(() => {
      readUserInput();
    }, 1000);
  });

  await soul.connect();

  readUserInput();
}

run();
