import "./widgetSm.css";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { userRequest } from "../../requestMethods";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch (err) {}
    };
    getUser();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                display
                  ? user.img
                  : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
          </li>
        ))}
        <button className="widgetSmButton" onClick={() => setDisplay(!display)}>
          <VisibilityIcon className="widgetSmIcon" />
          Display
        </button>
      </ul>
    </div>
  );
};

export default WidgetSm;
