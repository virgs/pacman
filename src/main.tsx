import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.tsx'
// Import our custom CSS
import './scss/styles.scss'
import './main.scss'
import 'bootswatch/dist/vapor/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
)
