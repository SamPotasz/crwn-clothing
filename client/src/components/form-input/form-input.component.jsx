import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {
            //only render a label if it's passed in as prop
            //add "shrink" class name if user has typed something in the input
            label ? 
                (<label 
                className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>) 
            : null
        }
    </div>
)

export default FormInput;