import { MentalProcess, useActions, useSoulMemory } from "@opensouls/engine";
import externalDialog from "./cognitiveSteps/externalDialog.js";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { dispatch, speak } = useActions();
  const shouldSchedule = useSoulMemory("shouldSchedule", true);
  shouldSchedule.current = true;

  dispatch({
    action: "logs",
    content: "main",
  });

  const [withDialog, stream] = await externalDialog(
    workingMemory,
    "Talk to the user trying to gain trust and learn about their inner world.",
    { stream: true }
  );
  speak(stream);

  dispatch({
    action: "logs",
    content: "main end",
  });

  return withDialog;
};

export default initialProcess;
