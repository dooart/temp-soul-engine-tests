import { MentalProcess, useActions, usePerceptions } from "@opensouls/engine";

const other: MentalProcess = async ({ workingMemory }) => {
  const { dispatch } = useActions();
  const { invokingPerception } = usePerceptions();

  dispatch({
    action: "logs",
    content: "other: start",
  });

  dispatch({
    action: "logs",
    content: `scheduled event content: ${invokingPerception?.content}`,
  });

  dispatch({
    action: "logs",
    content: "other: end",
  });

  dispatch({
    action: "yields",
    content: "",
  });

  return workingMemory;
};

export default other;
