import "./user.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PublishIcon from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/apiCalls";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const User = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === userId)
  );

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = { ...inputs, img: downloadURL };
          updateUser(userId, user, dispatch);
        });
      }
    );

    window.alert("更新成功");
    navigate("/users");
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>

      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTItle">Account Details</span>

            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTil">annbeck99</span>
            </div>

            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTil">10.12.1997</span>
            </div>
            <span className="userShowTItle">Contact Details</span>

            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTil">+1 123 456 67</span>
            </div>

            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTil">{user.email}</span>
            </div>

            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTil">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <labe>Username</labe>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="annbeck99"
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <labe>Email</labe>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder="1233@gmail.com"
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <labe>Phone</labe>
                <input
                  type="text"
                  name="phone"
                  placeholder="+1 123 456 67m"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>

              <div className="userUpdateItem">
                <labe>Address</labe>
                <input
                  type="text"
                  name="address"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                {file && (
                  <img
                    className="userUpdateImg"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )}

                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="userUpdateButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
