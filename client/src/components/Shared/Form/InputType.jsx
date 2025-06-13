import React from 'react'

function InputType({labelFor,labelText,inputType,value,onChange,name}) {
  return (
    <div>
         <div className="mb-3">
        <label htmlFor={labelFor} className="form-label">{labelText}</label>
        <input type={inputType} className="form-control" id={labelFor} name={name} value={value} onChange={onChange} />
       </div>
    </div>
  )
}

export default InputType