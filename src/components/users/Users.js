import React, {useContext} from "react";
import GithubContext from "../../context/github/githubContext"
import UsersItem from "./UsersItem";
import Spinner from "../layouts/Spinner";


const Users = () => {

  const githubContext= useContext(GithubContext)

  const {loading, users}= githubContext
  if (loading) {
    return <Spinner/>;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UsersItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};



const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;
