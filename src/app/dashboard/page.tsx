import '@/app/globals.css'  
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  const ticker = await (
    await fetch("https://api.github.com/users/3dunoabraham/repos")
  ).json()

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
        <div> <a className='pa-2 tx-lx opaci-chov--50' href="/"> Home </a> </div>
        
        <div></div>
        
        <details className='pos-re'>
          <summary className='opaci-chov--50 pa-3'> Github:</summary>
          <code  className='flex-col py-8 pos-abs z-800 bg-b-10  bord-r-5 h-max-300px  autoverflow-y block py-2' >
            {ticker.map((aRepo:any)=>(
              <a href={aRepo.html_url} target="_blank" rel="noopener noreferrer" key={ticker.id}
                className='opaci-chov-75 opaci-25 pa-2 block  '
              >
                {aRepo.name}
                <i className='tx-lg'>→</i>
              </a>
            ))}
          </code>
        </details>
        <div>
          <a className='pa-2'
            href="https://github.com/3dunoabraham" target="_blank" rel="noopener noreferrer"
          >
            By{' '}
            <b>3dunoabraham</b>
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://tresd1.gitbook.io/webgame/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about this tutorial.
          </p>
        </a>

        <div></div>
        <div></div>

        <a
          href="https://vercel.com/"
          className={styles.card+" flex-col"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className='pa-2'
            
          >
            Powered by{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </div>
        </a>
      </div>
    </main>
  )
}
