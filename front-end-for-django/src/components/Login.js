import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      pwShowToggle: false,
      isWrongCred: false
    };
  }

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // axios stuff
  submitHandler = e => {
    const login = axios({
      url: "http://localhost:3000/graphql",
      method: "post",
      data: {
        query: `
          query personalnotes {
              title
              content
              url
            }
          `
      }
    }).then(result => {
      console.log(result.data);
    });

    e.preventDefault();

    login
      .then(response => {
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/notes");
      })
      .catch(err => {
        localStorage.removeItem("token");
        this.setState({ isWrongCred: true });
        this.setState({ password: "" });
      });
  };

  // Show password in plain text
  pwToggler() {
    const pwToggle = document.getElementById("pwInput");

    if (pwToggle.type === "password") {
      pwToggle.type = "text";
    } else {
      pwToggle.type = "password";
    }
  }

  render() {
    return (
      <div className="Login-body">
        <div className="Login-subBody">
          <h1>Please enter your username and password</h1>
          <form className="Login-form-body" onSubmit={this.submitHandler}>
            <div className="IDpassword-body">
              <p className="display">ID</p>
              <input
                className="input"
                name="username"
                value={this.state.username}
                onChange={this.inputChangeHandler}
                type="text"
              />
            </div>
            <div>
              <p className="display">Password</p>
              <input
                className="input"
                name="password"
                value={this.state.password}
                onChange={this.inputChangeHandler}
                type="password"
                id="pwInput"
              />
            </div>
            <div>
              <input type="checkbox" onClick={this.pwToggler} />
              Show Password
            </div>
            <br />
            <div>
              <button>Sign in</button>
            </div>
          </form>
          <div>
            <div>
              {this.state.isWrongCred ? (
                <h2 className="loginErrorMsg">
                  Your username/password was incorrect.
                </h2>
              ) : null}
            </div>

            <br />
            <div>
              Don't have an assigned ID?
              <br />
              use 'super' and 'testpassword' to see all the available notes.
              <br />
              <Link to="/register">
                <button>Request New ID</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
