/* eslint-disable react/jsx-filename-extension */
import AppBaseCard from './components/AppBaseCard'
import './globals.scss'

export const metadata = {
  title: 'Deacuerdo!',
  description: 'La aplicacion para tomar decisiones en grupo',
}

export default function RootLayout({ children }) {
  return (
    <html className='h-100' lang='es'>
      <body className='d-flex justify-content-center align-items-center h-100'>
        <AppBaseCard>
          {children}
        </AppBaseCard>
      </body>
    </html>
  )
}
