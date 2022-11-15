import styled from "styled-components";

const Wrapper = styled.div`
  padding-inline: 10%;
  &:hover{
    background-color: lightblue;
  }
  
  .btn-acc {
    width: 100%;
    border: none;
    background-color: none;
    padding: 1% 2%;
    font-size: 24px;
    font-weight: bold;
    text-align: start;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    & > .icon {
      font-size: 10px;
    }
  }
  & > p {
    padding: 2%;
    color: var(--p-color);
    font-size: 17px;
    font-family: var(--dm-font);
    line-height: 26.4px;
  }

  & > p + p {
    padding-top: 0%;
  }

  @media screen and (max-width: 900px) {
    padding-inline: 3%;

  }
`;
export default Wrapper;
