import styled from 'styled-components';
import color from '../../color';

const StyledNavbar = styled.div`
    & .bodySideBar {
        height: 100%auto;
        width: 160px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: ${color.blueDark};
        overflow-x: hidden;
        padding-top: 20px;
        margin-top: 80px;
    }

    & .bodySideBar a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 15px;
        color: ${color.whiteBlue};
        display: block;
    }
`;

export default StyledNavbar;
