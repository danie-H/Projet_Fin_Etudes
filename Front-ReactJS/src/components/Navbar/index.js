import StyledNavbar from './StyleNavbar';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars, faOutdent } from "@fortawesome/free-solid-svg-icons";

import logo from '../../images/logo_3il.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {SidebarData} from './SidebarData';

const Navbar = (props) => {
    const title= props;
    const [sidebar, setSidebar]= useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    
    return (
        <StyledNavbar>
            <div className="loginBG">
                <img src={logo} alt="logo-3IL" id="img"/>
            </div>
            <div>
                <h2 className="">{title.text}</h2>
            </div>

            <div className='navbar'>
                <div className="iconMenu">
                    <Link to ="#">
                        <FontAwesomeIcon icon={faBars} style={{ color: 'white' }} size="2x" onClick={showSidebar}/>
                    </Link>
                </div>
            </div>

            <nav className={sidebar ? 'nav-menu active':'nav-menu' }>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                        <FontAwesomeIcon icon={faOutdent} style={{ color: 'white' }} size="1.2x" onClick={showSidebar}/>
                        </Link>
                    </li>
                    {SidebarData.map((item,index)=>{
                        return(
                            <li key={index} className={item.cName}>
                                { item.title === 'Parametre' ? 
                                    <Link to ={item.path}>
                                        {item.icon}
                                        <span>
                                            {item.title}
                                        </span>
                                    </Link>
                                : <Link to ={item.path}>
                                    {item.icon}
                                    <span>
                                        {item.title}
                                    </span>
                                </Link>
                        }
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </StyledNavbar>
    );
};

export default Navbar;