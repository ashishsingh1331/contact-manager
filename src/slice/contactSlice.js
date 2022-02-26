import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

import axios from "axios";
const initialState = {
  contacts: false,
};
const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {
    addContact() {},
    replaceContacts(state, payload) {
      state.contacts = payload.payload;
    },
  },
});

// Createed action thunk
export const fetchContacts = () => {
  return async (dispatch) => {
    // setIsLoading(true);
    dispatch(
      uiActions.showNotifiction({
        status: "info",
        message: "Fetching Contacts",
      })
    );

    const sendRequest = async () => {
      const response = await axios.get(
        "https://contact-54021-default-rtdb.firebaseio.com/contacts.json"
      );

      if (response.statusText !== "OK") {
        throw new Error("Fetching contacts data failed");
      }

      const responseData = await response.data;
      dispatch(contactActions.replaceContacts(responseData));
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotifiction({
          status: "success",
          message: "Contacts Fetched successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotifiction({
          status: "danger",
          message: error.message + " while fetching contacts",
        })
      );
    }
  };
};

export const contactActions = contactSlice.actions;
export default contactSlice.reducer;
