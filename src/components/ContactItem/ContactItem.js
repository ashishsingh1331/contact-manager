const ContactItem = (props) => {
  return (
    <tr key={props.item.id}>
      <td>{props.item.name}</td>
      <td>{props.item.number}</td>
    </tr>
  );
};

export default ContactItem;
