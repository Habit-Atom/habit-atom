import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Components from "../Components/AuthenticationComponents";
import "../Css/Authentication.css"
import { request, setAuthHeader } from "../Helpers/axios_helper";

export const Authentication = () => {
  const [signIn, toggle] = React.useState(true);

  const navigate = useNavigate();

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
          setAuthHeader("");
          navigate('/auth');
        }).catch(
          (error) => {
            console.log(error)
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
          setAuthHeader(response.data.token);
          navigate('/');
        }).catch(
          (error) => {
            console.log(error)
          }
        );
  };

  return (
    <div id="auth-container">
      <Components.Container>
        <Components.SignUpContainer $signingIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" placeholder="Username" name="username" />
            <Components.Input type="email" placeholder="Email" name="email" />
            <Components.Input type="password" placeholder="Password" name="password" />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer $signingIn={signIn}>
          <Components.Form  onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
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