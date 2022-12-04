import styled from "styled-components";

const Wrapper = styled.div`
  h2 {
    margin-block: 40px;
  }
  .comments {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & > .comment {
      display: flex;
      gap: 10px;
      & > img {
        width: calc(70px + 2vw) ;
        height: calc(70px + 2vw);
        min-height: calc(70px + 2vw);
        min-width: calc(70px + 2vw);
        max-height: 120px;
        max-width: 120px;
        border-radius: 60px;
        object-fit: cover;
      }

      & > .info {
        & > span {
          font-weight: bold;
          text-transform: capitalize;
        }

        & > p {
          background-color: #f7f8fb;
          padding: 5px;
          border-radius: 7px;
        }
      }
    }
  }
`;
export default Wrapper