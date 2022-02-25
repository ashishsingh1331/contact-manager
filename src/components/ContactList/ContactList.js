import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactItem from "../ContactItem/ContactItem";
import { contactActions } from "../../slice/contactSlice";

const ContactList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    setIsLoading(true);
    axios
      .get("https://contact-54021-default-rtdb.firebaseio.com/contacts.json")
      .then((res) => {
        setIsLoading(false);
        if (res.statusText === "OK") {
          dispatch(contactActions.replaceContacts(res.data));
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("successfully aborted");
        }
      });

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      {contacts && (
        <table>
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
