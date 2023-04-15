
import Image from 'next/image'
import LoginForm from './LoginForm';

const Component = ({
    foundUser,
}:{ foundUser:any }) => {
    
  
  return (<>
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
  </>);
};

export default Component;
