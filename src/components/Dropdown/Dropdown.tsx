import { useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import { states } from "./USA_STATES";
import styles from "./Dropdown.module.css";

const Dropdown = () => {
  const [selectedState, setSelectedState] = useState<Record<string, boolean>>(
    () =>
      states.reduce(
        (obj, state) => ({ ...obj, [state.abbreviation]: false }),
        {}
      )
  );

  const numberOfSelectedStates =
    Object.values(selectedState).filter(Boolean).length;

  const [isDropdownDisplayed, handleDisplay, ref] = useOutsideClick();

  return (
    <fieldset className={styles.stateDropdown}>
      <button
        className={isDropdownDisplayed ? styles.isDropdownDisplayed : ""}
        onClick={handleDisplay}
      >
        {numberOfSelectedStates > 0
          ? `${numberOfSelectedStates} states selected`
          : "-- select your states--"}

        {isDropdownDisplayed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.caret}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.caret}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        )}
      </button>
      {isDropdownDisplayed && (
        <div
          ref={ref}
          onClick={(event) => event.stopPropagation()}
          className={styles.panel}
        >
          {states?.map((state) => (
            <fieldset
              key={state.abbreviation}
              className={`${
                selectedState[state.abbreviation] ? styles.selected : ""
              }`}
            >
              <input
                type="checkbox"
                id={`state-${state.name}`}
                checked={selectedState[state.abbreviation]}
                onChange={(e) =>
                  setSelectedState((prevState) => ({
                    ...prevState,
                    [state.abbreviation]: e.target.checked,
                  }))
                }
              />
              <label htmlFor={`state-${state.name}`}>{state.name}</label>
            </fieldset>
          ))}
        </div>
      )}
    </fieldset>
  );
};

export default Dropdown;
