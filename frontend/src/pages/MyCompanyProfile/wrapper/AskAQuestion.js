import styled from "styled-components";

const Wrapper = styled.div`
padding-top: 30px;
  h3 {
    margin-block: 20px;
  }
  .comment-form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > input {
      height: 50px;
      padding-inline: 10px;
      background-color: #f4f6fa;
      border: none;

      &:focus {
        border: 1px solid #f4f6fa;
        outline: 1px solid #f4f6fa;
      }
    }

    & > button {
      justify-self: flex-end;
      width: max-content;
      margin-left: auto;
      width: 200px;
      padding-block: 6px;
      border: none;
      color: white;
      background-color: #4f8bc3;
    }
  }

  & > .select-input {
    & > #options {
      background-color: transparent;
      border: none;
      text-transform: capitalize;
      font-size: 1.1rem;
      color: #6c757d;
      cursor: pointer;
      &:hover{
        color: black;
      }

      &:focus {
        border: none;
        outline: none;
      }
    }
  }
`;
export default Wrapper;
