import { useEffect, useReducer } from "react";

let initialValue = {
  value: 0,
  isRunning: false,
};

const firstReducer = (state, action) => {
  if (action.type === "START") {
    return { isRunning: true, value: state.value + 1 };
  }

  if (action.type === "STOP") {
    return { value: state.value, isRunning: false };
  }

  if (action.type === "RESET") {
    return { isRunning: false, value: 0 };
  }
};

const useInput = () => {
  const [state, setDispatch] = useReducer(firstReducer, initialValue);

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }

    let interval = setInterval(() => setDispatch({ type: "START" }), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const valueStartHandler = () => {
    setDispatch({
      type: "START",
      value: state.value,
    });
  };

  const valueStopHandler = () => {
    setDispatch({ type: "STOP", isRunning: true});
  };

  const valueResetHandler = () => {
    setDispatch({ type: "RESET", value: 0});
  };

  // const updatedStart = !state.isRunning && !state.totalStop && state.value === 0;
  // const fullStop = !state.totalStop && !state.isRunning;

  return {
    value: state.value,
    valueStartHandler,
    valueStopHandler,
    valueResetHandler,
  };
};
export default useInput;

/*

function EffectsDemoTwoStatesWithDependeny() {
  const [title, setTitle] = useState("default title");
  const titleRef = useRef();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    document.title = title;
  }, [title]);
  console.log("render");
  const handleClick = () => setTitle(titleRef.current.value);
  const handleCheckboxChange = () => setDarkMode((prev) => !prev);
  return (
    <div className={darkMode ? "view dark-mode" : "view"}>
      <label htmlFor="darkMode">dark mode</label>
      <input
        name="darkMode"
        type="checkbox"
        checked={darkMode}
        onChange={handleCheckboxChange}
      />
      <input ref={titleRef} />
      <button onClick={handleClick}>change title</button>
    </div>
  );
}*/
