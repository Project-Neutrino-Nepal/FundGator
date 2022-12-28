import styled from "styled-components";

const Wrapper = styled.div`
  & > .cardy {
    height: 550px;
    overflow: hidden;
    border-radius: 25px;
    background: white;
    position: relative;

    & > img {
      height: 300px;
      object-fit: fill;
      object-position: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }

    & > .info-container {
      padding: 5px 20px;

      position: absolute;
      bottom: 0;
      height: 55%;
      transition: 2s;
      background-color: white;
      width: 100%;

      z-index: 2;

      & > h6 {
        color: var(--l-h-color);
        font-size: 1.2rem;
        text-transform: capitalize;
      }


      & > hr {
        position: absolute;
        top: 105%;
        transition: 2s;
        width: 90%;
        height: 1px;
        color: black;
        background-color: black;
      }

      & > .category {
        position: absolute;
        top: 85%;
        transition: 2s;

        & > span {
          background-color: #facff1;
          padding: 3px 5px;
          font-size: 11px;

          & + span {
            margin-left: 5px;
          }
        }
      }

      & > .f-p {
        position: absolute;
        top: 110%;
        transition: 2s;
        color: var(--l-p-color);
        font-weight: 400;

        & > span {
          font-weight: bold;
          color: black;
        }
      }

      & > .s-p {
        position: absolute;
        top: 120%;
        transition: 2s;
        color: var(--l-p-color);
        font-weight: 400;

        & > span {
          font-weight: bold;
          color: black;
        }
      }

      & > .profile-pic {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        border: 4px solid white;
        position: absolute;
        object-fit: cover;
        top: 0;
        right: 10%;
        transform: translateY(-25px);
      }
      & > h4 {
        font-size: 18px;
        font-weight: bold;
      }

      & > .desc {
        font-size: 14px;
        color: var(--l-p-color);
      }
    }
    &:hover > .info-container {
      height: 80%;
      transition: 2s;

      & > hr {
        position: absolute;
        top: 78%;
        transition: 2s;
        font-weight: bolder;
        left: 0;
      }

      & > .category {
        position: absolute;
        top: 70%;
        & > span {
          & + span {
            margin-left: 5px;
          }
        }
      }

      & > .f-p {
        position: absolute;
        top: 80%;
      }
      & > .s-p {
        position: absolute;
        top: 85%;
      }
    }
  }
`;
export default Wrapper;
