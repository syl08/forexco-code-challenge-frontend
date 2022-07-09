import { Button, InputBase, InputLabel } from '@mui/material';
import styled from '@emotion/styled';
import { Container } from '@mui/system';

export const RegisterContainer = styled(Container)({
  backgroundColor: '#F0F2FA',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const StyledInput = styled(InputBase)({
  'label + &': {
    marginTop: 28,
  },
  '& .MuiInputBase-input': {
    borderRadius: 7,
    backgroundColor: '#EFF0F6',
    border: '1px solid #EFF0F6',
    fontSize: 14,
    width: '300px',
    padding: '10px 10px',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#EFF0F6',
    },
  },
});

export const StyledInputLabel = styled(InputLabel)({
  fontSize: 18,
  fontWeight: 'bold',
  "&.Mui-focused": {
    color: "inherit"
  }
})

export const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: 14,
  backgroundColor: '#2F49D1',
  width: '322px',
  color: '#bcc2e8',
  border: '1px solid',
  padding: '6px 12px',
})
