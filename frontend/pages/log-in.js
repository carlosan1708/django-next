const { Grid, TextField, Container, Typography, Button } = require("@mui/material")
import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router'

const LogIn = () => {
  //Not using formik , but it will be nice. 
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    axios
      .post('http://127.0.0.1:8000/api/v1/auth/token/', {
        username: username,
        password: password,
      })
      .then(response => {
        localStorage.setItem('token', response.data.access);
        Router.push('/products')
      });
  }

  return (<Container><Grid container style={{ marginTop: '3rem' }} spacing={2}>
    <Grid item xs={12}><Typography variant="h3">Log In</Typography></Grid>
    <Grid item xs={12}>
      <TextField
        required
        id="username"
        label="Username"
        onChange={event => setUserName(event.target.value)}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        required
        id="password1"
        label="Password"
        type="password"
        onChange={event => setPassword(event.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Grid>
  </Grid>
  </Container>
  )
};

export default LogIn;
