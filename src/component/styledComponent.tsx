import { InputBase, InputLabel } from '@mui/material';
import styled from '@emotion/styled';

export const StyledInput = styled(InputBase)({
  'label + &': {
    marginTop: 28,
  },
  '& .MuiInputBase-input': {
    borderRadius: 7,
    position: 'relative',
    backgroundColor: '#EFF0F6',
    border: '1px solid #EFF0F6',
    fontSize: 14,
    width: 'auto',
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
