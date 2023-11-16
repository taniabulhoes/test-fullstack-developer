import { useState } from "react";
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"
import { darkTheme } from "../styles/themes/dark";

export default function App({ Component, pageProps }) {
  globalStyles()

  const [isDarkMode, setIsDarkMode] = useState(() => true);

  const mode = isDarkMode ? darkTheme : ''

  return (
    <Container className={mode}>
      <Component {...pageProps} />
    </Container>    
  )
}
