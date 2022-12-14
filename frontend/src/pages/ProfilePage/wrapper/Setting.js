import styled from "styled-components";

const Wrapper = styled.div`
  .left-container {
    display: none;
  }

  .margin-block {
    margin-block: 15px;
  }

  .hover {
    cursor: pointer;
    padding: 2% 1%;
    padding-block: 10px;
    &:hover {
      background-color: #f2f5f8;
    }
  }

  .right-container {
    margin-inline: 2%;

    .userinput + .userinput {
      margin-top: 5px;
    }
    & > .account {
      & > h1 {
        font-size: 25px;
      }
      & > .passwordreset {
        display: flex;
        justify-content: space-between;

        & > span + span {
          color: #37cc9f;
        }
      }

      & > .btn-delete {
        width: 100%;
        display: block;
        text-align: end;
        & > span {
          color: red;
        }
      }
    }

    & > .publicprofile {
      & > .privacy {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > h6 {
          text-transform: capitalize;
          padding: 0;
          margin: 0;
          color: var(--p-color);
          font-size: 16px;
        }
        & > .check {
          & > .content {
            display: flex;
            align-items: center;
            font-size: 12px;
            & > span {
              white-space: nowrap;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 970px) {
    padding-top: 40px;
    display: flex;

    .left-container {
      width: 20%;
      display: flex;
      flex-direction: column;
      font-size: 15px;
      line-height: 8px;
      color: var(--l-p-color);
      position: sticky;
      top: 0;
    }

    .right-container {
      width: 100%;
    }
  }
`;
export default Wrapper;
