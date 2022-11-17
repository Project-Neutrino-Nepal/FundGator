import styled from "styled-components";

const Wrapper = styled.div`
  font-family: var(--dm-font);

  height: max-content;
  min-height: 100vh;

  position: relative;
  background-color: white;
  overflow: hidden;

  .infocontainer {
    background-color: #f7f8fb;
    .userinfo {
      display: flex;

      padding: 5%;
      padding-inline: 6%;
      align-items: center;
      text-transform: capitalize;

      gap: 5%;
      & > img {
        width: min(170px, calc(50px + 3.5vw));
        height: min(170px, calc(50px + 3.5vw));
        border-radius: 50px;
      }

      & > .info {
        & > p {
          color: var(--primary-color);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
        }
      }
    }

    .dropdown {
      padding-left: 5%;
      cursor: pointer;
      & > .icon {
        font-size: 2rem;
        &.active {
          transform: rotate(180deg);
        }
      }
    }

    & > .tab-container2 {
      display: none;
    }
  }

  .tab-container {
    display: none;

    &.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 147px;
      width: 100%;
      background-color: #f4f6fa;
    }

    & > .tabs {
      width: 100%;
      padding: 2% 5%;
      cursor: pointer;
      text-transform: capitalize;
      text-align: center;
      text-decoration: none;
      color: var(--h-color);

      &.active {
        color: var(--primary-color);
        border-bottom: 1px solid var(--primary-color);
      }

      &:hover {
        color: var(--primary-color);
        background-color: whitesmoke;
      }
    }
  }

  @media screen and (min-width: 700px) {
    .infocontainer {
      & > .userinfo {
        padding-block: 1%;
        width: 100%;
        padding-inline: 0%;
        margin-inline: 17%;
        gap: 3%;
      }
      & > .dropdown {
        display: none;
      }

      & > .tab-container2 {
        display: flex;
        margin-inline: 15%;
        & > .tabs {
          white-space: nowrap;
          padding: 1.5% 2%;
          font-size: clamp(12px, 1.7vw, 16px);
          font-weight: 500;
          cursor: pointer;
          text-transform: capitalize;
          letter-spacing: 2px;
          text-decoration: none;
          color: var(--h-color);

          &.active {
            color: var(--primary-color);
            border-bottom: 1px solid var(--primary-color);
          }
          &:hover {
            border-bottom: 1px solid var(--primary-color);
          }
        }
      }
    }

    .tab-container {
      display: none;
      &.active {
        display: none;
      }
    }

    .content {
      margin-inline: 15%;
    }
  }
`;
export default Wrapper;
