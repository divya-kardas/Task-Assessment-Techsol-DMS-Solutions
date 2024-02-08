import React, { useEffect,useRef } from "react";
import {useNavigate} from 'react-router-dom';
import ShoppingCart from "./ShoppingCart";


const Notes = (props) => {
 
  let navigate = useNavigate();
 
  useEffect(()=>{
    if(localStorage.getItem('token')){  
        
          props.showAlert("Login successfully","success")
        
        }
    else{
      props.showAlert("Login to continue","danger")
      navigate("/login");
    }
    // eslint-disable-next-line
    
  },[])
// const ref=useRef(null)

  return (
    <>
      <ShoppingCart showAlert={props.showAlert}/>
    </>
  )
}

export default Notes
