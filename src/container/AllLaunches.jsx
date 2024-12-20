/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import { useState, useEffect, useCallback, useRef } from 'react'
import { readContract } from '@wagmi/core'
import '../App.css'
import ChadAbi from '../config/DogDefiAbi.json'
import MultiCallAbi from '../config/MultiCallAbi.json'
import '../styles/MainContainer.css'
import LaunchpadCard from '../components/LaunchpadCard'
import ClipLoader from 'react-spinners/ClipLoader'
import Partner from '../components/Partner.jsx'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { useSpring, animated } from 'react-spring'
import Cookies from 'universal-cookie';
import { imageUrl, ethPriceApiUrl, supportedChainIds, chainLogos, melegaRouters, apiUrl } from '../utils/constants.ts'
import { getMulticallAddress, getDefaultAddress } from '../utils/addressHelpers.ts'
import Slider from '../components/Slider.jsx'
import footericon from '../../public/img/dogdefi.png'
import { config } from '../config.jsx'
import { useAccount } from 'wagmi'
import { isConstructorDeclaration } from 'typescript'

const App = () => {
  const { address, chainId } = useAccount();
  let [loading, setLoading] = useState(false)
  const [chadLists, setChadListData] = useState([])
  const [currentLength,] = useState(0)
  const cookies = new Cookies();
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [tokenPrice, setTokenPrice] = useState(0)

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true)

        if (!cookies.get("show-how-it-works")) {
          setModalIsOpen(true)
        }

        for (const chainId of supportedChainIds) {
          const ethPriceResponse = await fetch(ethPriceApiUrl[chainId], { method: 'GET' });
          const ethPriceData = await ethPriceResponse.json();
          const ethPrice = ethPriceData.USD;

          const mainInfo = await readContract(config, {
            address: getMulticallAddress(chainId),
            abi: MultiCallAbi,
            functionName: 'getMainInfo',
            chainId: chainId
          })

          const otherInfo = await readContract(config, {
            address: getMulticallAddress(chainId),
            abi: MultiCallAbi,
            functionName: 'getOtherInfo',
            chainId: chainId
          })

          // const featureInfo = await readContract(config, {
          //   address: getMulticallAddress(chainId),
          //   abi: MultiCallAbi,
          //   functionName: 'getFeaturedTimesInfo',
          //   chainId: chainId
          // })

          const routerInfo = await readContract(config, {
            address: getMulticallAddress(chainId),
            abi: MultiCallAbi,
            functionName: 'getRouterInfo',
            chainId: chainId
          })

          const lpCreatedInfo = await readContract(config, {
            address: getMulticallAddress(chainId),
            abi: MultiCallAbi,
            functionName: 'getLpCreatedInfo',
            chainId: chainId
          })

          if (mainInfo[0].length > 0) {
            for (let i = mainInfo[0].length - 1; i >= 0; i--) {
              let startTime = Number(mainInfo[0][i])
              const lpCreated = lpCreatedInfo[i]
              let progress
              const contractAddress = mainInfo[5][i]
              const ChadInfo = await readContract(config, {
                address: contractAddress,
                abi: ChadAbi,
                functionName: 'getFunBasicInfo',
                chainId: Number(chainId)
              })

              const virtualLpAmounts = Number(mainInfo[2][i]) * ethPrice
              const virtualLpTokenAmounts = Number(mainInfo[1][i]) / 10 ** 18
              const tokenPrice = Number(mainInfo[3][i]) * ethPrice / 10 ** 12
              setTokenPrice(tokenPrice)

              const website = otherInfo[2][i]
              const twitter = otherInfo[3][i]
              const telegram = otherInfo[4][i]
              progress = lpCreated ? 100 : Math.floor(Number(ChadInfo[0][10]) * 10000) / 10000 * 100 / 150 / 10**18

              const liquidity = virtualLpAmounts * 2
              const name = otherInfo[0][i]
              const symbol = otherInfo[1][i]
              let logoUrl = imageUrl + contractAddress + '-logo.png'
              let bannerUrl = imageUrl + contractAddress + '-banner.png'
              let blockchainLogoUrl = chainLogos[chainId]
              let devAddress = mainInfo[6][i]
              let raisingPercent = Number(otherInfo[6][i]) / 100;
              let dexAddress = routerInfo[i]
              let dexName = 'PancakeSwap'
              // const featureTime = Number(featureInfo[i])

              const featureTime = 0
              const chadData = {
                chainId,
                startTime: startTime,
                progress: progress,
                Liquidity: liquidity,
                tokenName: name,
                tokenSymbol: symbol,
                logoUrl: logoUrl,
                bannerUrl: bannerUrl,
                address: mainInfo[5][i],
                depositedAmount: Number(mainInfo[4][i]) * ethPrice / 10 ** 18,
                contractAddress: contractAddress,
                dexAddress: dexAddress,
                devAddress: devAddress,
                dexName: dexName,
                marketCap: Number(ChadInfo[0][0]) * tokenPrice / 10 ** 18,
                website: website,
                twitter: twitter,
                telegram: telegram,
                blockchainLogoUrl: blockchainLogoUrl,
                raisingPercent: raisingPercent,
                featureTime,
                lpCreated,
              }
              setChadListData(prevState => [...prevState, chadData])
            }
          }
        }

        setLoading(false)
      } catch (e) {
        setLoading(false)
        console.error(e)
      }
    }
    FetchData()
  }, []);

  const sortOptions = [
    { value: 'Market Cap', label: 'Market Cap' },
    { value: 'Time', label: 'Time' },
    { value: 'Volume', label: 'Volume' },
    { value: 'Last Reply', label: 'Last Reply' }
  ]

  const orderOptions = [
    { value: 'Descending', label: 'Descending' },
    { value: 'Ascending', label: 'Ascending' }
  ]

  const statusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Listed', label: 'Listed' },
    { value: 'Live', label: 'Live' }
  ]

  function FilterSelect({ options, defaultValue, onChange }) {
    const handleChange = newValue => {
      onChange(newValue)
    }

    return (
      <Select
        defaultValue={defaultValue}
        isSearchable={false}
        options={options}
        value={options.find(option => option.value === defaultValue.value)}
        onChange={handleChange}
        styles={{
          control: styles => ({
            ...styles,
            color: 'black',
            padding: '4px 0px',
            backgroundColor: '#f3f3f3',
            border: '1px solid black',
            boxShadow: 'rgb(0, 0, 0) 1px 1px 0px 0px',
            borderRadius: '25px',
            cursor: 'pointer',
            outline: 'none',
            '&:hover': {
              boxShadow: 'rgb(0, 0, 0) 1px 1px 0px 0px',
            },
            '&:focus': {
              boxShadow: 'rgb(0, 0, 0) 1px 1px 0px 0px',
            },
            '&:active': {
              boxShadow: 'rgb(0, 0, 0) 1px 1px 0px 0px',
            }
          }),
          option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isFocused ? isSelected ? '#00f3ef' : '#00f3ef' : '#f3f3f3',
            color: 'black',
            cursor: 'pointer'
          }),
          singleValue: (styles, { isFocused }) => ({
            ...styles,
            color: 'black',
            outline: 'none',
          }),
          indicatorSeparator: styles => ({
            ...styles,
            display: 'none'
          }),
          dropdownIndicator: styles => ({
            ...styles,
            color: 'black'
          }),
          menuList: styles => ({
            ...styles,
            background: '#f3f3f3',
            borderRadius: '5px'
          })
        }}
      />
    )
  }

  const [sortedChadLists, setSortedChadLists] = useState([])
  const [filteredChadLists, setFilteredChadLists] = useState([])
  const [sortValue, setSortValue] = useState(sortOptions[0])
  const [orderValue, setOrderValue] = useState(orderOptions[0])
  const [statusValue, setStatusValue] = useState(statusOptions[0])

  const filterChadLists = useCallback(() => {
    const searchFiltered = chadLists.filter((list) => {
      if (!search || search === '') {
        return true
      }

      const searchLower = search.toLowerCase()

      if (list.tokenName.toLowerCase().includes(searchLower)) {
        return true
      }
    })
    let filteredList = []
    switch (statusValue.value) {
      case 'All':
        filteredList = [...searchFiltered]
        break
      case 'Listed':
        filteredList = [...searchFiltered.filter(item => item.progress >= 100)] // TODO: Add filtering logic for "Listed" condition
        break
      case 'Live':
        filteredList = [...searchFiltered.filter(item => item.progress < 100)] // TODO: Add filtering logic for "Live" condition
        break
      default:
        break
    }
    setFilteredChadLists(filteredList)
  }, [statusValue, chadLists, search])

  const onSearchChanged = (event) => {
    setSearch(event.target.value);
  };

  const sortChadLists = useCallback(async () => {
    const latestChatsRes = await fetch(apiUrl + `/api/getLatestChats`, { method: 'GET' })
    const latestChats = await latestChatsRes.json()
    let sortedList = []
    const timestampMap = new Map(
      latestChats.map(chat => [chat.ChadAddress, chat.timestamp])
    );
    switch (sortValue.value) {
      case 'Market Cap':
        sortedList = [...filteredChadLists].sort((a, b) => {
          if (orderValue.value === 'Ascending') {
            return a.marketCap - b.marketCap
          } else {
            return b.marketCap - a.marketCap
          }
        })
        break
      case 'Time':
        sortedList = [...filteredChadLists].sort((a, b) => {
          if (orderValue.value === 'Ascending') {
            return a.startTime - b.startTime
          } else {
            return b.startTime - a.startTime
          }
        })
        break
      case 'Volume':
        sortedList = [...filteredChadLists].sort((a, b) => {
          if (orderValue.value === 'Ascending') {
            return a.depositedAmount - b.depositedAmount
          } else {
            return b.depositedAmount - a.depositedAmount
          }
        })
        break
      case 'Last Reply':
        sortedList = [...filteredChadLists].sort((a, b) => {
          if (orderValue.value === 'Ascending') {
            const timestampA = timestampMap.get(a.contractAddress) || 0;
            const timestampB = timestampMap.get(b.contractAddress) || 0;
            console.log('asce', timestampA, timestampB)

            return timestampA - timestampB;
          } else {
            const timestampA = timestampMap.get(a.contractAddress) || 0;
            const timestampB = timestampMap.get(b.contractAddress) || 0;

            return timestampB - timestampA;
          }
        })
        break
      default:
        break
    }
    setSortedChadLists(sortedList)
  }, [orderValue, sortValue, filteredChadLists])

  useEffect(() => {
    setFilteredChadLists([...chadLists])
  }, [chadLists, statusValue])

  useEffect(() => {
    filterChadLists()
  }, [statusValue, filterChadLists])

  useEffect(() => {
    sortChadLists()
  }, [orderValue, sortValue, filteredChadLists, sortChadLists])

  const onSortChange = newValue => {
    setSortValue(newValue)
    sortChadLists()
  }

  const onOrderChange = () => {
    if (orderValue.value === 'Descending')
      setOrderValue(orderOptions[1])
    else
      setOrderValue(orderOptions[0])
    sortChadLists()
  }

  const onStatusChange = newValue => {
    setStatusValue(newValue)
    filterChadLists()
  }
  // const [isHovering, setIsHovering] = useState(false);
  // const handleMouseEnter = () => {
  //   setIsHovering(true);
  //   setIsHovering(false);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovering(false);
  // };

  const LaunchpadCardGrid = ({ items, key }) => {

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" key={key}>
        {items.map(
          (
            {
              chainId,
              progress,
              Liquidity,
              tokenName,
              logoUrl,
              bannerUrl,
              address,
              depositedAmount,
              contractAddress,
              dexAddress,
              devAddress,
              dexName,
              marketCap,
              website,
              twitter,
              telegram,
              blockchainLogoUrl,
              raisingPercent
            },
            i
          ) => (
            <LaunchpadCard
              chainId={chainId}
              progress={progress}
              Liquidity={Liquidity}
              tokenName={tokenName}
              Logo={<img src={logoUrl} className="claim-card-logo" />}
              Banner={bannerUrl}
              chadAddress={address}
              depositedAmount={depositedAmount}
              contractAddress={contractAddress}
              dexAddress={dexAddress}
              devAddress={devAddress}
              dexName={dexName}
              marketCap={marketCap}
              website={website}
              twitter={twitter}
              telegram={telegram}
              BlockchainLogo={
                <img
                  src={blockchainLogoUrl}
                  className="launchpad-blockchain-logo"
                />
              }
              raisingPercent={raisingPercent}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
              tokenPrice={tokenPrice}
            />
          )
        )}
      </div>
    )
  }

  // Modal Section
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
    cookies.set("show-how-it-works", "true")
  }

  const closeModal = e => {
    if (e.target.id === 'modal') {
      setModalIsOpen(false)
      cookies.set("show-how-it-works", "true")
    }
  }

  const modalContent = (
    <div
      id="modal"
      onClick={closeModal}
      className={`modal ${modalIsOpen ? 'show-modal' : ''}`}
    >
      <div className="bg-[#f3f3f3] rounded-[25px] max-w-[480px] p-[24px]">
        <h1 className='text-center text-xl pb-2 font-extrabold'>All created tokens in DOGDEFI are safe!</h1>
        <p className='text-[#222]'>✅Each coin is a fair-launch with no presale and no team allocation.</p>
        <p className='text-[#222]'>✅Everyone has equal chance!</p>
        <h1 className='text-center text-xl pb-2 font-extrabold'>How it works</h1>
        <p className='text-[#222]'>1️⃣ pick a coin that you like</p>
        <p className='text-[#222]'>2️⃣ buy the coin on the bonding curve</p>
        <p className='text-[#222]'>3️⃣ sell at any time to lock in your profits or losses</p>
        <p className='text-[#222]'>4️⃣ when enough people buy on the bonding curve it reaches 150 bnb and the token will be listed with liquidity deposited in the preferred DEX.</p>
        <p className='text-[#222] mb-4'>5️⃣LP Tokens will be burned🔥</p>
        <p className='text-[#222] italic text-[14px]'>Disclaimer:</p>
        <p className='text-[#222] italic text-[14px]'>Trading tokens is highly risky / speculative. Do not invest more than you can afford to lose. Anyone can list a token, listing does not mean we endorse the token. Token prices can be extremely volatile. Be sure to follow any legal guidelines that your country specifies.</p>
        <div className='text-center mt-4'>
          <button onClick={toggleModal} className="rounded-full bg-[#2f6434] px-4 py-3 text-white">
            I'm ready to pump
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <style jsx>{`
        .modal {
          opacity: 0;
          visibility: hidden;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .show-modal {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
      {modalContent}
      <div className="GlobalContainer launches-all-padding">
        <div>
          <TopBar />
          <div className="max-w-7xl m-auto pt-36 pb-24 px-4 sm:px-12 sm:py-10">
            <div className='my-6 flex m-auto justify-center'>
              { address ? 
              chainId === 56 ? 
              <Link to="/CreateDogDefi" className="transform transition-transform duration-200 hover:scale-110 rounded-full bg-[#fff] px-6 py-4 text-base sm:text-xl font-bold sm:font-extrabold border border-black h-[48px] sm:h-[60px] text-[22px] flex items-center" style={{ boxShadow: "rgb(0, 0, 0) 1px 3px 0px 0px" }}>
                Create Token
              </Link> : 
              <div style={{color: 'red'}}> Please switch to BSC</div> :
              <div style={{color: 'red'}}> Please Connect Wallet</div>
              }
            </div>
            <div className='grid xl:grid-cols-2 gap-12'>
              <div className='flex flex-col'>
                <div className='text-center text-[#f3cc2f] text-xl mb-1.5'>Market Cap Ranking</div>
                <div className='bg-[#f3cc2f] rounded-[25px] lg:px-8 px-2.5 py-5' style={{ boxShadow: "#676767 0px 5px 10px 0px" }}>
                  <div className="w-full text-xs sm:text-sm">
                    <div className='grid grid-cols-6 text-[#0f0f0f]'>
                      <div className="uppercase text-center px-2 py-3">Rank</div>
                      <div className="uppercase text-center px-2 py-3 col-span-2">Token Name</div>
                      <div className='uppercase text-center px-2 py-3'>MarketCap</div>
                      <div className='uppercase text-center px-2 py-3 col-span-2'>Progress</div>
                    </div>
                    <div className='gap-2 flex flex-col text-[#f8ffe8] overflow-y-auto no-scrollbar h-[268px]'>
                      {loading && (
                        <div className='bg-[#0d0d0d] rounded-full'>
                          <div className="px-4 py-3 text-center">Loading...</div>
                        </div>
                      )}
                      {!loading && chadLists?.length === 0 && (
                        <div className='bg-[#0d0d0d] rounded-full'>
                          <div className="px-4 py-2.5 text-center">No Data</div>
                        </div>
                      )}
                      {!loading && chadLists && chadLists.sort((a, b) => b.marketCap - a.marketCap).slice(0, 10).map((pool, index) => (
                        <Link to={`/buy/?chain=${pool.chainId}&address=${pool.address}`}>
                          <div key={index} className='grid grid-cols-6 bg-[#0d0d0d] rounded-[25px] items-center text-xs sm:text-sm'>
                            <div className="px-2 sm:px-4 py-2.5 rounded-l-[25px] text-center">{index + 1}</div>
                            <div className="py-2.5 font-semibold lg:font-normal col-span-2">
                              <div className='flex flex-row items-center text-[#f3cc2f] border border-[#f3cc2f] rounded-full w-fit'>
                                <img src={pool.logoUrl} className='h-[30px] w-[30px] rounded-full' />
                                <div className='text-[10px] sm:text-[12px] inline-block whitespace-nowrap overflow-hidden w-24 mx-1 sm:mx-3 overflow-hidden'>{pool.tokenName}</div>
                              </div>
                            </div>
                            <div className="px-2 sm:px-4 py-2.5">${Number(pool.marketCap).toLocaleString()}</div>
                            <div className="px-2 sm:px-4 py-2.5 rounded-r-[25px] col-span-2">
                              <div className='flex flex-col items-center sm:w-full w-10/12'>
                                <div className='bg-clip-text text-transparent bg-gradient-to-r from-[#F09242] to-[#FFD586]'>{Number(pool.progress > 100 ? 100 : pool.progress).toLocaleString()}%</div>
                                <div className="launchpad-progress-bar h-[8px]">
                                  {/* {pool.raisingPercent}% */}
                                  <div
                                    className="launchpad-progress-bar-filled h-[6px]"
                                    style={{ width: `${pool.progress > 100 ? 100 : pool.progress}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='text-center text-[#f3cc2f] text-xl mb-1.5'>24Hours Gainers Ranking</div>
                <div className='bg-[#f3cc2f] rounded-[25px] lg:px-8 px-2.5 py-5' style={{ boxShadow: "#676767 0px 5px 10px 0px" }}>
                  <div className="w-full text-xs sm:text-sm">
                    <div className='grid grid-cols-6 text-[#0f0f0f]'>
                      <div className="uppercase text-center px-2 py-3">Rank</div>
                      <div className="uppercase text-center px-2 py-3 col-span-2">Token Name</div>
                      <div className='uppercase text-center px-2 py-3'>MarketCap</div>
                      <div className='uppercase text-center px-2 py-3 col-span-2'>Rise</div>
                    </div>

                    <div className='gap-2 flex flex-col text-[#f8ffe8] overflow-y-auto no-scrollbar h-[268px]'>
                      {loading && (
                        <div className='bg-[#0d0d0d] rounded-full'>
                          <div className="px-4 py-3 text-center">Loading...</div>
                        </div>
                      )}
                      {!loading && !loading && chadLists?.length === 0 && (
                        <div className='bg-[#0d0d0d] rounded-full'>
                          <div className="px-4 py-2.5 text-center">No Data</div>
                        </div>
                      )}
                      {!loading && chadLists && chadLists.sort((a, b) => b.raisingPercent - a.raisingPercent).slice(0, 10).map((pool, index) => (
                        <Link to={`/buy/?chain=${pool.chainId}&address=${pool.address}`}>
                          <div key={index} className='grid grid-cols-6 bg-[#0d0d0d] rounded-[25px] items-center text-xs sm:text-sm'>
                            <div className="px-2 sm:px-4 py-2.5 rounded-l-[25px] text-center">{index + 1}</div>
                            <div className="px-2 sm:px-4 py-2.5 rounded-r-[25px] col-span-2">
                              <div className='flex flex-row items-center text-[#f3cc2f] border border-[#f3cc2f] rounded-full w-fit'>
                                <img src={pool.logoUrl} className='h-[30px] w-[30px] rounded-full' />
                                <div className='text-[10px] sm:text-[12px] inline-block whitespace-nowrap overflow-hidden w-24 mx-1 sm:mx-3 overflow-hidden'>{pool.tokenName}</div>
                              </div>
                            </div>
                            <div className="px-2 sm:px-4 py-2.5">${Number(pool.marketCap).toLocaleString()}</div>
                            <div className="flex gap-1 justify-center text-[#75f951df] px-2 sm:px-4 py-2.5 rounded-r-[25px] col-span-2">
                              {pool.raisingPercent}%
                              <svg fill="#545C68" viewBox="0 0 11 18" width="11" className="animation-increasing"><g><path d="M3.21533 7.62257V16.9824C3.21533 17.5347 3.64908 17.9998 4.34309 17.9998H6.48294C7.03236 17.9998 7.6107 17.5638 7.6107 16.9824V7.62257H9.75056C10.994 7.62257 11.341 6.80866 10.647 5.90756L6.80103 0.67534C6.13594 -0.225764 4.97926 -0.225764 4.1985 0.67534L0.352553 5.90756C-0.341453 6.83773 0.00554999 7.62257 1.24898 7.62257H3.21533Z"></path></g></svg>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {chadLists.filter(item => item.progress >= 100).length > 0 && <div className='flex flex-col mt-[36px] xl:mt-[18px]'>
              <div className='text-[#f3f3f3] text-xl'>Listed Projects</div>
              <Slider items={chadLists.filter(item => item.progress >= 100)} isListed={true} />
            </div>}
            {chadLists.filter(item => item.featureTime >= Date.now() / 1000).length > 0 && <div className='flex flex-col mt-[36px] xl:mt-[18px]'>
              <div className='text-[#f3f3f3] text-xl'>Featured Projects</div>
              <Slider items={chadLists.filter(item => item.featureTime >= Date.now() / 1000)} isListed={false} />
            </div>}
            <div className="py-[32px] w-full h-auto">
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-2.5 h-full justify-between">
                <div
                  className="border border-[#f3f3f3] rounded-full relative w-full xl:w-[calc(1200px_-_435px)] lg:w-[calc(100vw_-_484px)] h-10 lg:h-full">
                  <svg fill="#222" viewBox="0 0 18 18" width="18" className="top-3 left-[14px] absolute">
                    <g>
                      <path
                        d="M7.75987 15.5197C3.48078 15.5197 0 12.039 0 7.75987C0 3.48078 3.48078 0 7.75987 0C12.039 0 15.5197 3.48078 15.5197 7.75987C15.5197 12.039 12.039 15.5197 7.75987 15.5197ZM7.75987 1.90911C4.53381 1.90911 1.90911 4.53381 1.90911 7.75855C1.90911 10.9833 4.53381 13.608 7.75987 13.608C10.9859 13.608 13.6106 10.9833 13.6106 7.75855C13.6106 4.53381 10.9859 1.91042 7.75987 1.91042V1.90911Z">
                      </path>
                      <path
                        d="M16.8235 17.9987C16.5228 17.9987 16.2221 17.8845 15.9924 17.6547L11.9378 13.6001C11.4783 13.1406 11.4783 12.3974 11.9378 11.9379C12.3974 11.4783 13.1418 11.4783 13.6001 11.9379L17.6546 15.9924C18.1142 16.452 18.1142 17.1951 17.6546 17.6547C17.4249 17.8845 17.1242 17.9987 16.8235 17.9987Z">
                      </path>
                    </g>
                  </svg>
                  <input
                    className="bg-transparent placeholder:text-[#222] placeholder:text-sm focus:outline-none py-[12px] pr-8 pl-[44px] border rounded-2xl w-full h-full text-[#f8ffe8]"
                    placeholder="Search Token"
                    onChange={onSearchChanged} />
                </div>
                <div className='flex flex-row gap-2 text-[14px]'>
                  <FilterSelect
                    options={sortOptions}
                    defaultValue={sortValue}
                    onChange={onSortChange}
                  />
                  <FilterSelect
                    options={statusOptions}
                    defaultValue={statusValue}
                    onChange={onStatusChange}
                  />
                  <button className='bg-[#f3f3f3] rounded-full p-2' onClick={onOrderChange} style={{
                    border: '1px solid black',
                    boxShadow: 'rgb(0, 0, 0) 1px 1px 0px 0px',
                    borderRadius: '25px'
                  }}>
                    {orderValue.label === 'Ascending' ?
                      <svg fill="#545C68" viewBox="0 0 21 17" width="21" className="fill-primary transition-transform "><g><path d="M17.2974 12.6684L19.0757 10.8901C19.5165 10.4493 20.2292 10.4493 20.67 10.8901C21.1109 11.331 21.1109 12.0437 20.67 12.4845L17.0607 16.0925C16.9025 16.2953 16.6807 16.4387 16.4306 16.4982C15.8274 16.651 15.2148 16.2872 15.062 15.6841C15.0228 15.5299 15.0174 15.3703 15.0444 15.2135V1.12783C15.0444 0.505763 15.5488 0 16.1723 0C16.7957 0 17.3001 0.504411 17.3001 1.12783V12.6684H17.2974ZM1.12783 1.45373H10.8942C11.5163 1.45373 12.022 1.95814 12.022 2.58156C12.022 3.20497 11.5176 3.70938 10.8942 3.70938H1.12783C0.504411 3.70803 0 3.20362 0 2.5802C0 1.95679 0.504411 1.45373 1.12783 1.45373ZM1.12783 7.46474H10.8942C11.5163 7.44446 12.0383 7.93264 12.0585 8.5547C12.0788 9.17677 11.5906 9.69876 10.9686 9.71904C10.9442 9.71904 10.9185 9.71904 10.8942 9.71904H1.12783C0.505763 9.71904 0 9.21463 0 8.59122C0 7.9678 0.504411 7.46339 1.12783 7.46339V7.46474ZM1.12783 13.4758H10.8942C11.5163 13.4758 12.022 13.9802 12.022 14.6036C12.022 15.227 11.5176 15.7314 10.8942 15.7314H1.12783C0.505763 15.7314 0 15.227 0 14.6036C0 13.9802 0.504411 13.4758 1.12783 13.4758Z"></path></g></svg>
                      :
                      <svg fill="#545C68" viewBox="0 0 21 17" width="21" className="fill-primary transition-transform rotate-180"><g><path d="M17.2974 12.6684L19.0757 10.8901C19.5165 10.4493 20.2292 10.4493 20.67 10.8901C21.1109 11.331 21.1109 12.0437 20.67 12.4845L17.0607 16.0925C16.9025 16.2953 16.6807 16.4387 16.4306 16.4982C15.8274 16.651 15.2148 16.2872 15.062 15.6841C15.0228 15.5299 15.0174 15.3703 15.0444 15.2135V1.12783C15.0444 0.505763 15.5488 0 16.1723 0C16.7957 0 17.3001 0.504411 17.3001 1.12783V12.6684H17.2974ZM1.12783 1.45373H10.8942C11.5163 1.45373 12.022 1.95814 12.022 2.58156C12.022 3.20497 11.5176 3.70938 10.8942 3.70938H1.12783C0.504411 3.70803 0 3.20362 0 2.5802C0 1.95679 0.504411 1.45373 1.12783 1.45373ZM1.12783 7.46474H10.8942C11.5163 7.44446 12.0383 7.93264 12.0585 8.5547C12.0788 9.17677 11.5906 9.69876 10.9686 9.71904C10.9442 9.71904 10.9185 9.71904 10.8942 9.71904H1.12783C0.505763 9.71904 0 9.21463 0 8.59122C0 7.9678 0.504411 7.46339 1.12783 7.46339V7.46474ZM1.12783 13.4758H10.8942C11.5163 13.4758 12.022 13.9802 12.022 14.6036C12.022 15.227 11.5176 15.7314 10.8942 15.7314H1.12783C0.505763 15.7314 0 15.227 0 14.6036C0 13.9802 0.504411 13.4758 1.12783 13.4758Z"></path></g></svg>
                    }
                  </button>
                </div>
              </div>
            </div>
            {sortedChadLists.length > 0 ? (
              <>
                <LaunchpadCardGrid
                  items={sortedChadLists}
                  key={sortedChadLists.join(',')}
                />

                {loading === true ? (
                  <div className="loadingBox">
                    <div className="EmptyLaunchpad">
                      <div className="loadingBox">
                        <p className="Text1" style={{ color: 'white' }}>
                          Loading...
                        </p>
                        <ClipLoader
                          color={'#afccc6'}
                          loading={true}
                          size={50}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>
                    </div>
                  </div>
                ) : currentLength > 0 ? (
                  <p className="loadMoreText" onClick={loadMoreLists()}>
                    Load more ...
                  </p>
                ) : (
                  <></>
                )}
              </>
            ) :
              (
                <div className="loadingBox">
                  <p className="Text1" style={{ color: 'white' }}>
                    No data yet
                  </p>
                </div>
              )
            }
            {/* <Partner /> */}
            <div
              className="grid xl:grid-cols-1 gap-4"
              style={{ marginTop: '20px' }}
            >
              <div className="flex flex-col gap-3">
                <div
                  className="flex flex-col-reverse lg:flex-row bg-[#FFC000] rounded-[40px] lg:px-8 px-2.5 py-5"
                  style={{
                    boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                    border: '2px solid white',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                  }}
                >
                  <div
                    style={{
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div
                      className="text-xl mb-1.5 refer-heading"
                      style={{
                        width: '80%',
                        textAlign: 'center',
                        fontSize: '35px',
                        fontWeight: 'black',
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                      }}
                    >
                      Refer dogdefi to your friends and start earning
                    </div>
                    <div
                      className="Text1"
                      style={{
                        width: '100%',
                        fontSize: '15px',
                        color: 'black'
                      }}
                    >
                      Introduce your friends to a better way to trade. Refer
                      them to DogDefi.fun, and you will get{' '}
                      <span className='fees-bold'>
                        50% of the fees
                      </span>
                    </div>
                  </div>
                  <div>
                    <img style={{ height: '180px' }} src={footericon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
