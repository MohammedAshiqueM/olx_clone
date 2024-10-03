import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { auth } from '../../firebase/config';


function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log("User signed out");
      navigate("/login");
    }).catch((error) => {
      console.error("Sign out error: ", error);
    });
  };

  const handleSellClick = () => {
    navigate("/create");
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : "Login"}</span>
          <hr />
        </div>
        {user && (
          <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>
            Logout
          </span>
        )}
        <div className="sellMenu" onClick={handleSellClick} style={{ cursor: 'pointer' }}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
