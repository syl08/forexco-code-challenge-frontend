import React, { FormEvent } from 'react'
import { Paper, Container, FormControl, Stack, Button } from '@mui/material'
import { StyledInput, StyledInputLabel } from '../component/styledComponent'

export default function Register() {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Container maxWidth='xl' disableGutters sx={{ bgcolor: '#F0F2FA', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper component='form' onSubmit={handleSubmit} elevation={0} sx={{ width: '400px', height: '400px', borderRadius: 2 }}>
        <Stack spacing={2} alignItems='center'>
          <FormControl variant="standard">
            <StyledInputLabel shrink >
              Username
            </StyledInputLabel>
            <StyledInput placeholder='Enter your username' />
          </FormControl>
          <FormControl variant="standard">
            <StyledInputLabel shrink>
              Password
            </StyledInputLabel>
            <StyledInput placeholder='Enter your password' />
          </FormControl>
          <FormControl variant="standard">
            <StyledInputLabel shrink>
              Confirm Password
            </StyledInputLabel>
            <StyledInput placeholder='Confirm your password' />
          </FormControl>
          <Button type='submit' variant='contained' >Sign up</Button>
        </Stack>
      </Paper>
    </Container>
  )
}