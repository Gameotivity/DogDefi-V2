import { createPublicClient, http } from 'viem'
import { mainnet, polygon, base, bscTestnet, bsc } from 'viem/chains'
import Web3 from 'web3'

export const publicClient = createPublicClient({
    chain: bsc,
    transport: http()
})

const isProduct = 'local'

const PROVIDER_URL_BSC = 'https://bsc-rpc.publicnode.com'
const PROVIDER_URL_TESTBSC = 'https://bsc-testnet-rpc.publicnode.com'
const PROVIDER_URL_BASE = 'https://mainnet.base.org'
const PROVIDER_URL_POL = 'https://polygon.llamarpc.com'
const PROVIDER_URL_ETH = 'https://ethereum-rpc.publicnode.com'

export const web3ClientBsc = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_BSC))
export const web3ClientTestBsc = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_TESTBSC))
export const web3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_ETH))
export const baseWeb3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_BASE))
export const polWeb3Client = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL_POL))

export const web3Clients = {
    56: web3ClientBsc,
    97: web3ClientTestBsc,
    1: web3Client,
    137: polWeb3Client,
    8453: baseWeb3Client
}

export const imageUrl = 'https://shitlord-fun-backend-main.onrender.com/api/uploads/'
//  : 'https://shitlord-fun-backend-main.onrender.com/api/uploads/'

export const apiUrl = 'https://shitlord-fun-backend-main.onrender.com'
//  : 'https://shitlord-fun-backend-main.onrender.com'

export const imageUploadUrl = 'https://shitlord-fun-backend-main.onrender.com/'
//  : 'https://shitlord-fun-backend-main.onrender.com/'

export const ethPriceApiUrl = {
 1: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
 56: 'https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD',
 97: 'https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD',
 8453: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
 137: 'https://min-api.cryptocompare.com/data/price?fsym=POL&tsyms=USD',
}

export const supportedChainIds = [bsc.id]

export const chainLogos = {
    1: '/eth.svg',
    56: '/bsc.svg',
    97: '/testbsc.svg',
    137: '/polygon.svg',
    8453: '/base.svg',
}

export const feeAmounts = {
    1: 0.0012,
    8453: 0.0012,
    56: 0.02,
    137: 7.13,
    97: 0.02,
}

export const initialEth = {
    1: 2.07,
    8453: 2.07,
    56: 51.2,
    137: 12558,
    97: 51.2,
}

export const coinNames = {
    1: 'ETH',
    8453: 'ETH',
    56: 'BNB',
    97: 'BNB',
    10: 'ETH',
    137: 'POL'
}

export const featureAmounts = {
    56: [0, 0, 0, 0],
    97: [0, 0, 0, 0],
    1: [0, 0.12, 0.18, 0.24],
    8453: [0, 0.12, 0.18, 0.24],
    137: [0, 713, 1070, 1426]
}

export const scanLinks = {
    8453: 'https://basescan.org/',
    1: 'https://etherscan.io/',
    56: 'https://bscscan.com/',
    97: 'https://testnet.bscscan.com/',
    137: 'https://polygonscan.com/',
    10: 'https://optimistic.etherscan.io/'
}

export const scanApiLinks = {
    8453: 'https://api.basescan.org/api',
    1: 'https://api.etherscan.io/api',
    56: 'https://api.bscscan.com/api',
    97: 'https://api-testnet.bscscan.com/api',
    137: 'https://api.polygonscan.com/api'
}

export const apiKeys = {
    56: 'Y7TXAF2H8KCPY7AXFT7DSTBFUVH794ZCST',
    97: 'Y7TXAF2H8KCPY7AXFT7DSTBFUVH794ZCST',
}

export const chainNames = {
    1: 'eth',
    8453: 'base',
    56: 'bnb',
    97: 'bnbTest',
    137: 'polygon'
}

export const chainNames1 = {
    1: 'ethereum',
    8453: 'base',
    56: 'bsc',
    97: 'bsc',
    137: 'polygon'
}

export const melegaRouters = {
    1: '0xFF8EBf8edf1C533A02d066f852788773BdCD631C',
    56: '0xc25033218D181b27D4a2944Fbb04FC055da4EAB3',
    97: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
    137: '0x64935e2A3d8F3840445fB2DdF37FBBfc3b292EFe',
    8453: '0x1B30D21354a082EeBC66c4C5E56320759f7994e5',
}

export const melegaAddress = {
    1: '0x5911Dc98a9E1A4FfFD802C3A57cdA6bbd26Cdb76',
    56: '0x963556de0eb8138E97A85F0A86eE0acD159D210b',
    137: '0xD3e28c74177B812d1543A406aD1A97ee3C398AC2',
    8453: '0x56e46bE7714550A4Cb7bD0863BaB2680c099d8d7',
}

export default function formatNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toLocaleString() + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toLocaleString() + 'K';
    } else {
        return number.toString();
    }
}