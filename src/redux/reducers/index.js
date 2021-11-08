import { combineReducers } from "redux";
import noteReducer from "./noteReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  note: noteReducer,
  error: errorReducer,
});
