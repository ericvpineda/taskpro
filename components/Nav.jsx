'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {

  const isLoggedIn = false;
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const readyProviders = async () => {
        const res = await getProviders();
        setProviders(res)
    }

    readyProviders()
  }, [])

  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
        
        <Link href="/" className="flex flex-center gap-2">
            <Image src="img/post-it.svg"
            width={30}
            height={30}
            className="object-container"
            ></Image>        
            <p className="logo-text">TaskPro</p>
        </Link>


        <div className="sm:flex hidden">
            {isLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/show-tasks" className="full-btn">View Task</Link>
                    <button type="buttton" className="outline-btn" onClick={signOut}>Sign OUt</button>
                    <Link href="/show-tasks">
                        <Image src=""
                        width={38}
                        height={38}
                        className={"rounded-full"}
                        />
                    </Link>
                </div>
            ) : (<>
                {providers && Object.values(providers).map(provider => {
                    return (<button
                        type="button"
                        key={provider.name}
                        onClick={() => {signIn(provider.id)}}
                        className="full-btn"
                    >Sign In</button>)
                 })} 
            </>)}
        </div>

        <div className="sm:hidden flex relative"></div>
    
    </nav>
    )
}

export default Nav