import React, { FormEvent, useState, ChangeEvent, FocusEvent } from 'react'
import { Paper, FormControl, Stack, FormHelperText } from '@mui/material'
import { RegisterContainer, StyledButton, StyledInput, StyledInputLabel } from '../component/styledComponent'
import { useAppDispatch } from '../store/hooks'
import { register } from '../store/features/authSlice'

export default function Register() {
  const dispatch = useAppDispatch()
  const [data, setData] = useState({ username: '', password: '', confirmPassowrd: '' })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(' ')

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: 'username' | 'password' | 'confirmPassowrd') => {
    setData({ ...data, [key]: event.currentTarget.value })
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(false)
    setErrorMessage(' ')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!data.username || !data.password || !data.confirmPassowrd) {
      setError(true)
      setErrorMessage('* Field cannot be empty')
      return
    }
    if (data.password !== data.confirmPassowrd) {
      setError(true)
      setErrorMessage('* Password not match')
      return
    }
    dispatch(register({ username: data.username, password: data.password })).then(res => {
      const response = JSON.parse(res.payload as string)
      switch (response.status) {
        case 201: console.log('user created')
          break
        case 409: setError(true)
          setErrorMessage('* Username exists')
          break
        case 500: setError(true)
          setErrorMessage('* Internal server error')
      }
    })
  }

  return (
    <RegisterContainer maxWidth='xl' disableGutters >
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
          </FormControl>
          <FormControl variant="standard">
            <StyledInputLabel shrink>
              Confirm Password
            </StyledInputLabel>
            <StyledInput
              placeholder='Confirm your password'
              value={data.confirmPassowrd}
              onChange={e => handleChange(e, 'confirmPassowrd')}
              onFocus={handleFocus}
            />
            <FormHelperText error={error}>{errorMessage}</FormHelperText>
          </FormControl>
          <StyledButton type='submit' variant='contained' >Sign up</StyledButton>
        </Stack>
      </Paper>
    </RegisterContainer>
  )
}