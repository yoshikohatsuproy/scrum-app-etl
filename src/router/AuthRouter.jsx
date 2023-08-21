import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'

export const AuthRouter = () => {
  return (
    <Routes>
        <Route exact path="" element={<LoginPage />} />
        <Route  path="*" element={<Navigate to="" /> }  />
    </Routes>
  )
}
