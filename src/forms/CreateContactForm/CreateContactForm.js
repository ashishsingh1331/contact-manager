import { useParams } from "react-router-dom";
import { useRef } from "react";
import { createContact } from "../../slice/contactSlice";
import { useDispatch } from "react-redux";

const CreateContactForm = () => {
  let { id } = useParams();
  const contactNameRef = useRef();
  const contactNumberRef = useRef();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    const contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: contactNameRef.current.value,
      number: contactNumberRef.current.value,
    };
    dispatch(createContact(contact));
    e.preventDefault();
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
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default CreateContactForm;
