import React, { Fragment, useEffect, useState } from 'react';
//import { mintNftToken } from './Function'
import { gsap } from "gsap";

let MyOwnAccount;
let provider = window.ethereum;
export default function App() {

  const [start, setStartApp] = useState(false);
  const [connect, setConnect] = useState('undefined');
  const [mintIt, setMintIt] = useState('');
  //const [Minted, setMinted] = useState(false);
  //const [isMinted, setisMinted] = useState(false);

  useEffect(() => {
    gsap.from('.but', { duration: 1, y: '-100%', ease: 'bounce' }); 
 
});


  useEffect(() => {

    if (connect !== 'undefined') {
      setStartApp(true);
    } else {
      setStartApp(false);
    }

  }, [start, connect])


    const oops = () => {
      setMintIt('Oops, Sorry, it doest seem like this app is connected to a network');
    }
  // const mintNFT = () => {
  //   MintMyToken().then((trx) => {
  //     console.log("minted");
  //     setMinted(true);
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  const startApp = async () => {

    if (typeof provider !== 'undefined') {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          MyOwnAccount = accounts[0];
          setConnect(MyOwnAccount);
          setStartApp(true);
          console.log(`Selected account is ${MyOwnAccount}`);

        })
        .catch((err) => {
          console.log(err);
        });

      provider.on('accountsChanged', function (accounts) {
        MyOwnAccount = accounts[0];
        console.log(`Selected account changed to ${MyOwnAccount}`);
        setStartApp(true);
      });

      // isInitialized = true;
    }

  }
  
  return (
    <div className="w-full flex-wrap  h-screen flex justify-center items-center ">
      <div className="w-full justify-center font-extrabold text-center text-3xl md:text-6xl">
        <div className='game leading-loose bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500' >
        INTO THE METAVERSE <br /> <span className='hidden md:block'> -Mint My Token-</span> 
        </div>
        <div className=' px-24 block text-xl'>
          This is not a RichText, but the is a simple DApp to connect to a blockchain with metamask and mint your personal token to your blockchain Network contract.
        </div>
        <div className='gama md:hidden game leading-loose bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500' >
        <span> -Mint My Token-</span> 
        </div>
        <div className='pt-24 block text-xl'>

          {start ?
            (
              <Fragment>
                <button disabled className='but p-5 bg-green-400 rounded-md text-white hover:text-green-900 hover:bg-white hover:border hover:border-green-600' >
                  Connected
                </button>
                <div>
                  <button onClick={oops} className='but p-5 bg-purple-400 rounded-md  mt-4 hover:text-green-900 hover:bg-white hover:border hover:border-purple-600' >
                    Mint Token
                  </button>
                </div>
              </Fragment>
            )
            :
            (
              <Fragment>
                <button onClick={startApp} className='but p-5 bg-green-400 rounded-md hover:text-green-900 hover:bg-white hover:border hover:border-green-600' >
                  Connect
                </button>
              </Fragment>
            )}

            {mintIt}
        </div>
      </div>
    </div>
  )
}
