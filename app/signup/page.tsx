import {
  Container,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material'

export default function SignUpPage() {
  return (
    <div>
      <Container maxWidth="lg">
        <h1>Sign Up</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              width: '100%',
              my: 1,
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField id="name-input" label="Name" type="text" />
          </div>
          <div>
            <TextField id="email-input" label="Email" type="email" />
          </div>
          <div>
            <TextField
              id="password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="By signing up, you agree to the Terms of Service and Privacy Policy"
              />
            </FormGroup>
          </div>
          <div>
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </div>
          <div>Or with</div>
          <div>
            <Button>Sign up with Google</Button>
          </div>
          <div>
            Already have an account? <Button>Log in</Button>
          </div>
        </Box>
      </Container>
    </div>
  )
}
