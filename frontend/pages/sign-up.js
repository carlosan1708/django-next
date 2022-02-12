const { Grid, TextField, Container, Typography, Button } = require("@mui/material")

import SignUpLogic from './logic/SignUpLogic'

const SignUpPage = () => {
  const { handleSubmit, setUserName, setPassword, setPassword2 , setEmail} = SignUpLogic()

  return (<Container><Grid container style={{ marginTop: '3rem' }} spacing={2}>
    <Grid item xs={12}><Typography variant="h3">Sign Up</Typography></Grid>
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
        id="email"
        label="Email"
        onChange={event => setEmail(event.target.value)}
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
      <TextField
        required
        id="password2"
        label="Confirm Password"
        type="password"
        onChange={event => setPassword2(event.target.value)}

      />
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Grid>
  </Grid>
  </Container>
  )
};

export default SignUpPage;
