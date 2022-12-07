import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  & > .drop {
    & > .accor-content {
      color: #8b97a7;
      &:hover {
        color: black;
      }

      & > .question{
        font-size: 0.9rem;
      }
    }
    & > .icony {
      font-size: 20px !important;
      color: inherit !important;
    }

    & > .question2 {
      font-size: 0.8rem;
      line-height: 13px;
      margin-left: 21px;
    }
  }
`;
export default Wrapper;
