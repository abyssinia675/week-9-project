import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} Volunteer Dashboard.</p>
        <p className="footer-text">
          Built with React and the Volunteer Connector API.
        </p>
      </div>
    </footer>
  );
}
