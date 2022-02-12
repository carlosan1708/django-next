import { useState } from 'react';
import Router from 'next/router'
import nonAuthService from '../../axios/nonAuthService';
const SignUpLogic = () => {
    //Not using formik , but it will be nice. 
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleSubmit = () => {
        nonAuthService.createUser({
            email: email,
            username: username,
            password: password,
            password2: password2
        }).then(response => {
            Router.push('/log-in')
        }).catch(error => alert(JSON.parse(error)))
    }

    return { handleSubmit, setUserName, setPassword, setPassword2 ,setEmail };
}

export default SignUpLogic;


