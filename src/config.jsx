import { http, createConfig, injected } from '@wagmi/core'
import {bsc , bscTestnet } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [bsc],
  connectors: [injected()], 
  transports: {
    [bsc.id]: http(),
   // [bscTestnet.id]: http()
  },
})