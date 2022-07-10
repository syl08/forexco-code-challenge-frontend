import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

export default function Loading(props: { open: boolean }) {
  const { open } = props

  return (
    <Backdrop
      open={open}
      invisible
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  )
}