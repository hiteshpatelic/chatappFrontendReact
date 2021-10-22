import React from 'react'

const Input = ({name,value,type, placeholder, onKeyPress,onChange })=>{
    return(
        <input name={name} type={type} value={value} onKeyPress={onKeyPress} onChange={onChange} placeholder={placeholder} />
    )
}

export default Input;