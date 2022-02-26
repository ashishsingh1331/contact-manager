import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateContactForm from "./forms/CreateContactForm/CreateContactForm";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Notification from "./components/Notification/Notification";
import { useSelector } from "react-redux";

function App() {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <>
      <div className="container">
        <Notification
          status={notification.status}
          message={notification.message}
        ></Notification>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-contact" element={<CreateContactForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
