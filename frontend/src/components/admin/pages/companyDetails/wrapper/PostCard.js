import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(500px + 2vw);
  max-width: 550px;
  margin-top: 20px;
  margin-right: auto;
  box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
  -webkit-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
  -moz-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
  padding: 2%;
  border-radius: 9px;

  & > .info-container {
    display: flex;
    gap: 10px;
    align-items: center;

    & > img {
      width: 50px;
      height: 50px;
      min-height: 50px;
      min-width: 50px;
      border-radius: 60px;
    }

    & > .info {
      display: flex;
      justify-content: space-between;
      width: 100%;

      & > .post-info {
        display: flex;
        gap: 5px;

        & > span {
          & + span {
            color: #6c757d;
          }
        }
      }

      & > .op {
        position: relative;
        & > .icon {
          cursor: pointer;
        }
        & > .tion {
          display: none;
          position: absolute;
          top: 25px;
          left: 0;
          background-color: white;
          width: 30px;
          height: 50px;
          text-align: center;
          box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
          -webkit-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
          -moz-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
          & > .icon {
            cursor: pointer;
          }
          &.active {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
        }
      }
    }
  }

  & > img {
    margin-top: 10px;
    width: 100%;
    height: 470px;
    object-fit: cover;
    border-radius: 15px;
  }

  & > .options {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-size: 1.5rem;

    & > .likes {
      display: flex;
      gap: 10px;
      align-items: center;
      cursor: pointer;

      &.heart {
        &:hover {
          color: red;
          & > .circle {
            background-color: #fee7f2;
          }
          & > span {
            color: red;
          }
        }
      }

      &.comment {
        &:hover {
          color: #1d9bf0;
          & > .circle {
            background-color: #e1eef6;
          }
          & > span {
            color: #1d9bf0;
          }
        }
      }

      &.retweet {
        &:hover {
          color: #00ba7c;
          & > .circle {
            background-color: #e5f8f2;
          }
          & > span {
            color: #00ba7c;
          }
        }
      }
      & > .circle {
        width: 45px;
        height: 45px;
        min-height: 45px;
        min-width: 45px;
        border-radius: 60px;
        font-size: 1.5rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      & > span {
        font-size: 1rem;
        color: #6c757d;
      }
    }
  }

  & > p {
    color: #6c757d;
  }
`;
export default Wrapper;
