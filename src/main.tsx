import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.tsx'
// Import our custom CSS
import './scss/styles.scss'
import 'bootswatch/dist/vapor/bootstrap.min.css'
import './main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
)
