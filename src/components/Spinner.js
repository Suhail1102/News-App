import React from 'react'
import loading from './loading.gif'
function spinner () {

    return (
      <>
       <div className='text-center' >
       <img src={loading} alt="" style={{ width:"100px", height:"100px"}}/>
             </div> 
      </>
    )
}

export default spinner