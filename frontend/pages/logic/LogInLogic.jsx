import { useState } from 'react';
import Router from 'next/router'
import nonAuthService from '../../axios/nonAuthService';

const LogInLogic = () => {
    //Not using formik , but it will be nice. 
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        nonAuthService.getToken(
            {
                username: username,
                password: password,
            }).then(response => {
                localStorage.setItem('token', response.data.access);
                Router.push('/products')
            }).catch(error => {
                setPassword([])
                setUserName([])
                alert("Problem found, please re-enter your credentials")
            })
    }

    return { handleSubmit, setUserName, setPassword };
}

export default LogInLogic;