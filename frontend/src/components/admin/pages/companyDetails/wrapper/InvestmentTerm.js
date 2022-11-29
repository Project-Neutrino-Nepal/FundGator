import styled from "styled-components";

const Wrapper = styled.div`
  border-top: 1.5px solid #eff2f7;
  border-bottom: 1.5px solid #eff2f7;
  font-size: 12px;

  cursor: pointer;
  margin-top: 10px;
  padding-block: 10px;

  .header {
    & > .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > span {
        font-weight: bold;
        color: var(--l-p-color);
      }

      & > .icon {
        font-size: 16px;
      }
      & > .icon.active {
        transform: rotate(180deg);
      }
    }
  }
`;
export default Wrapper;
