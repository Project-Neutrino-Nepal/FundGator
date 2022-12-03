import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;

  font-family: var(--gotham-font);

  .fileimg {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  .heading {
    font-size: 1.5rem;
    color: #d3d7dc;
    width: 300px;
    font-size: 32px;
    margin: 0 auto;
    line-height: 35px;
  }

  button {
    background-color: #4f8bc3;
    width: 250px;
    height: 50px;
    text-align: center;
    border: none;
    color: white;
    font-weight: bold;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .btn-cash {
      background-color: white;
      border: 1px solid black;
      margin-top: 5px;
      color: black;
    }
  }

  .desc {
    width: 300px;
    margin: 0 auto;
    color: var(--p-color);
    margin-bottom: 5px;
  }

  .icons-container {
    text-align: center;
    display: flex;
    font-size: 7rem;
    gap: 5px;
    margin: 0 auto;
    justify-content: center;
    color: #adb9c9;
    margin-top: 110px;
  }

  .add-new {
    margin-top: 5px;
  }

  .doc {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
  .marginup {
    margin-top: 130px;
  }

  & > .post-box-list {
    display: flex;
    flex-direction: column;

    & > .post-box {
      display: flex;
      box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
      -webkit-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
      -moz-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);

      gap: 5%;
      padding: 1%;

      margin-top: 10px;

      & > img {
        width: 40%;
        height: 100%;
        min-width: 200px;
        min-height: 250px;
        max-height: 250px;
        align-self: center;
      }
      & > .user-info {
        text-align: start;
        width: 100%;

        & > .info {
          display: flex;
          align-items: center;
          gap: 5%;

          & > .username{
            font-weight: bolder;
            color: black;
            text-transform: capitalize;
            font-size: 1.2rem;
          }



          & > .description {
            width: 100%;
          }
          & > .profile-pic {
            width: 50px;
            height: 50px;
            object-fit: covers;
            border-radius: 60px;
          }
        }
      }

      & > .investment {
        background-color: #4f8bc3;
        height: max-content;
        padding: 1%;
        margin-top: 10px;
        margin-right: 1%;
        box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        -webkit-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        -moz-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        font-weight: bolder;
        color: white;
        align-self: center;
        & > h6 {
          white-space: nowrap;
          color: white;
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    & > .post-box-list {
      & > .post-box {
        flex-direction: column;
        margin: 1%;
        gap: 2%;
        & > img {
          width: 100%;
          object-fit: cover;
        }

        & > .user-info {
          & > .description {
            width: 100%;
          }
        }

        & > .investment{
          align-self: flex-start;
        }
      }
    }
  }
`;

export default Wrapper;
