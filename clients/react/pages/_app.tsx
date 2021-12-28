import {FC} from "react";

import '../styles/globals.scss'

const MyApp: FC<{Component: any, pageProps: any}> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
}

export default MyApp
