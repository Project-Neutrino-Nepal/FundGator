import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .left-container {
    background-color: #0a4fa3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5%;
    min-height: 80vh;
    position: static;
    top: 10px;
    left: 0;
    z-index: 3;

    & > h2 {
      font-weight: bold;
      text-transform: capitalize;
      margin-block: 20px;
    }

    & > p {
      color: var(--l-p-color);
      font-size: 11px;
      & + p {
        justify-self: flex-end;
        margin-top: auto;
      }
    }
    & > .profilepic {
      width: 190px;
      height: 190px;
      border-radius: 50%;
      border: 5px solid white;
      object-fit: cover;
    }

    & > .btn-edit {
      border: 2px solid var(--l-p-color);
      color: var(--l-h-color);
      background-color: transparent;
      width: 150px;
      border-radius: 25px;
      padding-block: 5px;
      text-transform: capitalize;
      font-weight: bold;
      text-decoration: none;
      text-align: center;
    }
  }

  .right-container {
    background-color: white;
    padding-inline: 10%;
    padding-top: 5%;
    height: max-content;

    & > h1 {
      font-weight: bolder;
      color: var(--h-color);
      font-size: 18px;
    }
    & > p {
      background-color: #e5e5e5bc;
      color: var(--l-h-color);
      font-weight: 900;
      padding: 7px;
      width: max-content;
      text-transform: uppercase;
      font-size: 13px;
    }
  }

  @media screen and (min-width: 970px) {
    display: flex;
    flex-direction: row;

    .left-container {
      width: max(500px, 30%);
      height: 100vh;
      position: sticky;
      top: 0;
      left: 0;
    }

    .right-container {
      width: 100%;
      padding-inline: 5%;
    }
  }
`;
export default Wrapper;
