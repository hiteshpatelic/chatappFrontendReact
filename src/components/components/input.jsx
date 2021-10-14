import React from 'react'

const Input = ({name,value,type, placeholder })=>{
    
    return(
        <input name={name} type={type} value={value} placeholder={placeholder} />
    )
}

export default Input;