// CookieConsent.js
import React from 'react';
import './CookieConsent.css';

function CookieConsent({ onAccept, onReject }) {
  return (
    <div className="cookie-consent">
      <p>This website uses cookies to ensure you get the best experience on our website.</p>
      <div className="cookie-buttons">
        <button onClick={onAccept}>Accept</button>
        <button onClick={onReject}>Reject</button>
      </div>
    </div>
  );
}

export default CookieConsent;
