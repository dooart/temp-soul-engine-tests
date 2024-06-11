import { MentalProcess, useActions } from "@opensouls/engine";
import externalDialog from "./cognitiveSteps/externalDialog.js";

const initialProcess: MentalProcess = async ({ workingMemory }) => {
  const { speak } = useActions();

  const [withDialog, stream] = await externalDialog(workingMemory, "Reply to the message.", { stream: true });
  speak(stream);

  return withDialog;
};

export default initialProcess;
