import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateContactForm from "./forms/CreateContactForm/CreateContactForm";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Notification from "./components/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import ContactDetail from "./components/ContactDetail/ContactDetail";
import { ErrorBoundary } from "react-error-boundary";

function ErrorHandler({ error }) {
  return <Notification status="danger" message="Error" />;
}

function App() {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div className="container">
          <Notification
            status={notification.status}
            message={notification.message}
          ></Notification>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route
                path="contact-detail/:id"
                element={<ContactDetail />}
              ></Route>
            </Route>
            <Route path="/create-contact" element={<CreateContactForm />}>
              <Route path=":id" element={<CreateContactForm />} />
            </Route>
          </Routes>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default App;
