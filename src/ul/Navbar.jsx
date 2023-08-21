import "./ul.css";

export const Navbar = ({handleMenu}) => {

  const handleClick = () => {
    handleMenu()
  }

  return (
    <>
      <div className="topbar">
        <div className="toggle" onClick={handleClick}>
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <div className="search">
          <label>
            <input type="text" placeholder="Search here" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>
        <div className="user">
          <img src="src/assets/profile/user.png" alt="Usuario" />
        </div>
      </div>
    </>
  );
};
