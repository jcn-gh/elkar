import React from "react";
import './OTP_verification.css';

const InputField: React.FC<{ id: string }> = ({ id }) => (
  <div className="input-container">
    <input
      id={id}
      className="otp-input"
      autoComplete="on"
      maxLength={1}
      aria-label={`${id}-helptext`}
      aria-describedby={`${id}-helptext`}
      autoCapitalize="sentences"
      autoCorrect="on"
      dir="auto"
      inputMode="numeric"
      spellCheck
    />
  </div>
);

export default function Component() {
  return (
    <>
      <div className="main-container">
        <div className="content-container">
          <div className="header">
            <div className="title">Enter OTP</div>
            <div className="spacer" />
            <div className="subtitle">We have sent the OTP code to <span className="highlight">87******47</span></div>
          </div>
          <div className="otp-container">
            <InputField id="field-react-aria-1" />
            <div className="spacer-horizontal" />
            <InputField id="field-react-aria-2" />
            <div className="spacer-horizontal" />
            <InputField id="field-react-aria-3" />
            <div className="spacer-horizontal" />
            <InputField id="field-react-aria-4" />
            <div className="spacer-horizontal" />
            <InputField id="field-react-aria-5" />
            <div className="spacer-horizontal" />
            <InputField id="field-react-aria-6" />
          </div>
          <div className="feedback-container">
            <div className="feedback-text">Didn’t receive the OTP?{" "} <div className="resend-otp">RESEND OTP</div></div>
          </div>
          <div className="button-container">
            <div className="button">PROCEED</div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-text">Already have an account?</div>
          <div className="spacer-horizontal-small" />
          <div className="sign-in">Sign In</div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  margin: 0px;
  padding: 0px;
  width: 100%;
  min-height: 100%;
  scroll-behavior: smooth;
  height: calc(100% + env(safe-area-inset-top));
}

body {
  margin: 0px;
  padding: 0px;
  width: 100%;
  min-height: 100%;
  display: flex;
  overscroll-behavior-y: none;
  text-rendering: optimizelegibility;
  overflow: hidden;
  overflow-y: hidden;
  height: 100%;
}
`,
        }}
      />
    </>
  );
}