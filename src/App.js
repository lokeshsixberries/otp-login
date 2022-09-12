import React from "react";
import { Col, Row } from "reactstrap";
import firebase from "./firebase";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Image from "./static/test1.jpg";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isView: false,
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        this.setState({
          isView: true,
        });
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent");
      });
  };
  onSuccess = (res) => {
    console.log("success:", res);
    window.location.replace("/home");
  };
  onFailure = (err) => {
    console.log("failed:", err);
  };
  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        window.location.replace("/home");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...  
      });
  };
  render() {
    const clientId =
      "156920536460-eqc26kq8ppcu4btrtr02la0orsc7p7jb.apps.googleusercontent.com";
    return (
      <>
        <Row>
          <Col>
            <>
              <h2 className="form-heading">Login Form</h2>
              <div className="main-div">
                {!this.state.isView && (
                  <form onSubmit={this.onSignInSubmit} className="number-form">
                    <div id="sign-in-button"></div>
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Mobile number"
                      required
                      onChange={this.handleChange}
                      className="number-input"
                    />
                    <button type="submit" className="submit-btn">
                      Send Otp
                    </button>
                  </form>
                )}

                {this.state.isView && (
                  <form onSubmit={this.onSubmitOTP} className="number-form">
                    <input
                      type="number"
                      name="otp"
                      placeholder="OTP Number"
                      required
                      onChange={this.handleChange}
                      className="number-input"
                    />
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </form>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={this.onSuccess}
                  onFailure={this.onFailure}
                  cookiePolicy={"single_host_origin"}
                  // isSignedIn={true}
                />
              </div>
            </>
          </Col>
          <Col className="hide-for-mobile ">
            <img src={Image} alt="image" className="side-image" />
          </Col>
        </Row>
      </>
    );
  }
}
export default App;
