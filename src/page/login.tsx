import React, { useState, FormEvent, FocusEvent, ChangeEvent } from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, Link, Paper, Stack, Typography } from '@mui/material'
import { StyledContainer, StyledInputLabel, StyledInput, StyledButton } from '../component/styledComponent'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/features/authSlice'

export default function Login() {
  const dispatch = useAppDispatch()
  const [data, setData] = useState({ username: '', password: '' })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(' ')

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: 'username' | 'password') => {
    setData({ ...data, [key]: event.currentTarget.value })
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(false)
    setErrorMessage(' ')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!data.username || !data.password) {
      setError(true)
      setErrorMessage('* Username or password cannot be empty')
    }
    dispatch(login({ username: data.username, password: data.password })).then(res => {
      const response = JSON.parse(res.payload as string)
      switch (response.status) {
        case 200:
          break
        case 401: setError(true)
          setErrorMessage('* Username or password not match')
          break
        case 500: setError(true)
          setErrorMessage('* Internal server error')
      }
    })
  }

  return (
    <StyledContainer maxWidth='xl' disableGutters >
      <Stack display='flex' justifyContent='center' alignItems='center' >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }} component="div">
          Welcome back!
        </Typography>
        <Typography variant="subtitle2" color='#a39e8e' gutterBottom component="div" marginBottom={2}>
          Sign in to your account to continue
        </Typography>
        <Paper component='form' onSubmit={handleSubmit} elevation={0} sx={{ width: '400px', height: '400px', borderRadius: 2 }}>
          <Stack display='flex' spacing={2} justifyContent='center' alignItems='center' height='400px'>
            <FormControl variant="standard" >
              <StyledInputLabel shrink >
                Username
              </StyledInputLabel>
              <StyledInput
                placeholder='Enter your username'
                value={data.username}
                onChange={e => handleChange(e, 'username')}
                onFocus={handleFocus}
              />
            </FormControl>
            <FormControl variant="standard">
              <StyledInputLabel shrink>
                Password
              </StyledInputLabel>
              <StyledInput
                placeholder='Enter your password'
                value={data.password}
                onChange={e => handleChange(e, 'password')}
                onFocus={handleFocus}
              />
              <FormHelperText error={error}>{errorMessage}</FormHelperText>
            </FormControl>
            <Box width='322px'>
              <Link href="#" underline="none" sx={{ fontSize: 14, fontWeight: 'bold', color: '#5887FF' }}>
                Forgot your password?
              </Link>
            </Box>
            <Box width='322px'>
              <FormControlLabel
                control={<Checkbox size='small' sx={{ color: '#e3dcc8', borderRadius: 5 }} />}
                label={<Typography color='#a39e8e' variant="body2">Remember me next time</Typography>} />
            </Box>
            <StyledButton type='submit' variant='contained' >Sign in</StyledButton>
          </Stack>
        </Paper>
      </Stack>
    </StyledContainer>
  )
}