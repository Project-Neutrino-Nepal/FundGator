import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 90px;
  padding-inline: 1%;
  background-color: white;

  & > .right-container {
    display: none;
  }

  & > .left-container {
    width: 100%;
    & > .one {
      display: flex;
      flex-direction: column-reverse;
      & > .header {
        display: flex;
        justify-content: space-between;
        & > .info {
          & > h3 {
            color: #6C757D;
            font-size: 1.5rem;
          }
          & > h1 {
            font-size: 25px;
          }
        }
      }

      & > .video-container {
        position: relative;


        & > .video {
          width: 100%;
          height: calc(250px + 3vw);
          object-fit: cover;
        }

        & > .icon {
          position: absolute;
          cursor: pointer;
          top: 40%;
          left: 40%;
          font-size: 2rem;
          padding: 3px 30px;
          border-radius: 90px;
          background-color: #963328;
          width: 90px;
          height: 90px;
          color: white;
        }
      }
    }

    & > .two {
      & > span {
        color: #0A4FA3;
        font-weight: bold;
      }
      & > .line {
        background-color: #0A4FA3;
        color: #0A4FA3;
        height: 3px;
        width: 100%;
      }
      & > .price {
        & > p {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
          padding: 0;

          & + p {
            font-weight: normal;
            font-size: 0.8rem;
            color: #6C757D;
          }
        }
      }

      & > .invest {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 0;
        padding: 0;
        margin-top: 20px;

        & > .invest-info {
          line-height: 5px;

          & > p {
            font-weight: bold;
          }
        }

        & > .invest-input {
          border: 1px solid black;
          height: 50px;
          & > input {
            width: 90px;
            border: none;
            outline: none;
            height: 100%;
            &:focus {
              border: none;
              outline: none;
            }
          }
        }
      }

      & > .btn-invest {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        background-color: #0A4FA3;
        color: white;
        border: none;
        font-weight: bold;
      }

      & > .btn-bookmark {
        padding: 10px;
        width: 100%;
        margin-top: 10px;
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        background-color: white;
        color: #2b659b;
        border: 1px solid #2b659b;
        font-weight: bold;
      }
    }

    .three {
      display: flex;
      text-align: center;
      font-size: 12px;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      flex-wrap: wrap;

      & > .links {
        display: flex;
        gap: 10px;
        align-items: center;
        & > span {
          white-space: nowrap;
        }

        & > .icon {
          font-size: 18px;
        }
      }

      & > .category {
        display: flex;
        gap: 5px;
        & > span {
          padding: 5px;
          background-color: #e8e8e8;
          white-space: nowrap;
        }
      }
    }

    .four {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      text-align: center;
    margin-top: 20px;
      position: sticky;
      top: 0 !important;
      background-color: white;

      & > span {
        white-space: nowrap;
        font-size: 14px;
        color: #6C757D;
        cursor: pointer;
        padding: 7px;
        &.active {
          color: black;
          font-weight: bold;
          border-bottom: 1px solid #3077b8;
        }

        &:hover {
          font-weight: bold;
          color: var(--h-color);
        }
      }
    }
  }

  @media screen and (min-width: 1000px) {
    display: flex;
    gap: 5%;
    padding-inline: 10%;
    & > .left-container {
      width: 65%;
      & > .one {
        display: flex;
        flex-direction: column;
        & > .video-container {
          & > .video {
            height: 500px;
          }
          & > .icon{
            top: 40%;
            left: 45%;

          }
        }
      }

      & > .two {
        display: none;
      }

      & > .three {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      & > .four {
        top: 10%;
      }
    }

    .right-container {
      width: 30%;
      display: flex;
      flex-direction: column;

      & > .two {
        position: sticky;
        top: 70px;
        padding: 4%;
        width: 320px;
        margin: 0 auto;
        box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        -webkit-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        -moz-box-shadow: 1px 3px 5px 1px rgba(135, 158, 158, 0.75);
        & > span {
          color: #0A4FA3;
          font-weight: bold;
        }
        & > .line {
          background-color: #0A4FA3;
          color: #0A4FA3;
          height: 3px;
          width: 100%;
        }
        & > .price {
          & > p {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0;
            padding: 0;

            & + p {
              font-weight: normal;
              font-size: 0.8rem;
              color: #6C757D;
            }
          }
        }

        & > .invest {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin: 0;
          padding: 0;
          margin-top: 20px;

          & > .invest-info {
            line-height: 5px;
            color: #6C757D;

            & > p {
              font-weight: bold;
            }
          }

          & > .invest-input {
            border: 1px solid black;
            height: 50px;
            & > input {
              width: 90px;
              border: none;
              outline: none;
              height: 100%;
              &:focus {
                border: none;
                outline: none;
              }
            }
          }
        }

        & > .btn-invest {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          background-color: #0A4FA3;
          color: white;
          border: none;
          font-weight: bold;
        }

        & > .btn-bookmark {
          padding: 10px;
          width: 100%;
          margin-top: 10px;
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          background-color: white;
          color: #2b659b;
          border: 1px solid #2b659b;
          font-weight: bold;
        }
      }
    }
  }
`;
export default Wrapper;
