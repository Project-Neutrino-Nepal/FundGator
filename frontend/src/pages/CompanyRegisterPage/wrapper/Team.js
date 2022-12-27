import styled from "styled-components";

const Wrapper = styled.div`
  & > h6 {
    font-size: 1.2rem;
    & > span {
      font-size: 0.9rem;
      color: blue;
      cursor: pointer;
    }
  }

  & > .mem{

    & > .users-form {
      margin-top: 30px;
      border: 1px solid #f4f6fa;
      padding: 2%;
  
      &:hover {
        border: 2px solid #f4f6fa;
      }
  
      & > .info {
        display: flex;
        align-items: center;
  
        & > .image-upload {
          & > .f-input {
            width: 100px;
            height: 100px;
            border-radius: 600px;
            overflow: hidden;
            & > img {
              object-fit: cover;
              height: 100%;
              width: 100%;
            }
            & > input {
              z-index: -1;
              display: none;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
  
        & > .short-info {
          /* line-height: 2px;
          & > h5 {
            font-weight: bold;
            margin: 0;
          } */
          width:100%;
  
          & > input {
            height: max-content;
            border: none;
            font-size: 1.2rem;
            margin: 0;
            width:100%;
  
            &:focus {
              outline: none;
              border: none;
            }
          }
        }
      }
  
      & > .radio {
        border: 1px soild black;
        width: 400px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: flex-start;
        text-align: start;
        column-gap: 40px;
        margin-top: 15px;
        & > .radio-input {
          display: flex;
  
          & > label {
            white-space: nowrap;
          }
        }
      }
    }
  }


`;
export default Wrapper;
