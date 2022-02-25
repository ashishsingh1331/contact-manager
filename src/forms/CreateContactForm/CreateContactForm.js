const CreateContactForm = () => {
  return (
      <form>
          <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name"/>
          </div>
          <div>
              <label htmlFor="number">Number</label>
              <input id="number" type="tel" name="number"/>
          </div>
          <div>
              <button type="submit">Submit</button>
          </div>
      </form>
  );
};
export default CreateContactForm;
