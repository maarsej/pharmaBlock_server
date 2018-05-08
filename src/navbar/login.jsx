import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  componentWillMount() {

  }
  render() {
    return (
      <div>
        <div className="signupSection">
          <div className="info" />
          <form action="#" method="POST" class="signupForm" name="signupform">
            <h2>Login</h2>
            <ul className="noBullet">
              <li>
                <label for="email" />
                <input
                  type="email"
                  class="inputFields"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value=""
                  required
                />
              </li>
              <li>
                <label for="password" />
                <input
                  type="password"
                  class="inputFields"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value=""
                  oninput="return passwordValidation(this.value)"
                  required
                />
              </li>

              <li id="center-btn">
                <input
                  type="submit"
                  id="join-btn"
                  name="submit"
                  alt="Join"
                  value="Submit"
                />
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;