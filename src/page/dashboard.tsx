import React from 'react'
import { Box, Divider, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import converterIcon from '../assets/converter-icon.png'
import converterSwapIcon from '../assets/converter-swap-icon.png'
import { CurrencyBox, StyledBox, DashboardContainer, RefreshButton } from '../component/styledComponent'

export default function Dashboard() {
  const [currency, setCurrency] = React.useState('AUD');
  const [crypto, setCrypto] = React.useState('BTC')

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  const handleCryptoChange = (event: SelectChangeEvent) => {
    setCrypto(event.target.value);
  };

  return (
    <DashboardContainer maxWidth='xl' disableGutters >
      <CurrencyBox>
        <Stack width='580px' justifyContent='center' alignItems='center' spacing={4} >
          <Stack direction='row' mb={1} >
            <img
              src={converterIcon}
              alt='converter-icon'
              loading="lazy"
              width={140}
              style={{ marginRight: 45 }}
            />
            <Box alignItems='center' justifyContent='center' flex={1} >
              <Typography variant="h2" fontWeight='bold' color='#012754' component="div">
                Currency
              </Typography>
              <Typography variant="h2" fontWeight='bold' color='#012754' component="div" ml={1.5} >
                Transfer
              </Typography>
            </Box>
          </Stack>
          <StyledBox content='"From"' >
            <Stack direction='row' justifyContent='center'>
              <FormControl size='small' sx={{ mt: 1.2, ml: 7, width: 140 }}>
                <Select
                  value={currency}
                  onChange={handleCurrencyChange}
                  variant='standard'
                  disableUnderline
                  displayEmpty
                  sx={{ color: '#012754', fontWeight: 'bold', fontSize: 18 }}
                >
                  <MenuItem value='AUD'>AUD</MenuItem>
                  <MenuItem value='USD'>USD</MenuItem>
                  <MenuItem value='EUR'>EUR</MenuItem>
                  <MenuItem value="CNY">CNY</MenuItem>
                </Select>
              </FormControl>
              <Divider orientation="vertical" variant="middle" flexItem sx={{
                borderRightWidth: 2.5, borderColor: '#012754'
              }} />
              <TextField size='small' sx={{ mt: 1.2, ml: 2, mr: 3, width: 160 }
              } inputProps={{ style: { textAlign: 'end' } }} InputProps={{ disableUnderline: true, style: { color: '#012754', fontWeight: 'bold' } }} variant="standard" />
            </Stack>
          </StyledBox>
          <img
            src={converterSwapIcon}
            alt='converter-swap-icon'
            loading="lazy"
            width={25}
          />
          <StyledBox content='"To"'>
            <Stack direction='row' justifyContent='center'>
              <FormControl size='small' sx={{ mt: 1.2, ml: 7, width: 140 }}>
                <Select
                  value={crypto}
                  onChange={handleCryptoChange}
                  variant='standard'
                  disableUnderline
                  displayEmpty
                  sx={{ color: '#012754', fontWeight: 'bold', fontSize: 18 }}
                >
                  <MenuItem value='BTC'>BTC</MenuItem>
                  <MenuItem value='ETH'>ETH</MenuItem>
                  <MenuItem value='BNB'>BNB</MenuItem>
                  <MenuItem value="USDT">USDT</MenuItem>
                </Select>
              </FormControl>
              <Divider orientation="vertical" variant="middle" flexItem sx={{
                borderRightWidth: 2.5, borderColor: '#012754'
              }} />
              <TextField size='small' sx={{ mt: 1.2, ml: 2, mr: 3, width: 160 }
              } inputProps={{ style: { textAlign: 'end' } }} InputProps={{ disableUnderline: true, style: { color: '#012754', fontWeight: 'bold' } }} variant="standard" />
            </Stack>
          </StyledBox>
          <Typography variant='h5' color='#33428E' fontWeight='bold' component='div' >
            Market Rate
          </Typography>
          <RefreshButton>Refresh</RefreshButton>
        </Stack>
      </CurrencyBox>
    </DashboardContainer >
  )
}