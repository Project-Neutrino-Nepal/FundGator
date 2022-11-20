import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;

  font-family: var(--gotham-font);

  .fileimg {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  .heading {
    font-size: 1.5rem;
    color: #d3d7dc;
    width: 300px;
    font-size: 32px;
    margin: 0 auto;
    line-height: 35px;
  }

  button {
    background-color: #4f8bc3;
    width: 250px;
    height: 50px;
    text-align: center;
    border: none;
    color: white;
    font-weight: bold;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .btn-cash {
      background-color: white;
      border: 1px solid black;
      margin-top: 5px;
      color: black;
    }
  }

  .desc {
    width: 300px;
    margin: 0 auto;
    color: var(--p-color);
    margin-bottom: 5px;
  }

  .icons-container {
    text-align: center;
    display: flex;
    font-size: 7rem;
    gap: 5px;
    margin: 0 auto;
    justify-content: center;
    color: #adb9c9;
    margin-top: 110px;
  }

  .add-new {
    margin-top: 5px;
  }

  .doc {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
  .marginup {
    margin-top: 130px;
  }
`;

export default Wrapper;
