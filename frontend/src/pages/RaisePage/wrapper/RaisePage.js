import styled from "styled-components"

const Wrapper = styled.div`
  padding-block: 140px;

  display: flex;
  padding-inline: 10%;
  background-color: white;

  & > .left-container {
    width: 50%;

    & > h1 {
      color: #16263d;
      font-size: 51px;
      font-weight: bold;
      width: 340px;
      line-height: 65px;

      & > span {
        color: #eb503f;
        white-space: nowrap;
      }
    }

    & > p {
      font-size: 20px;
      cursor: pointer;
      width: 400px;
      font-weight: bold;
      color: #7e8999;

      &:hover {
        text-decoration: underline;
      }
    }

    & > .entercompany {
      height: 50px;
      border: 1px solid saddlebrown;
      width: 350px;
      display: flex;
      align-items: center;
      padding: 4px;
      border: 2px solid #c4def4;

      &.active {
        border: 2px solid #539fdf;
      }

      & > input {
        border: none;
        height: 100%;
        &:focus {
          outline: none;
          border: none;
        }
      }
      & > .btn-raise {
        width: 100%;
        height: 100%;
        border: none;
        background-color: #eb503f;
        color: white;
        font-weight: bold;
      }
    }
  }

  & > .right-container {
    width: 50%;
  }

  @media screen and (max-width:1000px) {
    display: flex;
    flex-direction: column;

    & > .right-container, & > .left-container{
        width: 100%;
    }
    
  }
`;
export default Wrapper