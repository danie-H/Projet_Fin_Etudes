import styled from 'styled-components';

const StyledButton = styled.button`
    color: ${props => props.color};
    background: ${props => props.background};
    font-size: 1em;
    border-radius:${props => props.radius ? "0.5em" : "none"};
    box-shadow : 1px 1px 2px 1px;
    border: none;
    width: ${props => props.width};
    height: 2.5em;
    margin: 5px;
    &:hover {
        box-shadow : none;
    };

`;


export default StyledButton;
