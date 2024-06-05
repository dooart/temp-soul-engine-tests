import { MentalProcess, useActions, usePerceptions, useSoulMemory } from "@opensouls/engine";
import externalDialog from "../cognitiveSteps/externalDialog.js";
import initialProcess from "../initialProcess.js";
import scheduled from "./scheduled.js";

const other: MentalProcess = async ({ workingMemory }) => {
  const { dispatch, speak, log, scheduleEvent } = useActions();

  const { invokingPerception } = usePerceptions();
  const processName = invokingPerception?._metadata?.process as "other" | "initialProcess" | undefined;
  if (processName) {
    const currentProcess = useSoulMemory<"other" | "initialProcess">("currentProcess", "initialProcess");
    currentProcess.current = processName;
    log("switched to " + processName);

    if (processName === "initialProcess") {
      return [workingMemory, initialProcess];
    } else {
      return [workingMemory];
    }
  }

  dispatch({
    action: "logs",
    content: "other: start",
  });

  const [withDialog, stream] = await externalDialog(workingMemory, "Repeat the word banana many times", {
    stream: true,
  });
  speak(stream);

  dispatch({
    action: "logs",
    content: "other: end",
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

export default other;
