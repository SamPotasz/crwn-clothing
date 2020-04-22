import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = () => {
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

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});

            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch(error) {
            console.error(error);
        }
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

export default SignUp;