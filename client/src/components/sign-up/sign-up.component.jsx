import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { SignUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = props => {

  const { dispatchStartSignup } = props;

  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
    
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert("Your passwords must match!");
      return;
    }

    dispatchStartSignup( userCredentials );
  }

    const handleChange = (event) => {
        const { value, name } = event.target;

        setUserCredentials({...userCredentials, [name]: value })
    }

    return(
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                    name="displayName" 
                    type="text" 
                    label='Name'
                    value={displayName} 
                    handleChange={handleChange}
                    required/>

                <FormInput 
                    name="email" 
                    type="email" 
                    label='Email'
                    value={email} 
                    handleChange={handleChange}
                    required/>

                <FormInput 
                    name="password" 
                    type="password" 
                    value={password}
                    label='Password'
                    handleChange={handleChange}
                    required/>

                <FormInput 
                    name="confirmPassword" 
                    type="password" 
                    value={confirmPassword}
                    label='Confirm Password'
                    handleChange={handleChange}
                    required/>

                <div className="buttons">
                    <CustomButton type="submit" value='Submit Form'>Sign Up</CustomButton>
                </div>
                
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
  dispatchStartSignup: (userCredentials) => dispatch( SignUpStart( userCredentials ))
})

export default connect(null, mapDispatchToProps )(SignUp);