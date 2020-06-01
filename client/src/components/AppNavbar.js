import React from 'react';
import '../styles/Navbar.css';

const AppNavbar = () => {
  return (
    <>
      <header>
        <div class="brand1">
          <h3>
            <a href="/">Covid-19 India</a>
          </h3>
        </div>
        <div class="brand2">
          <div class="brand2_block">
            <input type="checkbox" class="toggler"></input>
            <div class="hamburger">
              <div></div>
            </div>
            <div class="brand3">
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
