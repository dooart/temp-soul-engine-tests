import { MentalProcess, useActions, useSoulMemory } from "@opensouls/engine";
import other from "../mentalProcesses/other.js";

const sub: MentalProcess = async ({ workingMemory }) => {
  const { dispatch, scheduleEvent } = useActions();

  // prevent infinite loop
  const shouldSchedule = useSoulMemory("shouldSchedule", true);
  if (!shouldSchedule.current) {
    dispatch({
      action: "logs",
      content: "sub: skipped, shouldSchedule is false",
    });
    return workingMemory;
  }

  shouldSchedule.current = false;

  dispatch({
    action: "logs",
    content: "sub: start",
  });

  scheduleEvent({
    in: 10,
    perception: {
      action: "says",
      content: "blah",
      name: "blah",
    },
    process: other,
  });

  dispatch({
    action: "logs",
    content: "sub: end",
  });

  return workingMemory;
};

export default sub;
