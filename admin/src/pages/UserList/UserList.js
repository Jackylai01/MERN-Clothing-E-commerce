import "./userList.css";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUsers } from "../../redux/apiCalls";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  console.log(users);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    window.confirm("確定要刪除?");
    deleteUsers(id, dispatch);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 200,
      renderCell: (params) => {
        return <div>{params.row._id}</div>;
      },
    },
    {
      field: "user",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },

    {
      field: "email",
      headerName: "Eemail",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action ",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        autoHeight
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default UserList;
