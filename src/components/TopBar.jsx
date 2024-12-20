import React, { useState, useEffect, useCallback } from 'react'
import iconHamburger from '../icons/hamburger.svg'
import iconCross from '../icons/cross-icon.svg'
import iconTg from '../icons/tg.svg'
import iconX from '../icons/x.svg'
import iconChart from '../icons/chart.svg'
import iconTg1 from '../icons/tg-1.svg'
import iconX1 from '../icons/x-1.svg'
import iconChart1 from '../icons/chart-1.svg'
import logo from '../icons/logo.png'
// import LeftBar from './LeftBar'
import { useAccount } from 'wagmi'
// import { useWeb3Modal } from '@web3modal/react'
import ChadHeaderLink from '../components/ChadHeaderLink'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import formatNumber, { imageUrl, apiUrl, coinNames, supportedChainIds } from '../utils/constants.ts'
import ConnectButton from './ConnectButton.jsx'

const TopBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [firstConnect, setFirstConnect] = useState(false)
  const { address, isConnected, chainId } = useAccount()
  const handleHamburgerClick = () => {
    setIsExpanded(!isExpanded)
  }
  const [history, setHistory] = useState('')

  useEffect(() => {
    // Add event listener for window resize
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsExpanded(false)
      }
    }

    window.addEventListener('resize', handleResize)
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // const handleDocumentClick = event => {
  //   const leftBarElement = document.querySelector('.left-bar')
  //   const hamburgerMenuElement = document.querySelector('.left-bar-menu')

  //   // Check if the click is outside the left-bar
  //   if (
  //     !leftBarElement.contains(event.target) &&
  //     event.target !== hamburgerMenuElement
  //   ) {
  //     setIsExpanded(false)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleDocumentClick)

  //   return () => {
  //     document.removeEventListener('click', handleDocumentClick)
  //   }
  // }, [])

  // const { open } = useWeb3Modal()
  // const onConnect = async () => {
  //   await open()
  // }

  // const onConnectWallet = async () => {
  //   await open()
  //   setFirstConnect(true)
  // }

  useEffect(() => {
    const reloadWindow = async () => {
      try {
        window.location.reload()
      } catch (e) {
        console.error(e)
      }
    }
    if (isConnected === true && firstConnect === true) reloadWindow()
  }, [isConnected, firstConnect])

  // const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  // useEffect(() => {
  //   const switchChain = async () => {
  //     try {
  //       switchNetwork?.(56)
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   if (isConnected === true) {
  //     if (!supportedChainIds.includes(chainId)) switchChain()
  //   }
  // }, [isConnected, chainId, switchNetwork])

  useEffect(() => {
    const FetchData = async () => {
      try {
        await fetch(
          apiUrl + `/api/getHistory`,
          {
            method: 'GET'
          }
        ).then(async res => {
          let data = await res.json()
          if (data.length > 0) {
            let history
            let historyData = []
            for (let i = 0; i < data?.length; i++) {
              let chainId = data[i].chainId
              let amount = data[i].amount
              let buyer = data[i].buyer
              let name = data[i].name
              let token = data[i].token
              let type = data[i].type
              let contract = data[i].contract
              let avatarUrl = imageUrl + "profile-" + data[i].buyer + ".png"
              history = { chainId: chainId, amount: amount, buyer: buyer, name: name, token: token, type: type, contract: contract, avatarUrl: avatarUrl }
              historyData.push(history)
            }
            setHistory(historyData)
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
    FetchData()
  }, [])
  let currentPath = window.location.pathname


  return (
    <>
      {/* <LeftBar
        isExpanded={isExpanded}
        onHamburgerClick={handleHamburgerClick}
      /> */}
      <div className="top-bar">
        {/* {sortedList.map(({ name, address, trending }, i) => ( */}
        {history.length > 0 ? (
          <div className='carousel-container'>
            <div className="carousel-track">
              {history.map(
                ({ chainId, amount, buyer, name, token, contract, type, avatarUrl }, i) => (
                  // <animated.div
                  //   style={{
                  //     ...(i === 0 && animate.animate
                  //       ? firstItemShakeAnimation
                  //       : '')
                  //   }}
                  // >
                  // {animate.animate && i === 0 && <AnimatedOverlay />}

                  <div className="carousel-card" key={i}>
                    {/* <img
                      src={avatarUrl}
                      width="32px"
                      height="32px"
                      alt=""
                      onError={event => {
                        event.target.src = "/img/moonboy67.png"
                        event.onerror = null
                      }}
                    /> */}
                    <Link
                      className="top-bar-address"
                      to={'/profile/?address=' + buyer}
                      target={currentPath.includes('profile') ? '_blank' : ''}
                      rel="noreferrer"
                    >
                      {buyer.slice(0, 2) + buyer.slice(-3)}
                    </Link>
                    <span className={`text-${type === "bought" ? "green-500" : "red-500"} pl-3`}>{type === "bought" ? "+" : "-"}</span>
                    <span className="top-bar-description">{formatNumber(Number(amount))} &nbsp;{type === 'bought' ? coinNames[chainId] : 'Token'}</span>
                    <Link
                      className="top-bar-address"
                      to={`/buy/?chain=${chainId}&address=${contract}`}
                      rel="noreferrer"
                    >
                      <span className="top-bar-token">{name.length > 6 ? `${name.slice(0, 6)}` : name}</span>
                      <img
                        src={imageUrl + contract + '-logo.png'}
                        width="32px"
                        height="32px"
                        alt=""
                        className="top-bar-token-icon rounded-full"
                      />
                    </Link>
                    <br />
                  </div>
                  // </animated.div>
                )
              )}
              {history.map(
                ({ chainId, amount, buyer, name, token, contract, type, avatarUrl }, i) => (
                  // <animated.div
                  //   style={{
                  //     ...(i === 0 && animate.animate
                  //       ? firstItemShakeAnimation
                  //       : '')
                  //   }}
                  // >
                  // {animate.animate && i === 0 && <AnimatedOverlay />}

                  <div className="carousel-card" key={i}>
                    {/* <img
                      src={avatarUrl}
                      width="32px"
                      height="32px"
                      alt=""
                      onError={event => {
                        event.target.src = "/img/moonboy67.png"
                        event.onerror = null
                      }}
                    /> */}
                    <Link
                      className="top-bar-address"
                      to={'/profile/?address=' + buyer}
                      target={currentPath.includes('profile') ? '_blank' : ''}
                      rel="noreferrer"
                    >
                      {buyer.slice(0, 2) + buyer.slice(-3)}
                    </Link>
                    <span className={`text-${type === "bought" ? "green-500" : "red-500"} pl-3`}>{type === "bought" ? "+" : "-"}</span>
                    <span className="top-bar-description">{formatNumber(Number(amount))} &nbsp;{type === 'bought' ? coinNames[chainId] : 'Token'}</span>
                    <Link
                      className="top-bar-address"
                      to={`/buy/?chain=${chainId}&address=${contract}`}
                      rel="noreferrer"
                    >
                      <span className="top-bar-token">{name.length > 6 ? `${name.slice(0, 6)}` : name}</span>
                      <img
                        src={imageUrl + contract + '-logo.png'}
                        width="32px"
                        height="32px"
                        alt=""
                        className="top-bar-token-icon rounded-full"
                      />
                    </Link>
                    <br />
                  </div>
                  // </animated.div>
                )
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="fixed top-0 left-0 w-full z-50 px-2 bg-[#0000009e]">
        <div className={`my-0 max-w-7xl m-auto w-full bg-[#00000000] rounded-[25px] lg:rounded-full lg:h-[70px] items-center ${isExpanded ? 'pb-2 px-2' : 'px-2'}`} >
          <div className='flex justify-between'>
            <div className='flex flex-row items-center'>
              <ChadHeaderLink className="w-[170px] h-[100px]" />
              <div className='lg:flex hidden flex-row gap-4' style={{ fontFamily: "Bricolage Grotesque,  sans-serif" }}>
                <Link to="/AllLaunches" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/' || currentPath === '/AllLaunches'
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    Board
                  </span>
                </Link>
                <Link to="/CreateDogDefi" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/CreateDogDefi'
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    Create&nbsp;Token
                  </span>
                </Link>
                <Link to={'/profile/?address=' + address} className="left-bar-link">
                  <span
                    className={
                      currentPath.includes('/profile')
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    Profile
                  </span>
                </Link>
                {/* <Link to="/about-us" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/about-us'
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    About
                  </span>
                </Link>
                <Link to="/FAQ" className="left-bar-link">
                  <span
                    className={
                      currentPath === '/FAQ'
                        ? 'text-[20px] text-[#f3f3f3]'
                        : 'text-[20px] text-[#8b8b8b] hover:text-[#f3f3f3]'
                    }
                  >
                    FAQ
                  </span>
                </Link> */}
              </div>
            </div>
            <div className='flex flex-row items-center gap-4'>
              <div className='sm:flex hidden flex-row gap-4'>
                <a href="https://x.com/dogdefifun?s=21&t=TLsvb7r4Zzlvdryamr0DrQ" target="_blank" className="p-2  text-white">
                  <img src={iconX1} className='w-[24px] h-[24px]' />
                </a>
                <a href="https://t.me/+dI9ZIabbJoUyN2E1" target="_blank" className="p-2">
                  <img src={iconTg1} className='w-[24px] h-[24px]' />
                </a>
              </div>
              <div className="navConnectButtonBox">
                {/* {!isConnected ? (
                  <>
                    <button
                      className="navConnectButton hover:bg-[#9d9a9a] text-black"
                      type="submit"
                      style={{ fontFamily: "Bricolage Grotesque,  sans-serif" }}
                      onClick={() => {
                        onConnectWallet()
                      }}
                    >
                      Connect<span className="navWallet"> Wallet</span>
                    </button>
                  </>
                ) : (
                  <section>
                    <div className="ChainGroupButton">
                      {supportedChainIds.includes(chain?.id) ? (
                        <button
                          className="navConnectButton text-black"
                          type="submit"
                          onClick={() => onConnect()}
                          style={{ fontFamily: "Bricolage Grotesque,  sans-serif" }}
                        >
                          {address?.slice(0, 4) + '...' + address?.slice(-4)}
                        </button>
                      ) : (
                        <button
                          className="navConnectButton text-black "
                          type="submit"
                          onClick={() => switchNetwork?.(56)}
                          style={{ fontFamily: "Bricolage Grotesque,  sans-serif" }}
                        >
                          {'Switch BSC'}
                          {isLoading && pendingChainId === 56 && ''}
                        </button>
                      )}
                    </div>
                  </section>
                )} */}
                {/* <ConnectButton /> */}
                <w3m-button />
              </div>
              <button className='bg-black hover:bg-[#222] rounded-full p-2 flex lg:hidden' onClick={handleHamburgerClick}>
                <img src={isExpanded ? iconCross : iconHamburger} className='w-[32px] h-[32px]' />
              </button>
            </div>
          </div>
          {isExpanded && <div className='relative bg-[#212121] rounded-[25px] flex flex-col gap-[10px] px-[32px] pt-[40px] pb-[160px] sm:p-[48px] w-full items-center overflow-hidden' style={{ transform: "none", transformOrigin: "50% 50% 0px" }}>
            <div className='flex flex-col gap-4' style={{ fontFamily: "Kanit, sans-serif" }}>
              <Link to="/AllLaunches" className="left-bar-link">
                <span
                  className={
                    currentPath === '/' || currentPath === '/AllLaunches'
                      ? 'text-[20px] text-[#e2fea5]'
                      : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                  }
                >
                  Board
                </span>
              </Link>
              <Link to="/CreateDogDefi" className="left-bar-link">
                <span
                  className={
                    currentPath === '/CreateDogDefi'
                      ? 'text-[20px] text-[#e2fea5]'
                      : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                  }
                >
                  Create&nbsp;Token
                </span>
              </Link>
              <Link to={'/profile/?address=' + address} className="left-bar-link">
                <span
                  className={
                    currentPath.includes('/profile')
                      ? 'text-[20px] text-[#e2fea5]'
                      : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                  }
                >
                  Profile
                </span>
              </Link>
              <Link to="/about-us" className="left-bar-link">
                <span
                  className={
                    currentPath === '/about-us'
                      ? 'text-[20px] text-[#e2fea5]'
                      : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                  }
                >
                  About
                </span>
              </Link>
              <Link to="/faq" className="left-bar-link">
                <span
                  className={
                    currentPath === '/faq'
                      ? 'text-[20px] text-[#e2fea5]'
                      : 'text-[20px] text-[#f8ffe8] hover:text-[#e2fea5]'
                  }
                >
                  Faq
                </span>
              </Link>
            </div>
            <div className='sm:hidden flex flex-row gap-4'>
              <Link to="#" target="_blank" className="p-2">
                <img src={iconX1} className='w-[24px] h-[24px]' />
              </Link>
              <Link to="#" target="_blank" className="p-2">
                <img src={iconTg1} className='w-[24px] h-[24px]' />
              </Link>
              <Link to='#' target="_blank" className="p-2">
                <img src={iconChart1} className='w-[24px] h-[24px]' />
              </Link>
            </div>
            <div className='h-[240px] sm:h-[350px] absolute right-[-57px] bottom-[-72px] sm:right-[-97px] sm:bottom-[-115px]' style={{ transform: "rotate(-34deg)", transformOrigin: "50% 50% 0px", aspectRatio: "1.0713153724247226 / 1" }}>
              <img src={logo} className='' />
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default TopBar
