import styled from "styled-components";

const Wrapper = styled.div`
  & > h2 {
    margin-inline: 2.5%;
    font-size: 32px;
    text-transform: capitalize;
    margin-top: 50px;

    & > span {
      margin-inline: 2.5%;

      background: rgb(195, 40, 195);
      background: linear-gradient(
        166deg,
        rgba(195, 40, 195, 1) 29%,
        rgba(20, 71, 195, 1) 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  & > p {
    margin-inline: 2.5%;

    color: var(--l-p-color);
    font-size: 1.1rem;
  }

  .ca:not(.ca + .ca) {
    margin-left: 25px;
  }

  .slick-list {
    position: relative;
  }

  & > .carousel-container {
    margin-bottom: 50px;

    & > .title {
      display: flex;
      align-items: center;

      & > .heading {
        margin-inline: 2.5%;

        font-size: 1.5rem;
        font-weight: 500;
      }
      & > .btn-disc {
        display: flex;
        text-decoration: none;
        align-items: center;

        & > .discover{
          transition: 2s;
        }

        cursor: pointer;
        & > span {
          display: none;
          transition: 2s;
        }
        &:hover .discover {
          display: flex;
          align-items: center;
        }
      }
    }
  }

  @media screen and (min-width: 1050px) {
    margin-inline: 5%;
  }
`;
export default Wrapper;
