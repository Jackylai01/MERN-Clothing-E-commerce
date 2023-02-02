import "./newUser.css";
import { addUsers } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addUsers(inputs, dispatch);
    window.alert("註冊成功");
    navigate("/users");
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleClick}>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="jacky"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="1223@gmail.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="+1 2 335455 44"
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            placeholder="New  York | USA"
            name="address"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGEnder">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="Male">男生</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
            <label htmlFor="Female">女生</label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleChange}
            />
            <label htmlFor="Other">其他</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select
            name="active"
            id="active"
            className="newUserSelect"
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUser;
