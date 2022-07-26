import React from "react";
import InputMask from "react-input-mask";


export default function TimeInput(props) {
  let mask = '12:34';
  let formatChars = {
    '1': '[0-2]',
    '2': '[0-9]',
    '3': '[0-5]',
    '4': '[0-9]'
  };

  let beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;

    // Conditional mask for the 2nd digit base on the first digit
    if(value.startsWith('2'))
      formatChars['2'] = '[0-3]'; // To block 24, 25, etc.
    else
      formatChars['2'] = '[0-9]'; // To allow 05, 12, etc.
    return {value, selection: newState.selection};
  }
return (
    <InputMask 
      mask={mask}
      value={props.value} 
      className="form-control"
      onChange={props.onChange}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}
      awaysShowMask="true">
    </InputMask>
  );
}

/*
const Input = (props) => (

    <InputMask mask="+23-59" className="form-control" awaysShowMask="true" value={props.value} onChange={props.onChange}></InputMask>
  );
  
  export default Input;*/