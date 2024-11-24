import React, { useState, useEffect, useRef } from 'react'
import '../App.css'
import '../styles/MainContainer.css'
import './aboutus.css'
import 'react-datepicker/dist/react-datepicker.css'
import TopBar from '../components/TopBar.jsx'
import graph from '../../public/img/Bonding Curve.png'
import logo from '../../public/img/coollogo_com-22031459.png'
import footericon from '../../public/img/dogdefi.png'
import arrow from '../../public/img/Yellow Arrow.png'
import arrowup from '../../public/img/Yellow Arrow-up.png'
import Footer from '../components/Footer.jsx'
function Faq() {
  const [visibleSection, setVisibleSection] = useState(null) // Manages which section is visible

  const toggleVisibility = section => {
    if (visibleSection === section) {
      setVisibleSection(null) // Close the section if it's already open
    } else {
      setVisibleSection(section) // Open the clicked section and close others
    }
  }
  return (
    <div>
      <div className="GlobalContainer">
        <div style={{ zIndex: 1 }}>
          <TopBar />
          <div>
            <div className="max-w-7xl m-auto pt-36 pb-24 px-4 sm:px-12 sm:py-10">
              <section className="lg:mx-auto pt-8 lg:py-[30px] w-full lg:w-[741px] min-w-0">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img style={{ height: '113px' }} src={logo} />
                </div>
                <div
                  className="Text1 text-[11px] lg:text-[14px]"
                  style={{
                    fontSize: '16px',
                    textAlign: 'center'
                  }}
                >
                  These are the most frquent asked questions about
                  dogdefi.fun. Can't find What you are looking for?
                </div>
                <a href="https://t.me/Dogelove84" target="_blank" className="p-2">
                  <div
                    className="Text1 text-[11px] lg:text-[14px]"
                    style={{
                      fontSize: '16px',
                      textAlign: 'center',
                      color: '#3B4E4F',
                      textDecoration: 'underline'
                    }}
                  >
                    Feel free to ask in our community
                  </div>
                </a>
              </section>
            </div>
            <div className="max-w-7xl m-auto pt-36 pb-24 px-4 sm:px-12 sm:py-10">
              <div className="grid xl:grid-cols-2 gap-12">
                <div className="flex flex-col">
                  <div
                    className="text-center text-[#f3f3f3] text-xl mb-1.5 impact-headings"
                    style={{
                      fontSize: '35px',
                      fontWeight: 'bold',
                      marginBottom: '30px',
                    }}
                  >
                    DEVELOPERS
                  </div>
                  <div
                    className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                      , cursor: 'pointer' 
                    }}
                    onClick={() => toggleVisibility(0)}
                  >
                    <div className="Text1 text-[11px] lg:text-[14px]" style={{cursor:"pointer"}}>
                      How does dogdefi.fun benefit developers.
                    </div>
                    <img
                      style={{ height: '40px', cursor: 'pointer' }}
                      src={visibleSection === 0 ? arrowup : arrow}
                    />
                  </div>
                  {visibleSection === 0 && (
                    <div
                      className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                      style={{
                        boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                        border: '2px solid white',
                        zIndex: '-1',
                        marginTop: '-27px',
                      }}
                    >
                      <div
                        className="Text1 text-[11px] lg:text-[14px]"
                        style={{
                          paddingTop: '16px'
                        }}
                      >
                        dogdefi.fun makes token deployment fast, easy and
                        cheap. You can have a token up and running within a
                        minute, immediately catching the attention of thousands
                        of platform users. Not only! With the FEATURED option we
                        provide also the best exposure and marketing.
                      </div>
                    </div>
                  )}
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(1)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          Which coding skills do i need to deploy a token?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 1 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 1 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px',
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            NONE! All you have to do is fill in a couple details
                            and pay the deployement transaction fee.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(2)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          How much does it cost to launch a project with
                          dogdefi.fun?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 2 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 2 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px',
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            Peanuts! We currently charge something like 2 or 3$
                            for the BASIC launch plus gas fees and about 250$
                            for the FEATURED OPTION that will ensure your
                            project gets the best visibility and marketing
                            coverage .
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(3)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{
                          }}
                        >
                          How can i start investing in dogdefi.fun?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 3 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 3 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px',
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            All you have to do is connect your wallet and you
                            are ready to go. You'll find a lot of projects on
                            our homepage, which you can easily filter to find
                            the right project for you, on the chain you prefer
                            to trade on.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between', 
                          cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(4)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          Are there trading fees on dogdefi.fun?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 4 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 4 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px',
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            YES! Just 1% on each trade You can get 50% of these
                            fees through your referral link that you find on
                            each page of the various tokens. Start earning now.
                            Refer your friends to dogdefi.fun!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(5)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          Are there other ways to earn money through
                          dogdefi.fun?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 5 ? arrowup : arrow}
                         
                        />
                      </div>
                      {visibleSection === 5 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            YES! You dont have to invest money to make money.
                            Start earning with your project. Refer your friends
                            and earn{' '}
                            <span style={{ fontWeight: 'bold' }}>
                              {' '}
                              50% of the fees{' '}
                            </span>
                            . Just grab your refferal link for free on each
                            token page and get started!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div
                    className="text-center text-[#f3f3f3] text-xl mb-1.5 impact-headings"
                    style={{
                      fontSize: '35px',
                      fontWeight: 'bold',
                      marginBottom: '30px'
                    }}
                  >
                    INVESTORS
                  </div>
                  <div
                    className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                      , cursor: 'pointer' 
                    }}
                    onClick={() => toggleVisibility(6)}
                  >
                    <div
                      className="Text1 text-[11px] lg:text-[14px]"
                      style={{cursor:"pointer"}}
                    >
                      What is dogdefi.fun?
                    </div>
                    <img
                      style={{ height: '40px', cursor: 'pointer' }}
                      src={visibleSection === 6 ? arrowup : arrow}
                      
                    />
                  </div>
                  {visibleSection === 6 && (
                    <div
                      className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                      style={{
                        boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                        border: '2px solid white',
                        zIndex: '-1',
                        marginTop: '-27px'
                      }}
                    >
                      <div
                        className="Text1 text-[11px] lg:text-[14px]"
                        style={{
                          paddingTop: '16px'
                        }}
                      >
                        dogdefi.fun is a cutting-edge platform designed to
                        simplify the process of token deployment and provide
                        investors with early access to promising crypto projects
                        that are technically safe.
                      </div>
                    </div>
                  )}
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(7)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          How does dogdefi.fun benefit investors?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 7 ? arrowup : arrow}
                         
                        />
                      </div>
                      {visibleSection === 7 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            dogdefi.fun offers exclusive early access to new
                            tokens before they are listed on major
                            DEXs,increasing the chances for significant gains.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(8)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          Is investing in dogdefi.fun benefit safe?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 8 ? arrowup : arrow}
                         
                        />
                      </div>
                      {visibleSection === 8 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            dogdefi.fun manages both the liquidity pool and
                            the token contract, ensuring a much safer investment
                            environment compared to the "regular" market that is
                            infested with scammers who are after your money.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(9)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          How can i start investing in dogdefi.fun?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 9 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 9 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            All you have to do is connect your wallet and you
                            are ready to go. You'll find a lot of projects on
                            our homepage, which you can easily filter to find
                            the right project for you, on the chain you prefer
                            to trade on.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(11)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          What happens when a token reaches 69,000 USD market
                          cap?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 11 ? arrowup : arrow}
                        />
                      </div>
                      {visibleSection === 11 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            It's automatically listed on a DEX with 12k$ in
                            liquidity. At the same time, the LP tokens are burnt
                            and the contract renounced for enhanced safety.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="grid xl:grid-cols-1 gap-12"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="flex flex-col">
                      <div
                        className="bg-[#262626] rounded-[10px] lg:px-8 px-2.5 py-5"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                          , cursor: 'pointer' 
                        }}
                        onClick={() => toggleVisibility(12)}
                      >
                        <div
                          className="Text1 text-[11px] lg:text-[14px]"
                          style={{cursor:"pointer"}}
                        >
                          Are there other ways to earn money through
                          dogdefi.fun?
                        </div>
                        <img
                          style={{ height: '40px', cursor: 'pointer' }}
                          src={visibleSection === 12 ? arrowup : arrow}
                          
                        />
                      </div>
                      {visibleSection === 12 && (
                        <div
                          className="bg-[#040404] rounded-[20px] lg:px-8 px-2.5 py-5"
                          style={{
                            boxShadow: 'rgb(103, 103, 103) 0px 5px 10px 0px',
                            border: '2px solid white',
                            zIndex: '-1',
                            marginTop: '-27px'
                          }}
                        >
                          <div
                            className="Text1 text-[11px] lg:text-[14px]"
                            style={{
                              paddingTop: '16px'
                            }}
                          >
                            YES! You dont have to invest money to make money.
                            Start earning with your project. Refer your friends
                            and earn{' '}
                            <span style={{ fontWeight: 'bold' }}>
                              {' '}
                              50% of the fees{' '}
                            </span>
                            . Just grab your refferal link for free on each
                            token page and get started!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
                        className="text-xl mb-1.5"
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
                        <span className="fees-bold">50% of the fees</span>
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
      </div>
      <Footer />
    </div>
  )
}

export default Faq
