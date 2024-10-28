import React from "react";

function Header({ onLogout }) {
  return (
    <header className="flex justify-end p-2 bg-white">
      <button type="button" className="bg-black text-white text-l font-medium rounded py-2 px-4" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;