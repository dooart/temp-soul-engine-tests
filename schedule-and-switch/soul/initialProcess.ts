import { MentalProcess, useActions, usePerceptions, useSoulMemory } from "@opensouls/engine";
import externalDialog from "./cognitiveSteps/externalDialog.js";
import other from "./mentalProcesses/other.js";
import scheduled from "./mentalProcesses/scheduled.js";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { dispatch, speak, log, scheduleEvent } = useActions();

  const { invokingPerception } = usePerceptions();
  const processName = invokingPerception?._metadata?.process as "other" | "initialProcess" | undefined;
  if (processName) {
    const currentProcess = useSoulMemory<"other" | "initialProcess">("currentProcess", "initialProcess");
    currentProcess.current = processName;
    log("switched to " + processName);

    if (processName === "other") {
      return [workingMemory, other];
    } else {
      return [workingMemory];
    }
  }

  dispatch({
    action: "logs",
    content: "main: start",
  });

  const [withDialog, stream] = await externalDialog(workingMemory, "Say something in haiku format.", { stream: true });
  speak(stream);

  dispatch({
    action: "logs",
    content: "main: end",
  });

  dispatch({
    action: "yields",
    content: "",
  });

  scheduleEvent({
    in: 5,
    perception: {
      action: "ramble",
      content: "about stuff",
    },
    process: scheduled,
  });

  return withDialog;
};

export default initialProcess;
