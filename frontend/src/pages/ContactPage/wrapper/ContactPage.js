import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;

  display: flex;
  height: 91.5vh;
  width: 100%;

  .form-control:focus {
    border-color: #45cfda;
    box-shadow: 0 0 0 0.1rem hsl(240, 88%, 71%);
  }
  & > .right-container {
    & > iframe {
      margin-left: auto;
      width: 100%;
      height: 100%;
    }
  }

  & > .left-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: center;

    margin-top: 50px;
  }
`;
export default Wrapper;
