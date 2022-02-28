import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchContactById } from "../../slice/contactSlice";

const ContactDetail = () => {
  const { id } = useParams();
  const [selectedContact, setSelectedContact] = useState("");
  const dispatch = useDispatch(id);

  useEffect(() => {
    // console.log(dispatch(fetchContactById(id)));
    dispatch(fetchContactById(id)).then((data) => {
      setSelectedContact(data);
    });
  }, [id, dispatch]);

  return (
    <>
      <div>contact detail {selectedContact.name}</div>
    </>
  );
};
export default ContactDetail;
