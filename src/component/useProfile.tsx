import { useEffect, useState } from 'react';
import { profile } from '../store/features/authSlice';
import { useAppDispatch } from '../store/hooks';

export function useProfile() {
  const dispatch = useAppDispatch()
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    dispatch(profile()).then(res => {
      const response = JSON.parse(res.payload as string)
      if (response.status === 200) {
        setAuth(true)
      } else {
        setAuth(false)
      }
    })
  }, [])

  return auth
}