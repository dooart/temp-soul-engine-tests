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

  soul.on("logs", async ({ content }) => {
    console.log("Soul logged", await content());
  });

  await soul.connect();

  let nextProcess: "other" | "initialProcess" = "other";

  soul.on("yields", async ({ content }) => {
    await content();

    const randomTime = Math.floor(Math.random() * (9000 - 5000 + 1)) + 5000;
    await new Promise((resolve) => setTimeout(resolve, randomTime));

    soul.dispatch({
      name: "User",
      action: "switch",
      content: nextProcess,
      _metadata: {
        process: nextProcess,
      },
    });

    nextProcess = nextProcess === "other" ? "initialProcess" : "other";
    console.log("####### next process", nextProcess);
  });

  soul.on("loopFinished", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await runLoop();
  });

  const runLoop = async () => {
    soul.dispatch(said("User", "hey"));
  };

  await runLoop();
}

run();
