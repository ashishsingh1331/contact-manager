import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { createContact, updateContactById } from "../../slice/contactSlice";
import { useDispatch } from "react-redux";
import { fetchContactById } from "../../slice/contactSlice";
import { useState } from "react";

const CreateContactForm = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const contactNameRef = useRef();
  const contactNumberRef = useRef();
  const dispatch = useDispatch();

  const [selectedContact, setSelectedContact] = useState({
    name: "",
    number: "",
  });

  // use Effect get called during initial render and after that
  // if dependency changes
  useEffect(() => {
    if (typeof id !== "undefined") {
      dispatch(fetchContactById(id)).then((data) => {
        setSelectedContact(data);
      });
    }
  }, [id, dispatch]);

  const onSubmitHandler = (e) => {
    if (typeof id === "undefined") {
      const contact = {
        name: contactNameRef.current.value,
        number: contactNumberRef.current.value,
      };
      dispatch(createContact(contact, navigate));
    }

    if (typeof id !== "undefined") {
      dispatch(updateContactById(id, selectedContact));
    }
    e.preventDefault();
  };

  const inputChangeHandler = (e) => {
    setSelectedContact({
      name: contactNameRef.current.value,
      number: contactNumberRef.current.value,
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="contactName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="contactName"
          aria-describedby="contactHelp"
          ref={contactNameRef}
          onChange={inputChangeHandler}
          value={selectedContact.name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">
          Contact number
        </label>
        <input
          type="number"
          className="form-control"
          id="number"
          aria-describedby="contactHelp"
          ref={contactNumberRef}
          value={selectedContact.number}
          onChange={inputChangeHandler}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default CreateContactForm;
