// import React from 'react';
// import { CiSearch } from "react-icons/ci";
// import { IoLocationOutline } from "react-icons/io5";
// import './FindJobInput.scss';

// const FindJobInput = () => {
//   return (
//     <div className='find__job__container'>
//       <div className="find__job__input">
//         <label>
//           <CiSearch />
//           <input type="text" placeholder="Job tittle, Keyword..." />
//         </label>
//         <label className='hide__on__mobile'>   
//           <IoLocationOutline />
//           <input type="text" placeholder='Location' />
//         </label>
//         <button>Find Job</button>
//       </div>
      
//       <p>
//         Suggestion: UI/UX Designer, Programing, <span>Digital Marketing</span>, Video, Animation.
//       </p>
//     </div>
//   );
// };

// export default FindJobInput;


import React from 'react';
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import './FindJobInput.scss';

const FindJobInput = () => {
    return (
        <div className='find__job__container'>
            <div className="find__job__input">
                <label>
                    <CiSearch />
                    <input type="text" placeholder="Job title, Keyword..." />
                </label>
                <label className='hide__on__mobile'>
                    <IoLocationOutline />
                    <input type="text" placeholder="Location" />
                </label>
                <button>Find Job</button>
            </div>
            <p>
                Suggestion: UI/UX Designer, Programming, <span>Digital Marketing</span>, Video, Animation.
            </p>
        </div>
    );
};

export default FindJobInput;
