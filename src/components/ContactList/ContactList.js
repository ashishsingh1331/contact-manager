import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import { contactActions } from "../../slice/contactSlice";
import { fetchContacts } from "../../slice/contactSlice";
const ContactList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector((state) => state.contact.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    dispatch(fetchContacts());
    // Clean up function this is useful when we want to perform functionality at timem of component unmounting
    return () => {
      source.cancel();
      dispatch(contactActions.replaceContacts(false));
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
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => {
              return <ContactItem key={item.id} item={item} />;
            })}
          </tbody>
        </table>
      )}
      {isLoading && !contacts && <p>Loading</p>}
    </>
  );
};

export default ContactList;
