import { useParams } from "react-router-dom";

const ContactDetail = () => {
  let { id } = useParams();

  return (
    <>
      <div>contact detail</div>
    </>
  );
};
export default ContactDetail;
