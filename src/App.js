import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateContactForm from "./forms/CreateContactForm/CreateContactForm";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <div className="container">
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
