import NavBar from '@/components/navBar';
import type { AppProps } from 'next/app'

function SafeHydrate({ children }:any) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return( 
    <SafeHydrate>
      <NavBar />
      <div style={{marginTop: '75px'}}>
      <Component suppressHydrationWarning {...pageProps} />
      </div>
    </SafeHydrate>
  );
}