import styled from 'styled-components';
import color from '../../color';

const StyleModal = styled.div`
    & .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1040;
    background-color: rgba(0, 0, 0, 0.5);
  }

  & .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    display: flex;
    align-items: center;
  }

  & .modale {
    z-index: 1200;
    background: ${color.blueDark} !important;
    color : ${color.white};
    position: relative;
    margin: auto;
    border-radius: 5px;
    max-width: 500px;
    width: 80%;
    padding: 1rem;
  }

  & .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .modal-close-button {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${color.white};
    cursor: pointer;
    border: none;
    background: transparent;
  }
`;

export default StyleModal;