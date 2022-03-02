import { NavLink } from "react-router-dom";

const ContactItem = (props) => {
  return (
    <tr key={props.item.id}>
      <td>{props.item.name}</td>
      <td>{props.item.number}</td>
      <td>
        <NavLink to={`contact-detail/${props.item.firebaseContactId}`}>
          Detail
        </NavLink>
      </td>
      <td>
        <NavLink to={`create-contact/${props.item.firebaseContactId}`}>
          Edit
        </NavLink>
      </td>
    </tr>
  );
};

export default ContactItem;
