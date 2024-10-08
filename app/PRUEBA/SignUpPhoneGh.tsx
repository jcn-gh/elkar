import React from "react";
import './SignUpPhoneGh.css';

const Logo = () => (
  <div className="logoBox">
    <a className="logoLink" href="http://localhost:3000/(home)/index">
      <img
        className="logoImage"
        alt="Elkarchat"
        crossOrigin="anonymous"
        src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJqOWZKTTFZTFBQWmhrYXB1UEVTcVVCNUg3SiJ9?width=400"
        srcSet="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJqOWZKTTFZTFBQWmhrYXB1UEVTcVVCNUg3SiJ9?width=200 1x,https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJqOWZKTTFZTFBQWmhrYXB1UEVTcVVCNUg3SiJ9?width=400 2x"
        loading="lazy"
      />
    </a>
  </div>
);

const Header = () => (
  <header className="header">
    <h1 className="headerTitle">Create your account</h1>
    <p className="headerSubtitle">to continue to Elkarchat</p>
  </header>
);

const SocialButton = () => (
  <div className="socialButtons">
    <button className="socialButton githubButton">
      <span className="iconWrapper">
        <img
          className="socialIcon"
          alt="Sign in with GitHub"
          crossOrigin="anonymous"
          src="https://img.clerk.com/static/github.svg?width=160"
          srcSet="https://img.clerk.com/static/github.svg?width=80 1x,https://img.clerk.com/static/github.svg?width=160 2x"
          loading="lazy"
        />
      </span>
      <div className="buttonTextWrapper">
        <span className="buttonText">Continue with GitHub</span>
      </div>
      <svg className="buttonArrow" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.3 10h13.4m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </button>
  </div>
);

const Divider = () => (
  <div className="dividerRow">
    <div className="dividerLine" />
    <p className="dividerText">or</p>
    <div className="dividerLine" />
  </div>
);

const PhoneNumberInput = () => (
  <div className="formFieldRow phoneNumberRow">
    <div className="formField phoneNumberField">
      <div className="formFieldLabelRow">
        <label className="formFieldLabel" htmlFor="phoneNumber-field">
          Phone number
        </label>
      </div>
      <div className="phoneInputBox">
        <button className="selectButton countryCodeButton">
          <div className="countryFlag">🇪🇸</div>
          <p className="countryCode">+34</p>
          <svg className="selectButtonIcon" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
        <input
          id="phoneNumber-field"
          className="formFieldInput phoneNumberInput"
          name="phoneNumber"
          type="tel"
          maxLength={25}
          required
          aria-invalid="false"
          aria-required="true"
        />
      </div>
    </div>
  </div>
);

const Form = () => (
  <form className="form">
    <button className="phone-number-button" title="Phone number" type="submit" />
    <PhoneNumberInput />
    <div className="captchaWrapper">
      <div id="clerk-captcha" className="captcha" />
      <button className="formButtonPrimary">Continue</button>
    </div>
  </form>
);

const Footer = () => (
  <footer className="footer">
    <div className="footerAction">
      <span className="footerActionText">Have an account?</span>
      <a className="footerActionLink" href="http://localhost:3000/sign-in#/?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F">
        Sign in
      </a>
    </div>
    <div className="footerPages" />
  </footer>
);

export default function Component() {
  return (
    <div id="__next">
      <div className="rootBox">
        <div className="card">
          <Logo />
          <Header />
          <main className="main">
            <SocialButton />
            <Divider />
            <Form />
          </main>
          <Footer />
          <div className="securedBy">
            <p className="securedByText">Secured by</p>
            <a className="clerkLogoLink" aria-label="Clerk logo" href="https://www.clerk.com/?utm_source=clerk&utm_medium=components" rel="noopener" target="_blank">
              <svg className="clerkLogo" fill="none" viewBox="0 0 77 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M35.16 16.75a4.2 4.2 0 0 1-3.05 1.28 3.54 3.54 0 0 1-2.6-1.04 3.73 3.73 0 0 1-.99-2.66c0-2.2 1.43-3.7 3.59-3.7A3.92 3.92 0 0 1 35.14 12L37 10.36a6.6 6.6 0 0 0-5.05-2.24c-3.65 0-6.24 2.52-6.24 6.23a6.2 6.2 0 0 0 1.73 4.46 6.14 6.14 0 0 0 4.41 1.73 6.9 6.9 0 0 0 5.21-2.12l-1.9-1.68Zm3.58-13.32h2.76v16.92h-2.76V3.43Zm16.1 11.86c.04-.37.06-.74.07-1.11 0-3.5-2.3-6.05-5.85-6.05-1.69 0-3.16.63-4.22 1.72a6.32 6.32 0 0 0-1.66 4.48c0 3.75 2.65 6.22 6.15 6.22a6.2 6.2 0 0 0 5.06-2.25l-1.8-1.6-.1-.08c-.62.77-1.6 1.41-3.01 1.41a3.32 3.32 0 0 1-3.43-2.74h8.79Zm-8.74-2.22a3.36 3.36 0 0 1 .74-1.45c.57-.65 1.4-1 2.37-1 1.58 0 2.57 1 2.9 2.45H46.1Zm17.37-4.98v3.1a13.1 13.1 0 0 0-.83-.06c-2.1 0-3.29 1.5-3.29 3.48v5.74H56.6V8.27h2.76v1.83h.03c.93-1.29 2.3-2 3.75-2h.34Zm6.44 7.2-2 2.22v2.84h-2.76V3.43h2.76V13.8l4.94-5.5h3.28l-4.34 4.86 4.42 7.18H73.1l-3.14-5.06h-.05ZM19.12 3.16l-2.88 2.88a.57.57 0 0 1-.7.09 6.87 6.87 0 0 0-9.17 1.95 6.87 6.87 0 0 0-.24 7.46.57.57 0 0 1-.09.7l-2.88 2.88a.57.57 0 0 1-.86-.06A12 12 0 0 1 19.05 2.3a.57.57 0 0 1 .06.86Z"
                  fill="currentColor"
                />
                <path
                  d="m19.12 20.84-2.88-2.88a.57.57 0 0 0-.7-.09 6.87 6.87 0 0 1-7.08 0 .57.57 0 0 0-.7.09l-2.89 2.88a.57.57 0 0 0 .07.86 12 12 0 0 0 14.12 0 .57.57 0 0 0 .06-.86ZM12 15.43a3.43 3.43 0 1 0 0-6.86 3.43 3.43 0 0 0 0 6.86Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}