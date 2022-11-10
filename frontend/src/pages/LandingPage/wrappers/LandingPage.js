import styled from "styled-components";
import bg from "../../../assets/image/landing.png";
import ill from "../../../assets/image/puzzle.webp";
import ill2 from "../../../assets/image/illustration2.png";

const Container = styled.div`
  background-color: white;
  & > .one {
    background-image: url(${bg});

    background-size: cover;
    font-family: var(--dm-font);
    display: flex;
    padding-inline: 10%;

    padding-top: 15%;
    margin-bottom: 30px;

    & > .left-container {
      width: 55%;
      display: flex;
      flex-direction: column;

      & > h1 {
        font-size: 44px;
        color: #1b1f2e;
        width: 70%;
        font-weight: bold;
      }

      & > p {
        font-size: 24px;
        color: var(--h-color);
        width: 80%;
        margin-block: 5%;
      }
      & > .btn-container {
        display: flex;
        gap: 4%;
        width: 70%;

        & > .btn-started {
          width: 100%;
          background-color: #2a85ff;
          padding: 4%;
          border: none;
          color: white;
          border-radius: 10px;
          font-size: clamp(17px, 2.5vw, 22px);
          transition: 1s;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            transform: translateY(-10px);
          }
        }

        & > .btn-works {
          border: 2px solid #2a85ff;
          white-space: nowrap;

          color: #2a85ff;
          width: 100%;
          border-radius: 10px;
          font-size: clamp(17px, 2.5vw, 22px);

          background-color: white;
          cursor: pointer;
          transition: 1s;

          &:hover {
            transform: translateY(-10px);
          }
        }
      }
    }

    & > .right-container {
      width: 45%;
      background-image: url(${ill});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      /* transform: scale(1.6); */
    }

    & > .sidebar {
      display: none;
      position: relative;

      & > .nav-links {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 19%;
        width: 100%;
        padding-inline: 2%;

        & > .nav-link {
          color: black;
          font-size: 24px;
          padding: 2%;
          &:hover {
            border-bottom: 1.5px solid black;
            scale: 20px;
          }
        }
      }

      & > .social-icons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        padding: 4%;
        position: absolute;
        top: 8%;

        & > .circle {
          border-radius: 50px;

          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;

          height: 40px;
          border: 2px solid blue;
          color: blue;
          transition: 1s;
          cursor: pointer;

          &:hover {
            color: white;
            background-color: blue;
            transform: translateY(-5px);
          }
        }
      }
    }
  }

  & > .two {
    padding-block: 5%;

    & > h1 {
      text-align: center;
      font-size: 2.6rem;
      color: var(--h-color);
      font-weight: bold;
      margin-block: 30px;
    }
  }

  & > .three {
    padding-inline: 10%;

    & > h1 {
      text-align: center;
      margin-block: 20px;
      font-weight: bold;
      margin-block: 30px;
    }
    & > .content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5%;
    }
  }

  .four {
    height: 80vh;

    text-align: center;
    background-image: url(${ill2});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    & > .btn-started {
      padding: 1.5% 3%;
      background-color: var(--primary-color);
      border: none;
      color: white;
      border-radius: 15px;
    }

    & > p {
      color: var(--l-p-color);
      font-family: var(--dm-font);
      width: 47%;
      font-size: clamp(14px, 2.5vw, 18px);

      min-width: 370px;
    }

    & > h1 {
      color: var(--h-color);
      font-weight: bold;
      font-size: 36px;
      font-size: clamp(30px, 2.5vw, 36px);
    }
    & > h2 {
      font-size: clamp(23px, 2.5vw, 28px);

      color: var(--h-color);
      font-weight: bold;
    }
  }

  @media screen and (max-width: 900px) {
    & > .three {
      padding-inline: 3%;

      & > .content {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 5%;
      }
    }
    .one {
      display: flex;
      padding-inline: 3%;

      flex-direction: column;
      gap: 30px;
      position: relative;
      margin-inline: 0%;

      & > .left-container {
        width: 100%;
      }

      & > .right-container {
        width: 100%;
        height: 200px;
      }

      & > .sidebar {
        position: fixed;
        top: 0;
        left: 0px;
        width: 300px;
        height: 100%;
        background-color: white;
        transition: 3s;
        &.active {
          display: flex;
          position: fixed;
          top: 0;
          left: 0px;

          transition: 3s;
        }

        & > .cross-icon {
          position: absolute;
          right: 5%;
          top: 5%;
          cursor: pointer;
        }
      }
    }

    & > .two {
      padding-inline: 3%;
    }
  }
`;
export default Container;
