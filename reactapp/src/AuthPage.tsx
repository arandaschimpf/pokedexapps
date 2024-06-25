// AuthPage.js
import React from 'react';
import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';

function AuthPage() {
  return (
    <div>
      <h1>Authentication</h1>
      <RegisterComponent />
      <LoginComponent />
    </div>
  );
}

export default AuthPage;
