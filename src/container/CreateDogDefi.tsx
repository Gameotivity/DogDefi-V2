/* eslint-disable no-useless-concat */
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import '../App.css'
import DogDefiFactoryAbi from '../config/DogDefiFactoryAbi.json'
import ERC20Abi from '../config/TokenAbi.json'
import '../styles/MainContainer.css'
import Input from '../components/Input.tsx'
import TextArea from '../components/TextArea.tsx'
import { writeContract, readContract } from '@wagmi/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { waitForTransaction } from '@wagmi/core'
// import { useWeb3Modal } from '@web3modal/react'
import { toast } from 'react-hot-toast'
import Footer from '../components/Footer.jsx'
import 'react-datepicker/dist/react-datepicker.css'
import TopBar from '../components/TopBar.jsx'
import LogoUploadBox from '../components/LogoUploadBox.jsx'
import BannerUploadBox from '../components/BannerUploadBox.jsx'
import { web3Clients, imageUploadUrl, ethPriceApiUrl, chainLogos, feeAmounts, initialEth, coinNames, supportedChainIds, chainNames1, melegaAddress } from '../utils/constants.ts'
import { getFactoryAddress } from '../utils/addressHelpers.ts'
import { Tooltip } from 'react-tooltip';
import ConnectButton from '../components/ConnectButton.jsx'
import { config } from '../config.jsx'
import { chain } from 'lodash'


const App = () => {
  const {chainId} = useAccount();
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const logoFileInput = useRef<HTMLInputElement>(null)
  const bannerFileInput = useRef<HTMLInputElement>(null)
  const { isConnected, address } = useAccount()
  const [maxWallet, setMaxWallet] = useState(1)
  const [routerAddr, setRouter] = useState('pancakeRouter')
  const [featureOption, setFeatureOption] = useState(0)
  const numberForRouter = routerAddr === 'pancakeRouter' ? 0 : 1
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenDescription, setTokenDescription] = useState('')
  let [loading, setLoading] = useState(false)
  let [creating, setCreating] = useState(false)
  const [website, setWebsite] = useState('')
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const [twitter, setTwitter] = useState('')
  const [firstConnect, setFirstConnect] = useState(false)
  // const { open } = useWeb3Modal()
  const [depositAmount, setDepositAmount] = useState('')
  const [accountBalance, setAccountBalance] = useState(0)


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

  useEffect(() => {
    const fetchBalance = async () => {
      // const balance = await readContract(config, {
      //   address: getFactoryAddress(chainId),
      //   abi: ERC20Abi,
      //   functionName: 'balanceOf',
      //   args: [
      //     address
      //   ],
      //   chainId: chainId
      // })
      // setIsDiscountable(Number(balance) / 10 ** 18 >= 10000 ? true : false)
      console.log("address", address)
      if (address) {
        let accountBalance = await web3Clients[chainId].eth.getBalance(address)
        accountBalance = web3Clients[chainId].utils.fromWei(accountBalance, 'ether')
        setAccountBalance(accountBalance)
        console.log("accountBalance", accountBalance)
      }
    }

    if (chainId === 56)
    fetchBalance()
  }, [])

  useEffect(() => {
    if (loading === true) {
      setTimeout(function () {
        setLoading(false)
      }, 3000)
    }
  }, [loading])

  const onDogDefiCreate = async () => {
    try {
      setCreating(true)
      let feeAmount = feeAmounts[chainId];

      if (Number(depositAmount) > 0) {
        let newEthAmount = Number(initialEth[chainId]) + Number(depositAmount)
        let newTokenAmount = 1073 * 10 ** 6 * Number(initialEth[chainId]) / newEthAmount
        let tokenAmount = 1073 * 10 ** 6 - newTokenAmount
        let maxAmount = 1000000000 * maxWallet / 100;

        if (tokenAmount > maxAmount) {
          setCreating(false)
          toast.error(
            "You can't purchase more than " + ' ' + maxAmount.toLocaleString() + ' ' + " tokens"
          )
          return false;
        }
      }

      if (logoFile && bannerFile && chainId) {
        let create
        console.log("")
        create = await writeContract(config, {
          address: getFactoryAddress(chainId),
          abi: DogDefiFactoryAbi,
          functionName: 'createDogDefi',
          value: web3Clients[chainId].utils.toWei(String(feeAmount + Number(depositAmount)), 'ether'),
          args: [
            [
              tokenName,
              tokenSymbol,
              tokenDescription,
              website,
              twitter,
              telegram,
              discord
            ],
            maxWallet.toString(),
            featureOption.toString()
          ],
        })
        console.log("---------------", create)
        await waitForTransaction(config, {
          hash: create,
        })
        console.log("---------------")
        let funAddresses;
        funAddresses = await readContract(config, {
          address: getFactoryAddress(chainId),
          abi: DogDefiFactoryAbi,
          functionName: 'getAllAddresses',
          chainId: chainId
        })
        let presaleAddress
        if (funAddresses)
          presaleAddress = funAddresses[funAddresses.length - 1];
        let logoUrl
        let bannerUrl
        if (logoFile) {
          const formData = new FormData()

          formData.append('file', logoFile, presaleAddress)
          fetch(imageUploadUrl + 'api/logoUploads', {
            method: 'POST',
            body: formData
          })
            .then(async res => {
              logoUrl = await res.json()
              logoUrl = logoUrl.fileInfo.filename
              if (bannerFile) {
                const formData = new FormData()
                formData.append('file', bannerFile, presaleAddress)
                fetch(imageUploadUrl + 'api/bannerUploads', {
                  method: 'POST',
                  body: formData
                })
                  .then(async res => {
                    bannerUrl = await res.json()
                    bannerUrl = bannerUrl.fileInfo.filename
                    toast.success(
                      `Successfully ${tokenName} Dog Defi created`
                    )
                    const link = `/buy/?chain=${chainId}&address=${presaleAddress}`
                    window.location.href = link
                  })
                  .catch(error => {
                    setCreating(false)
                    console.error('Error:', error)
                  })
              }
            })
            .catch(error => {
              setCreating(false)
              console.error('Error:', error)
            })
        }
        setCreating(false)
      } else {
        setCreating(false)
        toast.error(
          'please upload correct image file'
        )
      }
    } catch (err) {
      setCreating(false)
      console.error(err)
      toast.error(
        'There is a problem with your Dog Defi create. Please try again later'
      )
    }
  }

  const [, setImageLogoFile] = useState(null)

  const handleImageLogoChange = file => {
    setImageLogoFile(file)
  }

  const [, setImageBannerFile] = useState(null)

  const handleImageBannerChange = file => {
    setImageBannerFile(file)
  }

  const LogoImageUpload = ({ onChange, className, style }) => {
    const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files![0]
      setLogoFile(selectedFile)
      setLogoPreview(URL.createObjectURL(selectedFile))
      onChange(selectedFile)
    }
    const onButtonClick = () => {
      if (logoFileInput.current) {
        logoFileInput.current.click()
      }
    }
    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <input
          type="file"
          ref={logoFileInput}
          accept="image/*"
          onChange={handleLogoImageChange}
          style={{ display: 'none' }}
        />
        <LogoUploadBox
          imageUrl={logoPreview}
          handleClick={onButtonClick}
          className={className}
          style={style}
        />
      </div>
    )
  }

  const BannerImageUpload = ({ onChange, className, style }) => {
    const handleBannerImageChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const selectedFile = e.target.files![0]
      setBannerFile(selectedFile)
      setBannerPreview(URL.createObjectURL(selectedFile))
      onChange(selectedFile)
    }
    const onButtonClick = () => {
      if (bannerFileInput.current) {
        bannerFileInput.current.click()
      }
    }
    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <input
          type="file"
          ref={bannerFileInput}
          accept="image/*"
          onChange={handleBannerImageChange}
          style={{ display: 'none' }}
        />
        <BannerUploadBox
          imageUrl={bannerPreview}
          handleClick={onButtonClick}
          className={className}
          style={style}
        />
      </div>
    )
  }
  const setMaxWalletAmount = value => {
    setMaxWallet(value)
  }

  const setRouterAddress = value => {
    setRouter(value)
  }

  return (
    <div>
      <div className="GlobalContainer">
        {
          <div style={{ zIndex: 1 }}>
            <TopBar />
            <div className="max-w-7xl m-auto pt-36 pb-24 px-4 sm:px-12 sm:py-10">
              <section className="lg:mx-auto pt-8 lg:py-[30px] w-full lg:w-[741px] min-w-0">
                { chainId === 56 ? 
                <>
                  <section>
                    <section className="my-4">
                      <p className="ContractContentTextTitle h1">
                        Create Token
                      </p>
                    </section>
                    <div className="flex flex-col justify-center items-center gap-[10px] bg-[#121212] rounded-[25px] py-[45px] px-3 sm:px-[25px]">
                      <div className="text-[#00f3ef] w-[90%] text-[18px]">1. Token Info</div>
                      <div
                        className="Text1"
                        style={{
                          width: '90%',
                          fontSize: '14px'
                        }}
                      >
                        Provide your token information
                      </div>
                      <>
                        <section className="flex flex-col gap-4 w-[90%]">
                          <div className="LpBalance">
                            <p className="Text1">
                              Name<span style={{ color: 'red' }}>*</span>
                            </p>
                          </div>
                          <section className="inputPanel">
                            <section className="inputPanelHeader w-full">
                              <Input
                                placeholder="Enter Name"
                                label=""
                                type="text"
                                changeValue={setTokenName}
                                value={tokenName}
                              />
                            </section>
                          </section>
                        </section>

                        <section className="flex flex-col gap-4 w-[90%]">
                          <div className="LpBalance">
                            <p className="Text1">
                              Symbol<span style={{ color: 'red' }}>*</span>
                            </p>
                          </div>
                          <section className="inputPanel">
                            <section className="inputPanelHeader w-full">
                              <Input
                                placeholder="Enter Symbol"
                                label=""
                                type="text"
                                changeValue={setTokenSymbol}
                                value={tokenSymbol}
                              />
                            </section>
                          </section>
                        </section>
                        <section className="flex flex-col sm:flex-row w-[90%]">
                          <section className="flex flex-col gap-4 w-full sm:w-[40%]">
                            <div className="LpBalance">
                              <p className="Text1 flex">
                                Upload Logo
                                <span className='flex' style={{ color: 'red' }}>
                                  *
                                </span>
                                <a className='flex pl-12' id="my-anchor-element">
                                  <Tooltip
                                    anchorSelect="#my-anchor-element"
                                    className='w-64 md:w-80 lg:w-96 max-w-sm'
                                    content="Please upload only images in .png, .jpg. The ideal size for uploads is 256x256 pixels for optimal quality and fit."
                                  />
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-5 w-5 cursor-pointer text-blue-gray-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                  </svg>
                                </a>
                              </p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader w-full">
                                <LogoImageUpload
                                  onChange={handleImageLogoChange}
                                  className="h-[175px]"
                                  style={undefined}
                                />
                              </section>
                            </section>
                          </section>

                          <section className="flex flex-col gap-4 w-full sm:w-[60%] w-full">
                            <div className="LpBalance">
                              <p className="Text1 flex">
                                Upload Banner
                                <span className='flex' style={{ color: 'red' }}>
                                  *
                                  <a className='flex pl-8 text-[#d3d3d3]' id="banner-anchor-element">
                                    <Tooltip
                                      anchorSelect="#banner-anchor-element"
                                      className='w-64 md:w-80 lg:w-96 max-w-sm'
                                      content="Please upload only images in .png, .jpg. The ideal size for uploads is 1200x600 pixels for optimal quality and fit."
                                    />
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                      className="h-5 w-5 cursor-pointer text-blue-gray-500"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                      />
                                    </svg>
                                  </a>
                                </span>
                              </p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader w-full pl-3">
                                <BannerImageUpload
                                  onChange={handleImageBannerChange}
                                  className="upload-box-banner"
                                  style={undefined}
                                />
                              </section>
                            </section>
                          </section>
                        </section>

                        <section className="flex flex-col gap-4 w-[90%]">
                          <p className="Text1">
                            Description (Max 1000 characters)
                            <span style={{ color: 'red' }}>*</span>
                          </p>
                          <section className="inputPanel">
                            <section className="inputPanelHeader w-full">
                              <TextArea
                                rows={6}
                                placeholder="Enter Token Description"
                                changeValue={setTokenDescription}
                                value={tokenDescription}
                              />
                            </section>
                          </section>
                        </section>

                        {/* <div className="text-[#00f3ef] w-[90%] text-[18px]">
                          2. Select chain
                        </div>
                        <section className="flex flex-col gap-4 w-[90%]">
                          <section className="inputPanel">
                            <section className="inputPanelHeader">
                              <div className="fairlaunch-allocation-buttons-container">
                                {supportedChainIds.map(id => (
                                  <button
                                    className="fairlaunch-allocation-button"
                                    onClick={() => {
                                      setChainId(id)
                                    }}
                                    style={
                                      chainId === id
                                        ? {}
                                        : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                    }
                                  >
                                    {chainNames1[id].toUpperCase()}
                                  </button>
                                ))}
                              </div>
                            </section>
                          </section>
                        </section> */}

                        {/* <br />

                        <div className="text-[#00f3ef] w-[90%] text-[18px]">
                          3. Select Listing rotuer
                        </div>
                        <section className="flex flex-col gap-4 w-[90%]">
                          <section className="inputPanel">
                            <section className="inputPanelHeader">
                              <div className="fairlaunch-allocation-buttons-container">
                                <button
                                  className="fairlaunch-allocation-button"
                                  onClick={() => {
                                    setRouterAddress("melegaRouter")
                                  }}
                                  style={
                                    routerAddr === "melegaRouter"
                                      ? {}
                                      : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                  }
                                >
                                  Melegaswap Router
                                </button>
                                <button
                                  className="fairlaunch-allocation-button"
                                  onClick={() => {
                                    setRouterAddress("pancakeRouter")
                                  }}
                                  style={
                                    routerAddr === "pancakeRouter"
                                      ? {}
                                      : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                  }
                                >
                                  {chainId === 56 ? 'Pancakeswap Router' : 'Uniswap Router'}
                                </button>
                              </div>
                            </section>
                          </section>
                        </section> */}

                        <section className="flex flex-col gap-4 w-[90%]">
                          <div className="LpBalance">
                            <p className="Text1">
                              Max Wallet (%)
                              <span style={{ color: 'red' }}>*</span>
                            </p>
                          </div>
                          <section className="inputPanel">
                            <section className="inputPanelHeader">
                              <div className="fairlaunch-allocation-buttons-container">
                                <button
                                  className="fairlaunch-allocation-button"
                                  onClick={() => {
                                    setMaxWalletAmount(1)
                                  }}
                                  style={
                                    maxWallet === 1
                                      ? {}
                                      : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                  }
                                >
                                  1%
                                </button>
                                <button
                                  className="fairlaunch-allocation-button"
                                  onClick={() => {
                                    setMaxWalletAmount(2)
                                  }}
                                  style={
                                    maxWallet === 2
                                      ? {}
                                      : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                  }
                                >
                                  2%
                                </button>
                              </div>
                            </section>
                          </section>
                        </section>
                        <section className="flex flex-col gap-4 w-[90%]">
                          <div className="LpBalance">
                            <p className="Text1 flex">
                              Bundle Amount ({coinNames[chainId]})
                              <a className='flex pl-4' id="snipe-anchor-element">
                                <Tooltip
                                  anchorSelect="#snipe-anchor-element"
                                  className='w-64 md:w-80 lg:w-96 max-w-sm'
                                  content="This is where you input how much you want to buy at launch. Bundling means automatically buying tokens with your dev wallet in the same txhash as the token deployment. This feature guarantees you will be the first buyer of your own token."
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  className="h-5 w-5 cursor-pointer text-blue-gray-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                  />
                                </svg>
                              </a>
                            </p>
                          </div>
                          <section className="inputPanel">
                            <section className="inputPanelHeader w-full">
                              <Input
                                placeholder="Enter Snipe BNB Amount"
                                label=""
                                type="number"
                                changeValue={setDepositAmount}
                                value={depositAmount}
                              />
                            </section>
                          </section>
                        </section>

                        <br />
                        {/* <div className="text-[#00f3ef] w-[90%] text-[18px] flex items-center">
                          4. Select Featured Listing Option
                          <a className='flex pl-4' id="feature-anchor-element">
                            <Tooltip
                              anchorSelect="#feature-anchor-element"
                              className='w-64 md:w-80 lg:w-96 max-w-sm'
                              content={`This is where you can select featured listing option. ${isDiscountable ? featureAmounts[chainId][1] / 2 : featureAmounts[chainId][1]}${coinNames[chainId]}: 1 week, ${isDiscountable ? featureAmounts[chainId][2] / 2 : featureAmounts[chainId][2]}${coinNames[chainId]}: 2 weeks, ${isDiscountable ? featureAmounts[chainId][3] / 2 : featureAmounts[chainId][3]}${coinNames[chainId]}: 1 month`}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="white"
                              strokeWidth={2}
                              className="h-5 w-5 cursor-pointer text-blue-gray-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                              />
                            </svg>
                          </a>
                        </div>
                        <section className="flex flex-col gap-4 w-[90%]">
                          <section className="inputPanel">
                            <section className="inputPanelHeader">
                              <div className="fairlaunch-allocation-buttons-container">
                                <button
                                  className="fairlaunch-allocation-button"
                                  onClick={() => {
                                    setFeatureOption(0)
                                  }}
                                  style={
                                    featureOption === 0
                                      ? {}
                                      : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                  }
                                >
                                  Basic
                                </button>
                                <button
                                  className="fairlaunch-allocation-button"
                                  onClick={() => {
                                    setFeatureOption(1)
                                  }}
                                  style={
                                    featureOption === 1
                                      ? {}
                                      : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                  }
                                >
                                  1 week
                                </button>
                                <button
                                  className="fairlaunch-allocation-button"
                                  onClick={() => {
                                    setFeatureOption(2)
                                  }}
                                  style={
                                    featureOption === 2
                                      ? {}
                                      : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                  }
                                >
                                  2 weeks
                                </button>
                                <button
                                  className="fairlaunch-allocation-button"
                                  onClick={() => {
                                    setFeatureOption(3)
                                  }}
                                  style={
                                    featureOption === 3
                                      ? {}
                                      : { background: 'transparent', color: '#00f3ef', border: 'solid #00f3ef 1px' }
                                  }
                                >
                                  1 month
                                </button>
                              </div>
                            </section>
                          </section>
                        </section> */}

                        {/* <br /> */}

                        <div className="text-[#00f3ef] w-[90%] text-[18px]">
                          5. Additional Information
                        </div>
                        <div
                          className="Text1"
                          style={{
                            // marginLeft: '32px',
                            width: '90%',
                            fontSize: '14px'
                          }}
                        >
                          Let people connect with you.
                        </div>
                        <>
                          <section className="flex flex-col gap-4 w-[90%]">
                            <div className="LpBalance">
                              <p className="Text1">Website</p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader w-full">
                                <Input
                                  placeholder="https://"
                                  label=""
                                  type="text"
                                  changeValue={setWebsite}
                                  value={website}
                                />
                              </section>
                            </section>
                          </section>

                          <section className="flex flex-col gap-4 w-[90%]">
                            <div className="LpBalance">
                              <p className="Text1">Telegram</p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader w-full">
                                <Input
                                  placeholder="https://"
                                  label=""
                                  type="text"
                                  changeValue={setTelegram}
                                  value={telegram}
                                />
                              </section>
                            </section>
                          </section>
                          <section className="flex flex-col gap-4 w-[90%]">
                            <div className="LpBalance">
                              <p className="Text1">Twitter</p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader w-full">
                                <Input
                                  placeholder="https://"
                                  label=""
                                  type="text"
                                  changeValue={setTwitter}
                                  value={twitter}
                                />
                              </section>
                            </section>
                          </section>
                          <section className="flex flex-col gap-4 w-[90%]">
                            <div className="LpBalance">
                              <p className="Text1">Discord</p>
                            </div>
                            <section className="inputPanel">
                              <section className="inputPanelHeader w-full">
                                <Input
                                  placeholder="https://"
                                  label=""
                                  type="text"
                                  changeValue={setDiscord}
                                  value={discord}
                                />
                              </section>
                            </section>
                          </section>
                        </>

                        <br />

                      </>
                      <>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '100%'
                          }}
                        >
                          {
                            isConnected ?
                              chainId == 56 ?
                                (
                                  <button
                                    disabled={
                                      tokenName === '' ||
                                      tokenSymbol === '' ||
                                      tokenDescription === '' ||
                                      logoFile === null ||
                                      bannerFile === null ||
                                      feeAmounts[chainId] + Number(depositAmount) > accountBalance
                                    }
                                    onClick={onDogDefiCreate}
                                    className="CreateButton flex justify-center items-center"
                                  >
                                    {tokenName === '' ||
                                      tokenSymbol === '' ||
                                      tokenDescription === '' ||
                                      logoFile === null ||
                                      bannerFile === null
                                      ? 'Please Enter Details'
                                      :
                                      feeAmounts[chainId] + Number(depositAmount) > accountBalance ?
                                        'Insufficient Balance'
                                        : creating === false
                                          ? 'Create'
                                          :
                                          <ClipLoader
                                            color={'#222'}
                                            loading={creating}
                                            size={30}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                          />}
                                  </button>
                                ) : (
                                  <>
                                    Please switch to BSC
                                  </>
                                ) : (
                                <>
                                  <ConnectButton />
                                </>
                              )
                          }
                        </div>
                      </>
                      <div
                        className="text-[#00f3ef] w-[90%] text-[18px]"
                        style={{
                          maxWidth: '90%',
                          margin: '0',
                          fontSize: '14px',
                          textAlign: 'center',
                          width: '100%'
                        }}
                      >
                        <>Launch Cost {`${feeAmounts[chainId]} ${coinNames[chainId]}`}</>
                      </div>
                    </div>
                  </section>
                </> :
                <div style={{color:'red'}}>Please connect to BSC</div>
                }
              </section>
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default App
