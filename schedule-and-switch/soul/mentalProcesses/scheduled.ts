import { MentalProcess, useActions, useSoulMemory } from "@opensouls/engine";
import externalDialog from "../cognitiveSteps/externalDialog.js";
import initialProcess from "../initialProcess.js";
import other from "./other.js";

const scheduled: MentalProcess = async ({ workingMemory }) => {
  const { dispatch, speak, log } = useActions();

  dispatch({
    action: "logs",
    content: "scheduled: start",
  });

  let [withDialog, stream] = await externalDialog(workingMemory, "Talk about the weather", {
    stream: true,
    model: "quality",
  });
  speak(stream);

  [withDialog, stream] = await externalDialog(withDialog, "Complain about taxes", {
    stream: true,
    model: "quality",
  });
  speak(stream);

  [withDialog, stream] = await externalDialog(withDialog, "Tell a dad joke", {
    stream: true,
    model: "quality",
  });
  speak(stream);

  await withDialog.finished;

  dispatch({
    action: "logs",
    content: "scheduled: end",
  });

  dispatch({
    action: "loopFinished",
    content: "",
  });

  const currentProcess = useSoulMemory<"other" | "initialProcess" | null>("currentProcess", null);
  log("switching back to " + currentProcess.current);
  if (currentProcess.current === "other") {
    return [withDialog, other];
  }

  return [withDialog, initialProcess];
};

export default scheduled;
