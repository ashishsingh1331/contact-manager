import axios from "axios";
import React, { useEffect, useState } from "react";
const ContactList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState(false);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    setIsLoading(true);
    axios
      .get("https://contact-54021-default-rtdb.firebaseio.com/contacts.json")
      .then((res) => {
        setIsLoading(false);
        if (res.statusText === "OK") {
          setContacts(res.data);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("successfully aborted");
        } else {
          // handle error
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
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {!contacts && <p>Loading</p>}
    </>
  );
};

export default ContactList;
