import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";

import { fetchContacts } from "../../slice/contactSlice";
import { Outlet } from "react-router-dom";
import { uiActions } from "../../slice/ui-slice";
const ContactList = (props) => {
  const contacts = useSelector((state) => state.contact.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    dispatch(fetchContacts());
    // Clean up function this is useful when we want to perform functionality at timem of component unmounting
    return () => {
      source.cancel();
      dispatch(uiActions.hideNotification());
    };
  }, [dispatch]);

  return (
    <>
      {contacts && (
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>number</th>
              <th>detail</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(contacts).map((val) => {
              const [id, item] = val;
              return <ContactItem id={id} key={id} item={item} />;
            })}
          </tbody>
        </table>
      )}
      <Outlet />
    </>
  );
};

export default ContactList;
