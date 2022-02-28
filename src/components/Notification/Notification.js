const Notification = (props) => {
  const getClasses = () => {
    return props.status
      ? `alert-${props.status} alert d-block`
      : "alert alert-primary d-none";
  };

  return (
    <div className={getClasses()} role="alert">
      {props.message}
    </div>
  );
};

export default Notification;
