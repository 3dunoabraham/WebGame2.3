import Image from 'next/image'
import AuthRepo from '@/../script/state/repository/auth'
import { TICKER_SYMBOLS, Ticker, getTicker } from '@/../script/state/repository/ticker'
import TickerCard from '@/dom/atom/TickerCard'
import LoginForm from '@/dom/atom/LoginForm';


export default async function Home() {

const ticker = await (
  await fetch("https://api.github.com/users/3dunoabraham/repos")
).json()
  
  const foundJWT:any = await AuthRepo.getJWT()
  console.log("foundJWT home page", foundJWT)
  const foundUser:any = !!foundJWT ? (
    foundJWT.length > 42 ? await AuthRepo.getUser(foundJWT) : {
      email:"example@example.com",
      name: "joe",
    }
  ) : null
  console.log("foundUser home page", foundUser)

  const tickers: Ticker[] = await Promise.all(
    TICKER_SYMBOLS.map((aTicker)=>(getTicker(aTicker)))
  );  
  const tickerCards = TICKER_SYMBOLS.map((tickerName:any, index:number) => (
    <TickerCard initialTicker={tickers[index]} tickerName={tickerName} key={tickerName} />
  )); 

  return (
    <main className='flex-col pos-rel  ' >
      <div className='h-min-100vh pos-rel w-100 '>
        
       <div className=' pos-fix h-100vh box-shadow-3' style={{background: "linear-gradient(-65deg, #D6DBDC, #ffffff)"}}> {/* 3E5F58 */}
        <div className='w-min-300px h-100 flex-col'>
          
          <a href="/" rel="noopener noreferrer"
            className=' nodeco  tx-start w-100 opaci-chov--50'
          >
            <div className='flex gap-2 pa-4'>
              <div className='flex-col'>
                  <Image alt="asd" width={24} height={24}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/480px-Binance_Logo.svg.png"
                  />
              </div>
              <div className="tx-lx opaci-50 tx-black">+</div>
              <div className="flex-col">
                <Image src="/next.svg" alt="Next.js Logo" width={75} height={15} priority />
              </div>
            </div>
          </a>

          <div className='flex-1'>
          </div>
          <div className='pb-4'>
            
            {!foundUser && <LoginForm />}
            {foundUser && <>
              <div className='flex-col tx-lx opaci-10 py-8'>Welcome Back!</div>
            </>}
          </div>
        </div>
      </div>

      <div className=' flex px-8 Q_xs_px-2 pt-8 '>
        <div className='w-min-300px'>
          qwe
        </div>
        <div className='flex-1 flex-col  flex-align-start tx-sans'>
          
          <div>
            <h1 className='tx-bold-3'>Tickers</h1>
            
            <div className=''>
                {tickerCards}
              </div>
          </div>

          <div >
            <h1>List</h1>
          </div>
          <hr className='opaci-25 w-100 mb-4 ' />
          <h3 className='tx-bold-3'>Homepage, Name, Size</h3>

            <div  className='flex-col   z-800  w-100 bord-r-5    block noverflow border-lgrey  box-shadow-1-b' >
              {ticker.map((aRepo:any)=>(
                <>
                <div key={ticker.id}
                  className=' w-100  block  border-lgrey-b flex pos-rel  '
                >
                  
                  {!!aRepo.homepage && <a href={aRepo.html_url} target="_blank" rel="noopener noreferrer" key={ticker.id}
                    className='opaci-chov-75 w-100  block pos-abs  border-lgrey-b flex bg-b-40 top-0 left-0 h-100 opaci-10'
                  ></a> }
                  <div className='py-1 border-lgrey-r flex-1 px-2'>
                    {aRepo.homepage || <>
                      <details>
                        <summary className='opaci-chov--50 opaci-75 tx-italic'>No link: Details</summary>
                        <div>
                          {JSON.stringify(aRepo)}
                        </div>
                      </details>
                    </>}
                  </div>
                  <div className='py-2 px-2 border-lgrey-r tx-mdl tx-bold-6 '>{aRepo.name}</div>
                  <div className='py-2 px-2 border-lgrey-r tx-sm'>{aRepo.size}</div>
                  {/* <div className='py-2 px-2 '><i className='tx-lg'>→</i></div> */}
                </div>
                </>
              ))}
            </div>
        </div>
      </div>


    </div>
    <div className='py-8 tx-center  w-100 opaci-10'>
      <h1>License | Copyright © 2023 WebGame</h1>
    </div>
    </main>
  )
}
