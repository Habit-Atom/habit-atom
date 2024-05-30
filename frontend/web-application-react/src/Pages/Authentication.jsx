import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Components from "../Components/AuthenticationComponents";
import "../Css/Authentication.css"
import { request, setAuthHeader } from "../Helpers/axios_helper";

export const Authentication = () => {
  const [signIn, toggle] = React.useState(true);

  const navigate = useNavigate();

  function setMessage(elementId, message, isSuccess) {
    var messageElement = document.getElementById(elementId);
    messageElement.innerHTML = message;
    if (isSuccess) {
        messageElement.style.color = "#0BC682";
    } else {
        messageElement.style.color = "rgb(219, 5, 5)";
    }
}

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    request(
      "POST",
      "/api/v1/signup",
      {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      }).then(
        (response) => {
          setMessage("signup-message", "Successfully signed up</br>Sign in to use the App", true)
          document.getElementById("signup-username").value  = "";
          document.getElementById("signup-email").value  = "";
          document.getElementById("signup-password").value  = "";
        }).catch(
          (error) => {
            setMessage("signup-message", error.response.data, false)
          }
        );
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    request(
      "POST",
      "/api/v1/signin",
      {
        email: formData.get('email'),
        password: formData.get('password'),
      }).then(
        (response) => {
          if (response.status === 200) {
            setAuthHeader(response.data.token);
            navigate('/');
          }
        }).catch(
          (error) => {
            if (error.response.status === 403) {
              setMessage("signin-message", "Invalid email or password", false)
            } else {
              console.log(error)
            }
          }
        );
  };

  return (
    <div id="auth-container">
      <Components.Container>
        <Components.SignUpContainer $signingIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Create Account</Components.Title>
            <div id='signup-message'></div>
            <Components.Input type="text" placeholder="Username" name="username" id='signup-username'/>
            <Components.Input type="email" placeholder="Email" name="email"  id='signup-email'/>
            <Components.Input type="password" placeholder="Password" name="password"  id='signup-password'/>
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer $signingIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
            <div id='signin-message'></div>
            <Components.Input type="email" placeholder="Email" name="email" />
            <Components.Input type="password" placeholder="Password" name="password" />
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer $signingIn={signIn}>
          <Components.Overlay $signingIn={signIn}>
            <Components.LeftOverlayPanel $signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with<br />your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel $signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}