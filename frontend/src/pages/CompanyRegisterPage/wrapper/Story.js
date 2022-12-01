import styled from "styled-components";
const Wrapper = styled.div`
  & > .img-container {
    height: 400px;
    width: 100%;
    background-color: #f3f7f9;
    position: relative;
    & > .upload-pic {
      position: absolute;
      inset: 25%;
      width: 50%;
      height: 50%;
      object-fit: contain;
    }

    & > .preview-img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
    & > #input-file {
      position: absolute;
      top: 0;
      display: none;
    }
  }
  & > #video-file {
    display: none;
  }

  & > .vfile {
    width: max-content;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 10px 25px;
    color: white !important;
    margin-block: 10px;
  }

  & > video {
    height: max-content !important;

    width: 100%;
    object-fit: cover;
  }
  & > h6 {
    font-size: 1.2rem;
  }

  & > h5 {
    margin-block: 20px;
    font-size: 1.2rem;
  }
`;
export default Wrapper;
