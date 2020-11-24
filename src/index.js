import store from "./store/store";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";

const unsuscribe = store.subscribe(() => {
  console.log("store chnaged", store.getState());
});
store.dispatch(bugAdded({ description: "bug1" }));

store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugRemoved({ id: 1 }));
console.log(store.getState());
