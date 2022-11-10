import styled from "styled-components";

const Wrapper = styled.div`
  padding-inline: 10%;
  padding-block: 5%;
  font-family: var(--dm-font);
  & > .header {
    display: flex;
    gap: 10%;

    width: 100%;
    & > .boxes {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5%;
      & > .box {
        & > h4 {
          font-weight: bold;
          color: var(--h-color);
          white-space: nowrap;
        }
      }
    }
  }

  & > p {
    font-size: 13px;
    color: var(--l-p-color);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .copyright {
    text-align: center;
    color: var(--l-p-color);
    font-size: 16px;
    margin-top: 100px;
  }

  @media screen and (max-width: 900px) {
    & > .header {
      & > .boxes {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;
export default Wrapper;
