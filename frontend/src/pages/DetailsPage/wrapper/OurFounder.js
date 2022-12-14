import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  gap: 10px;

  & > img {
    width: calc(70px + 2vw);
    height: calc(70px + 2vw);
    min-height: calc(70px + 2vw);
    min-width: calc(70px + 2vw);
    max-height: 120px;
    max-width: 120px;
    border-radius: 60px;
    object-fit: cover;
  }

  & > .info{

      & > .userinfo {
        display: flex;
        gap: 20px;
        font-size: 1.2rem;
        font-weight: 600;
        & > span {
          & + span {
            color: #bababa;
          }
        }
      }
  }

`;
export default Wrapper;