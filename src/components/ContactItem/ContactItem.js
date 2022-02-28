import { NavLink } from "react-router-dom";

const ContactItem = (props) => {
  return (
    <tr key={props.id}>
      <td>{props.item.name}</td>
      <td>{props.item.number}</td>
      <td>
        <NavLink to={`contact-detail/${props.id}`}>Detail</NavLink>
      </td>
      <td>
        <NavLink to={`create-contact/${props.id}`}>Edit</NavLink>
      </td>
    </tr>
  );
};

export default ContactItem;
