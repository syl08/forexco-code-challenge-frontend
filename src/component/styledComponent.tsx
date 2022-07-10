import { Box, Button, InputBase, InputLabel, BoxProps } from '@mui/material';
import styled from '@emotion/styled';
import { Container } from '@mui/system';

interface StyleBoxProps extends BoxProps {
  content: string
}

export const StyledBox = styled(Box)<StyleBoxProps>(({ content }) => ({
  height: '50px',
  width: '350px',
  borderColor: '#012754',
  borderWidth: '3px',
  borderStyle: 'solid',
  position: 'relative',
  borderRadius: 6,
  '&:: before': {
    content: content,
    padding: '0 10px',
    position: 'absolute',
    color: '#012754',
    backgroundColor: '#F8F9FB',
    height: '15px',
    marginLeft: '15px',
    top: -15
  }
}))

export const RefreshButton = styled(Button)({
  textTransform: 'none',
  fontSize: 18,
  backgroundColor: '#012754',
  borderRadius: 5,
  height: '55px',
  width: '200px',
  fontWeight: 'bold',
  color: '#fff',
  border: '1px solid',
  padding: '6px 12px',
  '&:hover': {
    backgroundColor: '#012754'
  }
})

export const StyledContainer = styled(Container)({
  backgroundColor: '#EFF0F6',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const DashboardContainer = styled(Container)({
  backgroundColor: '#33428E',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const CurrencyBox = styled(Box)({
  backgroundColor: '#F8F9FB',
  height: '95vh',
  width: '580px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '3%'
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
