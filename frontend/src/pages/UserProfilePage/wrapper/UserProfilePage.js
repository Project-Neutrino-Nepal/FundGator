import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .left-container {
    background-color: #d1eaeb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5%;
    height: 80vh;
    

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
    height: 92vh;

    .left-container{
        width: max(500px,30%);
        height: 100%;

    }

    .right-container{
        width: 100%;
        padding-inline: 5%;
    }
  }

`;
export default Wrapper;
