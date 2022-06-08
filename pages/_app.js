import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistStore } from "reduxjs-toolkit-persist";

import GlobalStyles from "/styles/GlobalStyles";
import { store } from "common/store";
import Loading from "components/Loading";
import ThumbNav from "components/ThumbNav";
import Script from "next/script";
import { Provider } from "react-redux";

import "cssremedy/css/remedy.css";
import "styles/App.css";

const persistor = persistStore(store);

const App = ({ Component }) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
      />
      <Script
        strategy="afterInteractive"
        id="show-banner"
        dangerouslySetInnerHTML={{
          _html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA}');`,
        }}
      />
      <GlobalStyles />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThumbNav />
          <Component />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
