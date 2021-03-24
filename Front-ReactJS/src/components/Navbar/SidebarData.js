import React from 'react'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle, faCog, faUsersCog } from "@fortawesome/free-solid-svg-icons";

export const SidebarData=[
    {
        title:'Profil',
        path: '/agenda',
        icon: <FontAwesomeIcon icon={faUserCircle} />,
        cName: 'nav-text'
    },
    {
        title:'Promotion',
        path: '/agenda',
        icon: <FontAwesomeIcon icon={faUsersCog} />,
        cName: 'nav-text'
    },
    {
        title:'Parametre',
        path: '/parameter',
        icon: <FontAwesomeIcon icon={faCog} />,
        cName: 'nav-text'
    },
    {
        title:'Deconnexion',
        path: '/',
        icon: <FontAwesomeIcon icon={faSignOutAlt} />,
        cName: 'nav-text'
    }
]