import React, { Fragment, Component } from "react";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos"
export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUsersRepo(this.props.match.params.login);
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      company,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          {" "}
          Back to search
        </Link>
        Hireable : {""}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt=''
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                {" "}
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            
            <a href={html_url} className='my-1 btn btn-dark'>
              Github
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong>
                    {login}
                  </Fragment>
                )}
              </li>

              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {company}
                  </Fragment>
                )}
              </li>

              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gist: {public_gists}</div>
        </div>
        <Repos repos={repos}/>
      </Fragment>
      // <div>
      //   <h3>{name}</h3>
      //   <img src={avatar_url} alt=""/>
      // </div>
    );
  }
}

export default User;
