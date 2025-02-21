import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App'
import { Provider } from 'react-redux'
import { store } from './components/App/store'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
