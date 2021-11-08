import {
  INPUT_CHANGE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  CLEAR_NOTES_SUCCESS,
  CLEAR_NOTES_FAILURE
} from "./types";

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    
  }
};

export const addNote = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_NOTE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADD_NOTE_FAILURE  
    });
  }
};

export const deleteNote = (noteIndex) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_NOTE_SUCCESS,
      payload: noteIndex
    });
  } catch (error) {
    dispatch({
      type: DELETE_NOTE_FAILURE 
    });
  }
};

export const updateNote = (newData, itemIndex) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_NOTE_SUCCESS,
      payload: {
        newData,
        itemIndex
      }
    });
  } catch (error) {
    dispatch({
      type: UPDATE_NOTE_FAILURE 
    });
  }
};

export const clearAllNotes = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_NOTES_SUCCESS      
    });
  } catch (error) {
    dispatch({
      type: CLEAR_NOTES_FAILURE
    });
  }
};