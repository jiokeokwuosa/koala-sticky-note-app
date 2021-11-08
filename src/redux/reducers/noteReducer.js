import {
  INPUT_CHANGE,
  ADD_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
  CLEAR_NOTES_SUCCESS
} from "../actions/types";

const initialState = {
  noteList: []
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        noteList: [...state.noteList, action.payload]
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        noteList: state.noteList.filter((note, index) => index !== action.payload)
      };
    case UPDATE_NOTE_SUCCESS:
      let allNotes = state.noteList;
      allNotes[action.payload.itemIndex] = action.payload.newData
      state.noteList = [...allNotes]
      return {
        ...state,
      };
    case CLEAR_NOTES_SUCCESS:
      return {
        ...state,
        noteList: []
      };
    default:
      return state;
  }
};
export default noteReducer;
