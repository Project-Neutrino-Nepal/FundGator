import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;
  }

  & > .notify-items {
    & > .notify-edit {
      & > .icon {
        width: 30px;
        height: 30px;
        padding: 4%;
        &:hover {
          background-color: #d9d9d9;
          border-radius: 50px;
        }
      }

      & > .droplst {
        width: 200px;
        transform: translateY(47px) translateX(-160px);
        backdrop-filter: blur(50px);
        z-index: 5 !important;
        & > .droplst-item {
          line-height: 4px;
          padding: 2%;
          padding-top: 4%;
          border-radius: 0 !important;
          &:hover {
            background-color: #d9d9d9;
            border-radius: 50px;
          }

          & > .op {
            & > p {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Wrapper;
