import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({userSearch, showAlert, showClearBtn, clearUser}) => {
  const [text, setText] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      showAlert("please write something", "light");
    } else {
      userSearch(text);
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

        {showClearBtn && (
          <button className='btn btn-block btn-light' onClick={clearUser}>
            CLEAR
          </button>
        )}
      </form>
    </div>
  );
};

Search.propTypes = {
  userSearch: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired
};

export default Search;
