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

    const fetchContacts = async () => {
      setIsLoading(true);
      const response = await axios.get(
        "https://contact-54021-default-rtdb.firebaseio.com/contacts.json"
      );

      if (response.statusText !=='OK' ) {
        throw new Error("Fetching contacts data failed");
      }

      const responseData = await response.data;
      setIsLoading(false);

      dispatch(contactActions.replaceContacts(responseData));
    };

    fetchContacts().catch((err) => {
      if (axios.isCancel(err)) {
        console.log("successfully aborted");
      }
    });
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
