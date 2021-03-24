import styled from 'styled-components';
import color from '../../color';

const Wrapper = styled.div`
    background-color : ${color.blueDark};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .loginBG {
        display : flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left : auto;
        margin-right : auto;
        margin-top : 15%;
    };
    & #loginCenter {
        text-align : center;
    };
    & input{
        margin : 5px;
        width : 20em;
        height: 3em;
        text-align : center;
    };
    & form{
        margin-top : 3em;
        margin-bottom : 1em;
    };
    & #img{
        width : 150px;
    }
`;

export default Wrapper;