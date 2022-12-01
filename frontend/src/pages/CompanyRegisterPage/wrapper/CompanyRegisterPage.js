import styled from "styled-components";

const Wrapper = styled.div`
  padding-block: 100px;
  padding-bottom:120px;
  background-color: white;

  & > .form-section {
    & > .form-content {
      max-width: 600px;
      padding-inline: 2%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;

      & > label {
        margin-top: 25px;
        color: black;
      }

      & > .btn-addlink {
        width: max-content;
        border: none;
        margin-top: 10px;
        background-color: transparent;
        color: blue;
      }

      & > .d-none {
        display: none;
      }
    }
  }

  & > .tabs-container {
    max-width: 700px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 20px;

    & > .singletab {
      text-align: center;
      & > .tas {
        font-weight: bold;
        font-size: 1.2rem;
        cursor: pointer;
        border-bottom: 1.5px soild #f0381f;
        &.active {
          color: #f0381f;
        }
      }

      & > .line {
        height: 5px;

        &.active {
          border: none;
          background-color: #b4210c;
        }
      }
    }
  }
  & > .save {
    position: fixed;
    bottom: 0;
    padding-block: 10px;
    background-color: white;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
   
    & > button {
      background-color: #2dae87;
      color: white;
      font-weight: bold;
      border: none;
      height: 40px;
      width: 175px;
      transform: translateX(calc(100px + 7.5vw) );
    }
  }
`;
export default Wrapper;
