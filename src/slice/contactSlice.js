import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

import axios from "axios";
const initialState = {
  contacts: false,
  transformedContact: false,
};
const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {
    addContact() {},
    replaceContacts(state, payload) {
      if (payload.payload === null) {
        state.contacts = false;
        state.transformedContact = false;
        return;
      }
      state.contacts = payload.payload;
      state.transformedContact = Object.entries(payload.payload).map(
        ([id, contact]) => {
          contact["firebaseContactId"] = id;
          return contact;
        }
      );
    },
    sortContacts(state, payload) {
      state.transformedContact = state.transformedContact.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    },
    emptyContacts(state) {
      state.contacts = false;
      state.transformedContact = [];
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
export const createContact = (contact, navigate) => {
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
          message: "Contacts Created successfully",
        })
      );
      navigate("/");
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "danger",
          message: error.message + " while creating contacts",
        })
      );
    }
  };
};

// Created action thunk for fetching contacts
export const fetchContactById = (id) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "info",
        message: "Fetching Contacts",
      })
    );

    const sendRequest = async () => {
      const response = await axios.get(
        `https://contact-54021-default-rtdb.firebaseio.com/contacts/${id}.json`
      );

      if (response.statusText !== "OK") {
        throw new Error("Fetching contacts data failed");
      }

      const responseData = await response.data;
      return responseData;
    };

    try {
      const data = await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Contacts Fetched successfully",
        })
      );
      return data;
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
// Created action thunk for fetching contacts
export const updateContactById = (id, contact) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "info",
        message: "updating  Contact",
      })
    );

    const sendRequest = async () => {
      const response = await axios.put(
        `https://contact-54021-default-rtdb.firebaseio.com/contacts/${id}.json`,
        contact
      );

      if (response.statusText !== "OK") {
        throw new Error("Fetching contacts data failed");
      }

      const responseData = await response.data;
      return responseData;
    };

    try {
      const data = await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Contact updated successfully",
        })
      );
      return data;
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
