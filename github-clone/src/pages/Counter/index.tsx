import { createStore, createEvent, sample } from "effector";
import { useUnit } from "effector-react";

const $counter = createStore(0);

const increaseEvent = createEvent();
const dereaseEvent = createEvent();

sample({
  clock: increaseEvent,
  source: $counter,
  // filter
  fn: (source) => source + 1,
  target: $counter,
});

export const CounterPage = () => {
  const counter = useUnit($counter);
  return (
    <>
      <div>{counter}</div>
      <button onClick={() => increaseEvent()}>more</button>
      <button>less</button>
    </>
  );
};
