import React, { useState, useEffect, ChangeEvent } from 'react'
import { Box, Divider, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import converterIcon from '../assets/converter-icon.png'
import converterSwapIcon from '../assets/converter-swap-icon.png'
import { CurrencyBox, StyledBox, DashboardContainer, RefreshButton } from '../component/styledComponent'
import { useAppDispatch } from '../store/hooks'
import { getRate } from '../store/features/authSlice'
import Loading from '../component/loading'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const [rate, setRate] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState('AUD');
  const [crypto, setCrypto] = useState('BTC')
  const [currencyAmount, setCurrenyAmout] = useState('')
  const [cryptoAmount, setCryptoAmount] = useState('1')
  const [switched, setSwitched] = useState(false)

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    if (switched) {
      setCrypto(event.target.value)
    } else {
      setCurrency(event.target.value);
    }
  };

  const handleCryptoChange = (event: SelectChangeEvent) => {
    if (switched) {
      setCurrency(event.target.value)
    } else {
      setCrypto(event.target.value);
    }
  };

  const handleCurrencyAmountChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrenyAmout(event.currentTarget.value)
  }

  const handleCryptoAmountChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCryptoAmount(event.currentTarget.value)
  }

  useEffect(() => {
    setLoading(true)
    dispatch(getRate({ currency: switched ? currency : crypto, cryptocurrency: switched ? crypto : currency })).then(res => {
      const response = JSON.parse(res.payload as string)
      setLoading(false)
      if (response.status === 200) {
        setRate(response.data.rate)
      } else {

      }
    })
  }, [switched, currency, crypto])

  return (
    <DashboardContainer maxWidth='xl' disableGutters >
      <Loading open={loading} />
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
                  value={switched ? crypto : currency}
                  onChange={handleCurrencyChange}
                  variant='standard'
                  disableUnderline
                  displayEmpty
                  sx={{ color: '#012754', fontWeight: 'bold', fontSize: 18 }}
                >
                  <MenuItem value={switched ? 'BTC' : 'AUD'}>
                    {switched ? 'BTC' : 'AUD'}
                  </MenuItem>
                  <MenuItem value={switched ? 'ETH' : 'USD'}>
                    {switched ? 'ETH' : 'USD'}
                  </MenuItem>
                  <MenuItem value={switched ? 'BNB' : 'EUR'}>
                    {switched ? 'BNB' : 'EUR'}
                  </MenuItem>
                  <MenuItem value={switched ? 'USDT' : 'CNY'}>
                    {switched ? 'USDT' : 'CNY'}
                  </MenuItem>
                </Select>
              </FormControl>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  borderRightWidth: 2.5, borderColor: '#012754'
                }} />
              <TextField
                size='small'
                variant="standard"
                value={currencyAmount}
                onChange={handleCurrencyAmountChange}
                sx={{ mt: 1.2, ml: 2, mr: 3, width: 160 }
                }
                inputProps={{ style: { textAlign: 'end' } }}
                InputProps={{ disableUnderline: true, style: { color: '#012754', fontWeight: 'bold' } }}
              />
            </Stack>
          </StyledBox>
          <img
            src={converterSwapIcon}
            alt='converter-swap-icon'
            loading="lazy"
            width={25}
            style={{ cursor: 'pointer' }}
            onClick={() => setSwitched(!switched)}
          />
          <StyledBox content='"To"'>
            <Stack direction='row' justifyContent='center'>
              <FormControl size='small' sx={{ mt: 1.2, ml: 7, width: 140 }}>
                <Select
                  value={switched ? currency : crypto}
                  onChange={handleCryptoChange}
                  variant='standard'
                  disableUnderline
                  displayEmpty
                  sx={{ color: '#012754', fontWeight: 'bold', fontSize: 18 }}
                >
                  <MenuItem value={switched ? 'AUD' : 'BTC'}>
                    {switched ? 'AUD' : 'BTC'}
                  </MenuItem>
                  <MenuItem value={switched ? 'USD' : 'ETH'}>
                    {switched ? 'USD' : 'ETH'}
                  </MenuItem>
                  <MenuItem value={switched ? 'EUR' : 'BNB'}>
                    {switched ? 'EUR' : 'BNB'}
                  </MenuItem>
                  <MenuItem value={switched ? 'CNY' : 'USDT'}>
                    {switched ? 'CNY' : 'USDT'}
                  </MenuItem>
                </Select>
              </FormControl>
              <Divider orientation="vertical" variant="middle" flexItem sx={{
                borderRightWidth: 2.5, borderColor: '#012754'
              }} />
              <TextField
                size='small'
                value={cryptoAmount}
                onChange={handleCryptoAmountChange}
                sx={{ mt: 1.2, ml: 2, mr: 3, width: 160 }
                }
                inputProps={{ style: { textAlign: 'end' } }}
                InputProps={{ disableUnderline: true, style: { color: '#012754', fontWeight: 'bold' } }}
                variant="standard" />
            </Stack>
          </StyledBox>
          <Typography variant='h5' color='#33428E' fontWeight='bold' component='div' >
            Market Rate {rate}
          </Typography>
          <RefreshButton>Refresh</RefreshButton>
        </Stack>
      </CurrencyBox>
    </DashboardContainer >
  )
}