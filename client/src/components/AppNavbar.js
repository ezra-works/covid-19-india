import React from 'react';
import '../styles/Navbar.css';

const AppNavbar = () => {
  return (
    <>
      <header>
        <div className="brand1">
          <h3>
            <a href="/">Covid-19 India</a>
          </h3>
        </div>
        <div className="brand2">
          <div className="brand2_block">
            <input type="checkbox" className="toggler"></input>
            <div className="hamburger">
              <div></div>
            </div>
            <div className="brand3">
              <ul>
                <li>
                  <a href="https://github.com/ezra-moses/covid-19-india">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppNavbar;
