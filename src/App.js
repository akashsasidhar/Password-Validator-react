import "./App.css";
import { useState } from "react";
import { passwordValidator } from "./helper/validator";
import axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [newValue, setNewvalue] = useState([]);
  let nextId = 0;
  let errorCount;
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const sendData = async (data) => {
    try {
      await axios.post("http://localhost:5003/save", data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const listvalues = newValue.map((element, index) => (
    <>
      <li key={element.nextId}>
        The password:&nbsp;{element.password}&nbsp; and Error Count:&nbsp;
        {element.errorCount}&nbsp;{" "}
      </li>
    </>
  ));
  const customCentered = {
    alignItems: "center",
    minHeight: "50vh",
    margin: "0 auto",
    maxWidth: "50%",
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    errorCount = passwordValidator(password);
    const data = {
      password: password,
      errorCount: errorCount,
    };
    setNewvalue([
      ...newValue,
      { password: password, errorCount: errorCount, id: nextId++ },
    ]);
    sendData(data);
    setPassword("");
  };
  return (
    <div className="container ">
      <div className=" row d-flex" style={customCentered}>
        <div className="col-auto">
          <h1>Enter your password</h1>
          <form onSubmit={onSubmit}>
            <div className="row mb-3">
              <div className="col">
                <input
                  name="password"
                  onChange={handleChange}
                  value={password}
                  required={true}
                />
              </div>
            </div>

            <div className="form-group g-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <ul>{listvalues}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
