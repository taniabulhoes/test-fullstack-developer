import { Inter } from 'next/font/google'
import GlobalStyle from "../styles/global.styles"
import StyledJsxRegistry from "./registry"
import ToastProvider from './toast.provider'
import 'react-toastify/dist/ReactToastify.css';
import { RouteHandler } from '@/components/routeHandler/RouteHandler'
import { Providers } from '@/redux/provider/Providers';
import { BackGround } from '@/components/backGround/BackGround';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TBTD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
       <html lang="en" suppressHydrationWarning={true} >
         <body className={inter.className} suppressHydrationWarning={true} style={{position: "relative"}}>
            <Providers>
              <ToastProvider>
                <StyledJsxRegistry>
                  <GlobalStyle/>
                      <BackGround/>
                      <div id="modal-root"></div>
                      <RouteHandler>
                        {children}
                      </RouteHandler>                   
                </StyledJsxRegistry>
              </ToastProvider> 
           </Providers>
          </body>
       </html>
  )
}
