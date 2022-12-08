import '../styles/globals.css';
import '@sweetalert2/theme-material-ui/material-ui.css';
import React, { Fragment } from 'react';                  //icons
import { appWithTranslation } from 'next-i18next';
function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <Fragment>
        <Component {...pageProps} />
    </Fragment>
  )
}

export default appWithTranslation(MyApp);
