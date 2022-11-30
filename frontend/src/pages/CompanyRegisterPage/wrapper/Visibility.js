import styled from "styled-components";

const Wrapper = styled.div`
  height: 47vh;
  & > .radios {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  & > p {
    vertical-align: bottom;
    padding: 0;
    margin-top: 10px;
    font-size: 1.1rem;

    & > input {
      padding: 0;
      margin: 0;
      vertical-align: bottom;
      border: none;
      border-bottom: 1px solid #c4def4;
      align-self: flex-end;
      justify-self: end;

      &:focus {
        outline: none;
        border-bottom: 1px solid #539fdf;
      }
    }
  }
`;
export default Wrapper;

