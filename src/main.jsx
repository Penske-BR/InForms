import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AvariaForm from './formComponent/forms/AvariaForm'
import EmbarqueForm from './formComponent/forms/EmbarqueForm'
import ChangeFormModel from './formComponent/forms/ChangeFormModel'
import App from './App'

createRoot(document.getElementById('root')).render(
    <>
        <App/>
    </>
)
