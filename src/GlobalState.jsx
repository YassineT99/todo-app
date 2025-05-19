import React, { useEffect, useCallback, useState } from "react";

const initialGlobalState = {
  count: 0
};

// Create a Context for the (global) State
export const GlobalState = React.createContext();

export const GlobalStateProvider = function ({ children }) {
  const [state, setState] = useState(initialGlobalState ?? {});

  const setGlobalState = useCallback(
    (data = {}) => {
      const newState = { ...state };

      // Loop over the data items by key, only updating those which have changed
      Object.keys(data).forEach((key) => {
        newState[key] = data[key];
      });

      // Update the state with the new State
      setState(newState);
    },
    [state, setState]
  );

  useEffect(() => {
    GlobalState.set = setGlobalState;
  }, [setGlobalState]);

  return (
    // Pass the current value of GlobalState, based on this components' State, down
    <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
  );
};

// Create a shorthand Hook for using the GlobalState
export const useGlobalState = () => React.useContext(GlobalState);

// Expose the GlobalState object to the window (allowing GlobalState.set({ count: 'new' }) from anywhere in the code (even your console))
window.GlobalState = GlobalState;


// Example usage below

// Create an example component which both renders and modifies the GlobalState
function SomeComponent() {
  const { count } = useGlobalState();

  // Create a function which mutates GlobalState
  function incrementCount() {
    GlobalState.set({
      count: count + 1
    });
  }

  return <div onClick={incrementCount}>{count}</div>;
}

export default function App() {
  return (
    <GlobalStateProvider>
      <SomeComponent />
    </GlobalStateProvider>
  );
}
