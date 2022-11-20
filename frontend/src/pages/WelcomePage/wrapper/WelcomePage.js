import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  min-height: 100vh;
  padding-block: 20px;

  .welcome {
    border: 3px solid #d5dfe8;
    width: max-content;
    margin: 0 auto;
    padding: 2% 5%;

    .heading {
      font-weight: bold;
      font-size: 1.5rem;
      text-transform: capitalize;
      color: var(--l-color);
    }

    & > .btn-increase {
      border: none;
      background-color: #656565;
      color: white;
      font-weight: bold;
      border-radius: 25px;
      font-size: 13px;
      padding: 8px 10px;
      width: 200px;
    }

    & p {
      font-size: clamp(12px, 2.5vw, 16px);
      color: var(--l-p-color);
      margin-top: 5px;
    }

    .public {
      margin-top: 20px;
      & > .information {
        display: flex;
        gap: 15px;

        & > img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }

        & > .inputs {
          display: flex;
          flex-direction: column;

          & > #area {
            height: 100px;
            margin-bottom: 10px;
            outline: 0.1px solid #d5dfe8;
            border: none;
            padding: 2px;
          }
          & > input {
            padding: 2px;
            background-color: transparent;
            width: 300px;
            outline: 0.1px solid #d5dfe8;
            border: none;
            font-family: var(--gotham-font);
            height: 40px;
            padding-left: 5px;

            & + input {
              margin-top: 10px;
            }
          }

          & > .bio {
            height: 100px;
          }
        }
      }

      & > .btn-continue {
        margin-top: 10px;
        background-color: #17bc93;
        color: white;
        width: 150px;
        padding: 10px 10px;
        border-radius: 25px;
        border: none;
        font-weight: bold;
        font-size: 12px;
      }
    }
  }
`;
export default Wrapper;
