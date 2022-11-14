import styled from "styled-components";

const Wrapper = styled.div`
  .left-container {
    display: none;
  }

  @media screen and (min-width: 970px) {
    padding-top: 40px;

    .left-container {
      width: 20%;
      display: flex;
      flex-direction: column;
      font-size: 15px;
      line-height: 8px;
      color: var(--l-p-color);
    }

    .right-container {
      width: 100%;
    }
  }
`;
export default Wrapper;
