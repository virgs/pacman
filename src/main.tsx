import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.tsx'
// Import our custom CSS
import './scss/styles.scss'
import 'bootswatch/dist/vapor/bootstrap.min.css'
import './main.scss'
import { GithubCorner } from './components/GitHubCornerComponent.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GithubCorner></GithubCorner>
        <Root />
    </React.StrictMode>
)
