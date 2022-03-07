import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers } from "../../context/userContext/ApiCalls";

export default function ProductList() {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    window.location.reload();
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return <div className="userListItem">{params.row.username}</div>;
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "isAdmin", headerName: "isAdmin", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
        
            <Link
              to={`/user/${params.row._id}`} state = {{user: params.row }}
            >
              <button className="userListEdit buttonEdit">View</button>
            </Link>
            <DeleteOutline
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
         <div className="userTitleContainer">
        <h1 className="userTitle">USERS</h1>
        <Link to="/newUser">
          <button className="productAddButton button">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
