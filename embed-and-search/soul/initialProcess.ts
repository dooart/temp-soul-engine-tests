import { MentalProcess, useActions, useProcessManager, useSoulStore } from "@opensouls/engine";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { log } = useActions();
  const { set, search } = useSoulStore();
  const { wait } = useProcessManager();

  set("test", "i love apples");

  await wait(2000);

  const apples = await search("apples", { maxDistance: 0.7 });
  const dinosaurs = await search("dinosaurs", { maxDistance: 0.7 });

  log(
    "apples",
    apples.map((a) => `${a.content} - ${a.distance} - ${a.similarity}`)
  );
  log(
    "dinosaurs",
    dinosaurs.map((a) => `${a.content} - ${a.distance} - ${a.similarity}}`)
  );

  return workingMemory;
};

export default initialProcess;
