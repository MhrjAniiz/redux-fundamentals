import store from "./store/store";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";

const unsuscribe = store.subscribe(() => {
  console.log("store chnaged", store.getState());
});
store.dispatch(bugAdded("bug1"));

store.dispatch(bugResolved(1));
store.dispatch(bugRemoved(1));
console.log(store.getState());
