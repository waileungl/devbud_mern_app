import { useState } from 'react';

// This hook will manage all the state for what step we're on, render out the step, control the counter and make the buttons work
// Stesp will be an array of components.
export function useMultistepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function stay() {
    setCurrentStepIndex((i) => {
      return i;
    });
  }


  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    stay,
    next,
    back,
    setCurrentStepIndex,
  };
}
