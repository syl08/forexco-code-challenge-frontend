import React, { useState, useEffect, ChangeEvent } from 'react'
import { Box, Button, Divider, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import converterIcon from '../assets/converter-icon.png'
import converterSwapIcon from '../assets/converter-swap-icon.png'
import { CurrencyBox, StyledBox, DashboardContainer, RefreshButton } from '../component/styledComponent'
import { useAppDispatch } from '../store/hooks'
import { getRate, logout } from '../store/features/authSlice'
import Loading from '../component/loading'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const [rate, setRate] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currency1, setCurrency1] = useState('');
  const [currency2, setCurrency2] = useState('')
  const [amount1, setAmount1] = useState('1')
  const [amount2, setAmount2] = useState('1')
  const [switched, setSwitched] = useState(false)

  const handleCurrencyChange1 = (event: SelectChangeEvent) => {
    if (switched) {
      setCurrency2(event.target.value)
    } else {
      setCurrency1(event.target.value);
    }
  };

  const handleCurrencyChange2 = (event: SelectChangeEvent) => {
    if (switched) {
      setCurrency1(event.target.value)
    } else {
      setCurrency2(event.target.value);
    }
  };

  const handleAmount1Change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseFloat(removeComma(event.target.value.replace(/[^0-9]/g, '')))
    setAmount1(value.toLocaleString())
  }

  const handleAmount2Change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseFloat(removeComma(event.target.value.replace(/[^0-9]/g, '')))
    setAmount2(value.toLocaleString())
    rate && setAmount1((value / rate).toLocaleString())
  }

  const handleRefresh = () => {
    if (currency1 && currency2) {
      setLoading(true)
      dispatch(getRate({ currency: switched ? currency2 : currency1, cryptocurrency: switched ? currency1 : currency2 })).then(res => {
        const response = JSON.parse(res.payload as string)
        setLoading(false)
        if (response.status === 200) {
          setRate(response.data.rate)
        } else {
          alert('rate not found')
          setRate(0)
        }
      })
    } else {
      alert('please select currency')
    }
  }

  const handleLogout = () => dispatch(logout())

  const removeComma = (str: string) => str.replace(/,/g, '')

  useEffect(() => {
    if (amount1 && rate) {
      const value = parseFloat(removeComma(amount1)) * rate
      setAmount2(value.toLocaleString())
    }
  }, [amount1, rate])

  useEffect(() => {
    if (currency1 && currency2) {
      setLoading(true)
      dispatch(getRate({ currency: switched ? currency2 : currency1, cryptocurrency: switched ? currency1 : currency2 })).then(res => {
        const response = JSON.parse(res.payload as string)
        setLoading(false)
        if (response.status === 200) {
          setRate(response.data.rate)
        } else {
          alert('rate not found')
          setRate(0)
        }
      })
    }
  }, [switched, currency1, currency2])

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
                  value={switched ? currency2 : currency1}
                  onChange={handleCurrencyChange1}
                  variant='standard'
                  disableUnderline
                  displayEmpty
                  sx={{ color: '#012754', fontWeight: 'bold', fontSize: 18 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={switched ? 'BTC' : 'AUD'}>
                    {switched ? 'BTC' : 'AUD'}
                  </MenuItem>
                  <MenuItem value={switched ? 'ETH' : 'USD'}>
                    {switched ? 'ETH' : 'USD'}
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
                value={amount1}
                onChange={handleAmount1Change}
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
                  value={switched ? currency1 : currency2}
                  onChange={handleCurrencyChange2}
                  variant='standard'
                  disableUnderline
                  displayEmpty
                  sx={{ color: '#012754', fontWeight: 'bold', fontSize: 18 }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={switched ? 'AUD' : 'BTC'}>
                    {switched ? 'AUD' : 'BTC'}
                  </MenuItem>
                  <MenuItem value={switched ? 'USD' : 'ETH'}>
                    {switched ? 'USD' : 'ETH'}
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
                value={amount2}
                onChange={handleAmount2Change}
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
          <RefreshButton onClick={handleRefresh}>Refresh</RefreshButton>
          <Button size='small' onClick={handleLogout} >logout</Button>
        </Stack>
      </CurrencyBox>
    </DashboardContainer >
  )
}