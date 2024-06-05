import { MentalProcess, useActions, useProcessManager } from "@opensouls/engine";
import externalDialog from "./cognitiveSteps/externalDialog.js";
import followUp from "./mentalProcesses/followUp.js";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { dispatch, log, speak, scheduleEvent } = useActions();
  const { pendingScheduledEvents, cancelScheduledEvent } = useProcessManager();

  if (pendingScheduledEvents.current.length > 0) {
    log(`Cancelling ${pendingScheduledEvents.current.length} scheduled events.`);
    for (const event of pendingScheduledEvents.current) {
      cancelScheduledEvent(event.id);
    }
  }

  dispatch({
    action: "logs",
    content: "main: start",
  });

  const [withDialog, stream] = await externalDialog(workingMemory, "Answer the user's question.", {
    stream: true,
    model: "gpt-4o",
  });
  speak(stream);

  dispatch({
    action: "logs",
    content: "main: end",
  });

  log("Scheduling a follow-up event in 5 seconds.");
  scheduleEvent({
    in: 5,
    perception: {
      action: "followUp",
      content: "about stuff",
    },
    process: followUp,
  });

  return withDialog;
};

export default initialProcess;
