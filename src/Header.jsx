import React from "react";

function Header({ onLogout }) {
  return (
    <div>
      Header
      <button type="button" className="button-logout" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Header;
