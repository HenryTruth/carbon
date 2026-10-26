import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import ComingSoon from '@/pages/ComingSoon'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Passcode from '@/pages/Passcode'
import Splash from '@/pages/Splash'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/unlock" element={<Passcode />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/savings" element={<ComingSoon />} />
        <Route path="/payments" element={<ComingSoon />} />
        <Route path="/loans" element={<ComingSoon />} />
        <Route path="/account" element={<ComingSoon />} />
        <Route path="/cards" element={<ComingSoon />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
