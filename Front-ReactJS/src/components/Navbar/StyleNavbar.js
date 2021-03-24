import styled from 'styled-components';
import color from '../../color';

const StyledNavbar = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color : ${color.orange} !important;
    padding: 0 1rem;
    & h2 {
        color : ${color.white} !important;
        text-align : center;
    }
    & img{
        width : 5em;
    }
    & .nav-menu.active{
        height: 30em;
        width: 20em;
    }
    ul {
        margin: 0px;
        padding: 0px;
    }
    & .menu-bars {
        font-size: 1.3rem;
    }
    & .navMenu {
        background-color : ${color.white} !important;
        width : 100px;
        height : 100px;
        position: fixed;
    }
    & .navbar {
        background-color: ${color.orange} !important;
        height: 30px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    & .menu-bars {
        margin-left: 2rem;
        font-size: 2rem;
        background: none;
    }

    & .nav-menu {
        background-color: ${color.white};
        width: 200px;
        height: 41vh;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        right: -100%;
        transition: 850ms;
    }

    & .nav-menu.active {
        right: 0;
        transition: 350ms;
    }

    & .nav-text {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 8px 0px 8px 8px;
        list-style: none;
        height: 60px;
        margin: 0px;
    }

    & .nav-text a {
        text-decoration: none;
        color: ${color.black};
        font-size: 18px;
        width: 95%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 10px;
        border-radius: 4px;
    }

    & .nav-text span {
        font-size: 12px;
    }
      
    & .nav-text a:hover {
        background-color: #1a83ff;
    }
      
    & .nav-menu-items {
        width: 100%;
    }
      
    & .navbar-toggle {
        background-color: ${color.orange};
        width: 150%;
        height: 50px;
        display: flex;
        justify-content: start;
        align-items: center;
    }
      
    span {
        margin-left: 16px;
    }
`;

export default StyledNavbar;
