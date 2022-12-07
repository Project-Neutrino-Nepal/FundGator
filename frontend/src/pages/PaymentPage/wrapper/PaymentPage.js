import styled from "styled-components";

const Wrapper = styled.div`
  padding-inline: 10%;
  padding-top: 2%;
  background-color: white;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5%;
  & > .left-side {
    & > .info {
      & > h4 {
        font-size: 27px;
        font-weight: 400;
        word-spacing: 5px;
        letter-spacing: 3px;
      }
      & > h1 {
        font-size: 36px;
      }
      & > p {
        color: #c1c1c1;
      }
    }

    & > .investor-info {
      & > .two {
        display: flex;
        gap: 10px;
        margin-top: 50px;
        font-size: 20px;
        font-weight: 500;
        color: black;
      }

      & > .edit-option {
        & > .input-number::-webkit-outer-spin-button,
        & > .input-number::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
    & > .legal-stuff {
      & > .two {
        display: flex;
        gap: 10px;
        margin-top: 50px;
        font-size: 20px;
        font-weight: 500;
        color: black;
      }
    }
    & > .two {
      display: flex;
      gap: 10px;
      margin-top: 50px;
      font-size: 20px;
      font-weight: 500;
      color: black;
      & > .input-container {
        & > .input-filed {
          border-bottom: 2px solid black;
          display: flex;
          align-items: center;
          height: 64px;
          font-size: 1.9rem;
          color: #c1c1c1;
          & > input {
            border: none;
            width: 100%;
            color: black;

            &:focus {
              border: none;
              outline: none;
            }
          }
        }
      }
    }

    & > .three {
      & > .two {
        display: flex;
        gap: 10px;
        margin-top: 50px;
        font-size: 20px;
        font-weight: 500;
        color: black;
      }

      & > .account {
        padding: 2%;
        border: 2px solid #f7f8fb;
        height: 70px;
        overflow: hidden;
        &.active {
          height: max-content;
        }

        &:hover {
          background-color: #f7f8fb;
        }

        & > .bankAccount {
          display: flex;
          align-items: center;
          padding: 2%;
          font-size: 1.1rem;
          gap: 10px;
          cursor: pointer;
          &.active {
            color: blue;
          }
        }

        & > .credit-card {
          & > .date {
            overflow: hidden;
            width: 100px;
          }

          & > .CVV {
            width: 100px;
          }
        }
      }
    }

    & > .complete-investment {
      & > .two {
        display: flex;
        gap: 10px;
        margin-top: 50px;
        font-size: 20px;
        font-weight: 500;
        color: black;
      }
    }
  }

  & > .right-side {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & > .border-card {
      border: 1px solid #c1c1c1;
      width: 400px;
      padding: 2%;
      margin-left: auto;
      border-radius: 5px;
      & > p {
        color: #c1c1c1;
      }
    }
  }

  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;
export default Wrapper;
