import { MentalProcess, useActions } from "@opensouls/engine";
import externalDialog from "../cognitiveSteps/externalDialog.js";
import initialProcess from "../initialProcess.js";

const followUp: MentalProcess = async ({ workingMemory }) => {
  const { dispatch, speak } = useActions();

  dispatch({
    action: "logs",
    content: "followUp: start",
  });

  let [withDialog, stream] = await externalDialog(workingMemory, "Follow up to reengage the conversation.", {
    stream: true,
    model: "gpt-4o",
  });
  speak(stream);

  return [withDialog, initialProcess];
};

export default followUp;
