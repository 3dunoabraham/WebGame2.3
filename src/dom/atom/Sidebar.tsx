
import Image from 'next/image'
import LoginFormMinimal from './LoginFormMinimal';

const Component = ({
    foundUser,
}:{ foundUser:any }) => {
    
  
  return (<>
        <div className='w-min-200px h-100 flex-col'>
          
          <a href="/" rel="noopener noreferrer"
            className=' nodeco  tx-center  opaci-chov--50'
          >
            <h1 className='tx-center px-3 bord-r-100p pt-2 pb-3 flex-col tx-bold-2 tx-white bg-black z-800 pos-rel box-shadow-5-b'>
              <span className='tx-sm'><b>W</b>eb</span>
              <span className='tx-sm'><b>A</b>pp</span>
            </h1>
          </a>

          <div className='flex-1'>
          </div>
          <div className='pb-4'>
            
            {!foundUser && <LoginFormMinimal />}
            {foundUser && <>
              <div className='flex-col tx-lx opaci-10 py-8'>Welcome Back!</div>
            </>}
          </div>
        </div>
  </>);
};

export default Component;
