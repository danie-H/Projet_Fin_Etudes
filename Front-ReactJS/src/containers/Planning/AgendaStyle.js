import styled from 'styled-components';
import color from '../../color';

const AgendaStyle = styled.div`
    display: flex;
    border-collapse: collapse;
    & #agenda {
        display: flex;
        flex-direction: flex-row;
    }
    & .fc-view * {
        color: ${color.blueDark} !important;
    }
    & .tabPlanning{
        background-color: ${color.whiteBlue} !important;
        border-collapse: collapse;
        margin-top: 10em;
        display: flex;
        margin: 0 auto;
        width: 60%;
    }
    & .thWeek, .trTime, .thWeekTBody, .tdGroup {
        text-align: center;
        border: 1px solid black;
        border-collapse: collapse;
    }
    & .tdValue {
        text-align: center;
        border: 1px solid ${color.whiteBlue};
        border-collapse: collapse;
    }
    & .thWeek {
        width: 300px;
    }
    & .trTime, .trDay{
        border-bottom: 1px solid black;
        margin: 0 auto;
        table-layout: fixed;
    }
    & .tdValue{
        /* border-bottom: 1px solid black; */
        width: fixed;
    }
    & .tdValue, .tdGroup {
        width: ${props => props.width}px;
        max-width: ${props => props.width}px;
    }
    & .tdColor {
        width: 100%;
        height: 100%;
        box-shadow : 1px 1px 2px 1px;
        display: block;
        &:hover {
            box-shadow : none;
        };
    }
    & span {
        margin-top: 20px;
    }
    & table {
        width: 100%;
        border-collapse: collapse;
        margin-left: 10px;
        margin-top: 50px;
    }
    
    & .table {
        width: 100%;
        border-collapse: collapse;
        margin-left: 10px;
        margin-top: 50px;
    }
    & tr {
        height: 30px;
    }
    & td {
        height: 5px;
    }
    & .trBody{
        border-top: 1px solid black;
    }
    & h2 {
        margin: 0;
        font-size: 16px;
    }

    & ul {
        margin: 0;
        padding: 0 0 0 1.5em;
    }

    & li {
        margin: 1.5em 0;
        padding: 0;
    }

    & b {
        margin-right: 3px; 
    }

    & .demo-app {
        display: flex;
        min-height: 100%;
        font-size: 14px;
        margin-top: 2em;
    }

    & .demo-app-main {
        flex-grow: 1;
        padding: 3em;
    }

    & .npButton {
        margin-left: 30px;
        margin-top: 60px;
        position: fixed;
        display: flex;
    }

    &.nextButton{
        background-color: red !important;
    }
    & .addGroupButton {
        margin-top: 100px;
        margin-left: 30px;
        position: fixed;
    }
    
`;

export default AgendaStyle;
