import { createAction } from "@reduxjs/toolkit";

// Action Types
// const BUG_ADD = "BUG_ADD";
// const BUG_REMOVED = " BUG_REMOVED";
// const BUG_RESOLVED = "BUG_RESOLVED";

//Action creaters

//using redux toolkit
export const bugAdded = createAction("BUG_ADD");
export const bugRemoved = createAction("BUG_REMOVED");
export const bugResolved = createAction("BUG_RESOLVED");

//using normal method
/*export const bugAdded = (description) => ({
  type: BUG_ADD,
  payload: {
    description,
  },
});

export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: {
    id,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id,
  },
});
*/

//Reducer

let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);

    case bugResolved.type:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}
