import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;

  & > label {
    color: var(--l-p-color);
  }

  & > input {
    background-color: transparent;
    width: 300px;
    outline: 0.1px solid #d5dfe8;
    border: none;
    font-family: var(--gotham-font);
    height: 40px;
    padding-left: 5px;
  }

  
`;
export default Wrapper;
