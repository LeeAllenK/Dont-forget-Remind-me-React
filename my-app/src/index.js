import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Signin from './googleSignin/signin'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Signin />
  </StrictMode>
)