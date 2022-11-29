import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 20px;

  & > .lists {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .list {
      display: flex;
      font-size: 14px;
      gap: 35px;
      align-items: center;
      font-weight: 500;

      & > .number {
        border: 1px solid black;
        border-radius: 50px;
        min-width: 50px;
        text-align: center;
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .our-team {
    & > h1 {
      margin-block: 20px;
    }

    & > .lists {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  .about {
    & > h1 {
      margin-block: 20px;
    }
  }
`;
export default Wrapper;
