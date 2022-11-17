import styled from "styled-components";
const Wrapper = styled.div`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: transparent;
  & > .icon {
    width: min(80px, calc(67px + 3%));
    height: min(80px, calc(67px + 3%));
  }

  & > .card-info {
    & > h6 {
      color: var(--primary-color);
      font-weight: bold;
      font-size: 10px;
    }
    & > p {
      color: var(--p-color);
      font-size: 18px;
    }
    & > h5 {
      font-weight: bold;
      color: var(--h-color);
    }
  }

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: row;
  }
`;
export default Wrapper;
