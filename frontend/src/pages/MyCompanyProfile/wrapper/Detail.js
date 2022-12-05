import styled from "styled-components";

const Wrapper = styled.div`
  .financial {
    padding-block: 30px;
  }
  & > .risks {
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

  .other-disclosure {
    .director {
      display: flex;
      width: 100%;
    }
    & > h3 {
      margin-block: 40px;
    }
    & > h5 {
      margin-block: 25px;
      color: #9ba1a9;
    }
    & > table {
      width: 100%;
      border-spacing: 0 15px;
      border-collapse: separate;
      & > tr {
        padding: 10px;
        margin-top: 30px;
      }
      & > tr:nth-child(1) {
        border-bottom: 1px solid black;
      }
    }

    & > .capital {
      & > tr > th {
        padding-right: 20px;
      }

      & > tr > td {
        padding-right: 20px;

        white-space: wrap;
      }
    }
  }
`;
export default Wrapper;
