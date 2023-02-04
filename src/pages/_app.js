import '../app/globals.css'
import MainLayout from '../components/main-layout'

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />      
      </MainLayout>
    </>
  )
}
