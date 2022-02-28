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
      // Transformed object to array
      state.contacts = Object.entries(payload.payload).map((value) => {
        return value.pop(); // pop removed the last element and return it
      });
    },
  },
});

// Created action thunk for fetching contacts
export const fetchContacts = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
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
        uiActions.showNotification({
          status: "success",
          message: "Contacts Fetched successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "danger",
          message: error.message + " while fetching contacts",
        })
      );
    }
  };
};
// Created action thunk for creating contacts
export const createContact = (contact) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "info",
        message: "Creating Contacts",
      })
    );

    const sendRequest = async () => {
      const response = await axios.post(
        "https://contact-54021-default-rtdb.firebaseio.com/contacts.json",
        contact
      );

      if (response.statusText !== "OK") {
        throw new Error("Fetching contacts data failed");
      }

      // const responseData = await response.data;
      // dispatch(contactActions.replaceContacts(responseData));
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Contacts Fetched successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "danger",
          message: error.message + " while fetching contacts",
        })
      );
    }
  };
};

export const contactActions = contactSlice.actions;
export default contactSlice.reducer;
