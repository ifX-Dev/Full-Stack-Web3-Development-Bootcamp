import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header({ user, onLogout }) {
  return (
    <header>
      <h1>
        <HighlightIcon />
        MyKeeper
      </h1>

      {user && (
        <div className="user-info">
          {user.picture && <img src={user.picture} alt={user.name} />}
          <span>{user.name}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
