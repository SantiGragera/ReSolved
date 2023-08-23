import React, { useState } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='nbar'>
      <h1 className='title'>Re$olved</h1>
      <div className='subt'>
        <NavLink to={'/'} className={ ({isActive}) => isActive ? 'links active-link' : 'links' }>
          GASTOS
        </NavLink>
        <NavLink to={'/ingresos'} className={ ({isActive}) => isActive ? 'links active-link' : 'links' }>
          INGRESOS
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar