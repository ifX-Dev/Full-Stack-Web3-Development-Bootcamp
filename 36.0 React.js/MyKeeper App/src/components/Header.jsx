import { useContext } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { AppContext } from "../contexts/AppContext";

function Header() {
  const { user, handleLogout } = useContext(AppContext);

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
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
