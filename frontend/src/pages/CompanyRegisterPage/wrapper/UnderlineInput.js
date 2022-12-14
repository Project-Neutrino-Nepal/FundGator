import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #c4def4;

  gap: 5px;
  align-items: center;

  & > label {
    color: black;
    font-weight: bold;
    font-size: 1.5rem;
    color: #475260;
  }

  &.active {
    border-bottom: 2px solid #539fdf;
  }

 

  & > input {
    border: none;
    height: 50px;
    background-color: transparent;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
`;
export default Wrapper;
