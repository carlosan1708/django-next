const { Grid, TextField, Container, Typography, Button } = require("@mui/material")
import LogInLogic from './logic/LogInLogic'

const LogIn = () => {
  const { setUserName, setPassword, handleSubmit } = LogInLogic()

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
