import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  border-bottom: 1.5px solid #eff2f7;
  margin-top: 20px;

  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;

    & > span {
      font-weight: bold;
      color: var(--l-p-color);
    }

    & > .icon {
      font-size: 16px;
    }

    & > .icon.active {
      transform: rotate(180deg);
    }
  }
  .user-info {
    display: flex;
    gap: 20px;
    & > img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }
    & > .content {
      & > p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        font-size: 12px;
        color: var(--l-p-color);
        &.active {
          display: flex;
        }
      }
    }
  }
`;
export default Wrapper;
