import React,{useState} from 'react'
import Wrapper from '../wrapper/PostCard'
import { BsThreeDots, } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import {MdDelete} from "react-icons/md"
const PostCard = () => {
  const [show,setShow] = useState(false)
  return (
    <Wrapper>
      <div className="info-container">
        <img
          src="https://imgresizer.eurosport.com/unsafe/1200x1200/smart/filters:format(jpeg)/origin-imgresizer.eurosport.com/2019/08/06/2651140-54845110-2560-1440.jpg"
          alt=""
          srcset=""
        />
        <div className="info">
          <div className="post-info">
            <span>username</span>
            <span>17 h</span>
          </div>
          <div className="op">
            <BsThreeDots className='icon' onClick={()=> setShow(show=>!show)} />
            <div className={show?"tion active":"tion"}>
              <AiTwotoneEdit className='icon'/>
              <MdDelete className='icon'/>

            </div>
          </div>
        </div>
      </div>
      <img
        src="https://cdn.mos.cms.futurecdn.net/TEjMA863BFMGPJ4ErB3wGf.jpg"
        alt=""
      />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem ea cum
        officiis?
      </p>

  

      {/* <PostComment/> */}
    </Wrapper>
  );
}

export default PostCard