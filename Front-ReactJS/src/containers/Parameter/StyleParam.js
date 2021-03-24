import styled from 'styled-components';
import color from '../../color';

const StyleParam = styled.div`
    display: flex;
    width: 40%;
    margin: 0 auto;
    padding-left : 70px;
    padding-right : 70px;
    padding-top : 50px;

    & .form-control{
        font-size: 13px;
    }

    & #nomGroupe{
        width: 85%;
    }

    & .formGroup {
        display: flex
    }

    & .boutonGroup {
        margin-top: -5px
    }

    p {
        font-size: 13px;
    }

    form {
        padding: 20px
    }

    & .param1 {
        width: 100%;
        background-color: ${color.whiteBlue} !important;
        border-radius: 0.5em;
        box-shadow : 1px 1px 2px 1px;
        margin-top: 20px;
    }
`;

export default StyleParam;
