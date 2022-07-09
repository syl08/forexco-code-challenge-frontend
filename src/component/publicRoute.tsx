import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '../store/hooks'

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { authenticated } = useAppSelector(state => state.auth)
  const location = useLocation()

  if (authenticated) { return <Navigate to='/dashboard' state={{ from: location }} /> }

  return children
}