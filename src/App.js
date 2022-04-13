import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    phoneNo: "",
    dob: "",
    city: "",
    district: "",
    province: "",
  });

  const [tableValues, setTableValues] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const tblValues = JSON.parse(data);
      setTableValues(tblValues);
    }
  }, []);

  const onInputChange = function (event) {
    const field = event.target.name;
    const value = event.target.value;
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    if (
      formValues.username === "" ||
      formValues.email === "" ||
      formValues.phoneNo === "" ||
      formValues.dob === "" ||
      formValues.city === "" ||
      formValues.district === "" ||
      formValues.province === ""
    ) {
      alert("The required field is not filled");
    } else if (formValues.phoneNo.length !== 7) {
      alert("phone number should contain 7 digits.");
    } else {
      const tblValues = [...tableValues];

      /** checking if email already exist */
      const index = tblValues.findIndex((t) => t.email === formValues.email);
      if (index > -1) {
        tblValues[index] = formValues;
      } else {
        tblValues.push(formValues);
      }
      setTableValues(tblValues);
      setFormValues({
        username: "",
        email: "",
        phoneNo: "",
        dob: "",
        city: "",
        district: "",
        province: "",
      });

      /** saving to local storage for data persist */
      const data = localStorage.getItem("data");
      if (data) {
        localStorage.removeItem("data");
      }
      localStorage.setItem("data", JSON.stringify(tblValues));
    }
  };

  const handleOnEdit = (formValue) => {
    setFormValues(formValue);
  };

  const handleOnDelete = (email) => {
    const index = tableValues.findIndex((t) => t.email === email);
    if (index === -1) {
      console.log("something is wrong");
    } else {
      const tblValues = tableValues.filter((t) => t.email !== email);
      setTableValues(tblValues);
      localStorage.removeItem("data");
      localStorage.setItem("data", JSON.stringify(tblValues));
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Form</h1>
        <div className="ui form" />
        <div className="field">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="field">
          <label>Phone No.:</label>
          <input
            type="number"
            name="phoneNo"
            placeholder="PhoneNo"
            value={formValues.phoneNo}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="field">
          <label>DOB:</label>
          <input
            type="date"
            name="dob"
            placeholder="DOB"
            value={formValues.dob}
            onChange={onInputChange}
          />
        </div>
        <div className="field">
          <label>Address:</label>
          <ul>
            <li>
              {" "}
              City
              <br />
              <input
                type="text"
                name="city"
                placeholder="city"
                value={formValues.city}
                onChange={onInputChange}
              />
            </li>
            <br />
            <li>
              District
              <br />
              <input
                type="text"
                name="district"
                placeholder="district"
                value={formValues.district}
                onChange={onInputChange}
              />
            </li>{" "}
            <br />
            <li>
              Province
              <br />
              <input
                type="radio"
                id="p1"
                name="province"
                value="Province1"
                checked={formValues.province === "Province1"}
                onClick={onInputChange}
              />
              <label for="p1">1</label>
              <input
                type="radio"
                id="p2"
                name="province"
                value="Province2"
                checked={formValues.province === "Province2"}
                onClick={onInputChange}
              />
              <label for="p2">2</label>
              <input
                type="radio"
                id="p3"
                name="province"
                value="Province3"
                checked={formValues.province === "Province3"}
                onClick={onInputChange}
              />
              <label for="p3">3</label>
              <input
                type="radio"
                id="p4"
                name="province"
                value="Province4"
                checked={formValues.province === "Province4"}
                onClick={onInputChange}
              />
              <label for="p4">4</label>
              <input
                type="radio"
                id="p5"
                name="province"
                value="Province5"
                checked={formValues.province === "Province5"}
                onClick={onInputChange}
              />
              <label for="p3">5</label>
              <br />
              <input
                type="radio"
                id="p6"
                name="province"
                value="Province6"
                checked={formValues.province === "Province6"}
                onClick={onInputChange}
              />
              <label for="p6">6</label>
              <br />
              <input
                type="radio"
                id="p7"
                name="province"
                value="Province7"
                checked={formValues.province === "Province7"}
                onClick={onInputChange}
              />
              <label for="p7">7</label>
              <br />
            </li>
          </ul>
        </div>
        <input type="submit" value="Submit" />
      </form>

      {tableValues.length > 0 ? (
        <>
          <br />
          <hr></hr>

          <table>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

            {tableValues.map((t) => {
              return (
                <tr>
                  <th>{t.username}</th>
                  <th>{t.email}</th>
                  <th>{t.phoneNo}</th>
                  <th>{t.dob}</th>
                  <th>{t.district + ", " + t.city + ", " + t.province}</th>
                  <th>
                    <button
                      onClick={() => {
                        handleOnEdit(t);
                      }}
                    >
                      Edit
                    </button>
                    <br />
                    <button
                      onClick={() => {
                        handleOnDelete(t.email);
                      }}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </table>
        </>
      ) : null}
    </div>
  );
}

export default App;
