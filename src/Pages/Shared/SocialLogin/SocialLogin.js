import React from 'react';
import { useContext } from 'react';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
    const { signInGoogle } = useContext(AuthContext);

    const handelGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                const user = result.user;
                console.log(user)
                setAuthToken(user);
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <p className='text-center'><small>Social Login</small></p>
            <p className='text-center'>
                <button onClick={handelGoogleSignIn} className='btn btn-ghost'>Google</button>
            </p>
        </div>
    );
};

export default SocialLogin;