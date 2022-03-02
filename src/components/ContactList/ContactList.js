import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";

import { contactActions, fetchContacts } from "../../slice/contactSlice";
import { Outlet } from "react-router-dom";
import { uiActions } from "../../slice/ui-slice";
const ContactList = (props) => {
  const contacts = useSelector((state) => state.contact.transformedContact);
  const dispatch = useDispatch();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    dispatch(fetchContacts());
    // Clean up function this is useful when we want to perform functionality at timem of component unmounting
    return () => {
      source.cancel();
      dispatch(uiActions.hideNotification());
      dispatch(contactActions.emptyContacts());
    };
  }, [dispatch]);

  const sortContactsHandler = () => {
    dispatch(contactActions.sortContacts());
  };

  return (
    <>
      {contacts && (
        <table className="table">
          <thead>
            <tr>
              <th onClick={sortContactsHandler}>name</th>
              <th>number</th>
              <th>detail</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => {
              return <ContactItem key={item.id} item={item} />;
            })}
          </tbody>
        </table>
      )}
      {!contacts && <p>No contacts</p>}
      <Outlet />
    </>
  );
};

export default ContactList;
