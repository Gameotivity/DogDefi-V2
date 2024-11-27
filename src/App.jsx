import React, { useEffect } from "react";
import AllLaunches from "./container/AllLaunches";
import CreateDogDefi from "./container/CreateDogDefi.tsx";
import NotFound from "./container/NotFound";
import BuyPage from "./container/BuyPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params';
import { WagmiConfig} from 'wagmi'
import Profile from "./container/Profile.tsx";
import EditProfile from "./container/EditProfile";
// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { Web3Modal } from "@web3modal/react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import './index.css';
import AboutUs from "./container/AboutUs";
import Faq from "./container/Faq";
import {
  bsc,
  bscTestnet
} from 'wagmi/chains';
import {createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { config } from "./config.jsx";

const projectId = '75f0ab21a52cbff7e566bcc9be983646'

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [
//     bsc,
//   ],
//   [w3mProvider({ projectId })],
// )

// export const config = createConfig({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: {
//         appName: 'wagmi',
//       },
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         projectId: projectId,
//       },
//     }),
//     new InjectedConnector({
//       chains,
//       options: {
//         name: 'Injected',
//         shimDisconnect: true,
//       },
//     }),
//   ],
//   publicClient,
//   webSocketPublicClient,
// })

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient
// })

// const projectId = '474ca359092dc34eded94e781bdf7822';

const metadata = {
    name: 'Dogdefi',
    description: 'Dogdefi Wagmi',
    url: 'https://dogdefi.fun',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
  

const chains = [
  bsc,
  // bscTestnet
];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId
});

// const ethereumClient = new EthereumClient(wagmiConfig, chains);

const App = () => {
  return (
    <Router>
      <QueryParamProvider>
        <div>
          <WagmiConfig config={wagmiConfig}>
            <Toaster
              position="top-right"
              reverseOrder={true}
              toastOptions={{ duration: 5000 }}
            >
              {(t) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toast.dismiss(t.id)}
                >
                  <ToastBar onClick={() => alert(1)} toast={t} />
                </div>
              )}
            </Toaster>
            <Switch>
              <Route exact path="/">
                <AllLaunches />
              </Route>
              {/* <Route exact path="/MyContributions">
                <MyContributions />
              </Route> */}
              <Route exact path="/AllLaunches">
                <AllLaunches />
              </Route>
              <Route exact path="/CreateDogDefi">
                <CreateDogDefi />
              </Route>
              <Route exact path="/Buy">
                <BuyPage />
              </Route>
              <Route exact path="/Profile">
                <Profile />
              </Route>
              <Route exact path="/EditProfile">
                <EditProfile />
              </Route>
              <Route exact path="/about-us">
              <AboutUs />
            </Route>
            <Route exact path="/FAQ">
              <Faq />
            </Route>
              <Route exact path="/NotFound">
                <NotFound />
              </Route>
            </Switch>
          </WagmiConfig>
          {/* <Web3Modal
            projectId={projectId}
            ethereumClient={ethereumClient}
          /> */}
        </div>
      </QueryParamProvider>
    </Router>
  );
};

export default App;
