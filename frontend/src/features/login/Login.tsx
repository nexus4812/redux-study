import React from "react";
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch} from 'react-redux';
import styles from './Login.module.css';
import {
    editUserName,
    editUserPassword,
    toggleMode,
    fetchAsyncLogin,
    fetchAsyncRegister,
    selectAuthen,
    selectIsLoginView,
} from "./loginSlice";

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuthen);
    const isLoginView = useSelector(selectIsLoginView);
    const buttonDisable = auth.username === '' && auth.password === '';

    const login = async () => {
        await dispatch(fetchAsyncLogin(auth));
    };

    const register = async () => {
        const result = await dispatch<any>(fetchAsyncRegister(auth));

        if(fetchAsyncRegister.fulfilled.match(result)) {
            await login();
        }
    };

    return (
        <div className={styles.containerLogin}>
            <div className={styles.appLogin}>
                <h1>{isLoginView ? 'Login' : 'Register'}</h1>
                <span>Username</span>
                <input
                className={styles.inputLog}
                type='text'
                onChange={(e) => dispatch(editUserName(e.target.value))}
                required
                />

                <span>Password</span>
                <input
                    className={styles.inputLog}
                    type='password'
                    onChange={(e) => dispatch(editUserPassword(e.target.value))}
                    required
                />

                <Button
                disabled={buttonDisable}
                onClick={() => {isLoginView ? login() : register()}}
                color="primary"
                variant='contained'
                >{isLoginView ? 'Login' : 'Register'}</Button>

                <span
                    onClick={() => dispatch(toggleMode())}
                    className={styles.switchText}
                >{isLoginView ? 'Create account' : 'Back to login'}</span>
            </div>
        </div>
    )
};

export default Login;