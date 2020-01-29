import React, { useState, useContext } from "react";
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'


const Search = () => {

  const githubContext= useContext(GithubContext)
  const alertContext = useContext(AlertContext)

  const [text, setText] = useState("");


  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("please write something", "light");
    } else {
      githubContext.userSearch(text);
      setText("");
    }
  };

  const onChange = e => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='search users'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='search'
          className='btn btn-dark btn-block'
        />

        {githubContext.users.length > 0 && (
          <button className='btn btn-block btn-light' onClick={githubContext.clearUser}>
            CLEAR
          </button>
        )}
      </form>
    </div>
  );
};


export default Search;
