import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  row-gap: 5px;
  padding: 1%;
  border-radius: 5px;
  font-size: 14px;
  color: var(--p-color);
  align-items: center;
  border: none;
  grid-template-columns: repeat(2, 1fr);
  cursor: pointer;

  & > h6 {
    text-transform: capitalize;
    padding: 0;
    margin: 0;
  }

  &:hover {
    background-color: #f2f5f8;
  }
  &.active {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding-block: 2%;

    justify-content: space-between;
    border: 0.1px solid #d5dfe8;
    cursor: pointer;

    &:hover {
      background-color: transparent;
    }
  }

  & > .qsn {
    display: flex;
    font-size: 14px;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    & > h5 {
      font-size: 1em;
      font-weight: bold;
      font-family: var(--gotham-font);
    }

    & > .ifield {
      width: 50%;
      outline: 0.1px solid #d5dfe8;
      border: none;
      font-family: var(--gotham-font);
      height: 40px;
      padding-left: 5px;

      &.unactive {
        width: 100% !important;
        border: none;
        outline: none;
        text-align: end;
        background-color: transparent;
      }

      &:focus {
        outline: 2.5px solid #4f8bc3;
      }
    }
  }

  .buttons {
    justify-self: flex-end;
    display: flex;
    gap: 10px;
    margin-top: 10px;

    & > .btn-cancel {
      background-color: transparent;
      border: none;
    }

    & > .btn-save {
      background-color: #27c898;
      color: white;
      border: none;
      width: 80px;
      height: 40px;
    }
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
    line-height: 3px;
    align-items: center;
    justify-content: center;

    & > .qsn {
      padding: 0;
      margin: 0;
      & > .ifield {
        &.unactive {
          margin: 0;
          padding-block: 4px;
          font-weight: 500;
          padding-left: 0px;
          height: max-content;
          text-align: start;
        }
      }
    }
  }
`;

export default Wrapper;
