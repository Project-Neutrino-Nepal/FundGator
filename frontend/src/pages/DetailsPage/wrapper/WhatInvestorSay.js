import styled from "styled-components";

const Wrapper = styled.div`
padding-top: 30px;
  h2 {
    margin-block: 40px;
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

  .comments {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & > .comment {
      display: flex;
      gap: 10px;
      & > img {
        width: calc(70px + 2vw) ;
        height: calc(70px + 2vw);
        min-height: calc(70px + 2vw);
        min-width: calc(70px + 2vw);
        max-height: 120px;
        max-width: 120px;
        border-radius: 60px;
        object-fit: cover;
      }

      & > .info {
        & > span {
          font-weight: bold;
          text-transform: capitalize;
        }

        & > p {
          background-color: #f7f8fb;
          padding: 5px;
          border-radius: 7px;
        }
      }
    }
  }
`;
export default Wrapper