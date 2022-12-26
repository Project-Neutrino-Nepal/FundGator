import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 20px;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > .option {
      position: relative;

      & > .icon {
        cursor: pointer;
      }

      & > .options {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 20px;
        left: -10px;
        background-color: white;
        width: 70px;
        box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        -webkit-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        -moz-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        &.active {
          display: none;
        }
        & > span {
          text-transform: capitalize;
          cursor: pointer;
          padding-left: 9px;
          &:hover {
            background-color: #8a8b8b;
            color: white;
          }
        }
      }
    }

    & > .user-img {
      display: flex;
      gap: 10px;
      align-items: center;

      & > span {
        font-weight: bold;
        text-transform: capitalize;
      }

      & > img {
        object-fit: cover;

        width: 40px;
        height: 40px;
        min-height: 40px;
        min-width: 40px;
        border-radius: 50px;
      }
    }
  }

  & > .comment {
    display: flex;
    margin-top: 5px;
    gap: 19px;
    & > .heart {
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
      justify-content: center;
      align-items: center;
      padding-left: 5px;

      & > .notliked {
        cursor: pointer;
        font-size: 1.8rem;
        &:hover {
          color: #eb503f;
        }
      }

      & > .liked {
        font-size: 1.8rem;

        cursor: pointer;

        color: #eb503f;
      }
    }

    & > p {
      background-color: #f5f5f5;
      padding-top: 5px;
      padding-inline: 5px;
    }
  }

  & > .reply-input {
    & > .d-flex {
      & > input:first-letter {
        color: blue;
      }

      & > input{
          word-break: break-all;

      }
      
    }
  }
`;
export default Wrapper;
