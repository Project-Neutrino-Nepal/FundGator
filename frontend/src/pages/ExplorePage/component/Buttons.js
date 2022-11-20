import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import styled from "styled-components"
let slidesToShow = 5

const Wrapper = styled.div`

.icon{
  color :white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  
}

`
const Prevbtn = (props) => {
  const { className, onClick, currentSlide } = props;
  

  return (
    <>
      {currentSlide !== 0 && (
        <Wrapper className={className} onClick={onClick}>
          <GrPrevious className="icon" style={{color:'white',fontSize:'30px'}}   />
        </Wrapper>
      )}
    </>
  );
};


const Nextbtn = (props) => {
  const { className, onClick, currentSlide,slidesCount } = props;

  return (
    <>
      {currentSlide !== slidesCount - slidesToShow && (
        <Wrapper className={className} onClick={onClick}>
          <GrNext className="icon" style={{ color: "white", fontSize: "30px" }} />
        </Wrapper>
      )}
    </>
  );
};

export { Prevbtn,Nextbtn };
