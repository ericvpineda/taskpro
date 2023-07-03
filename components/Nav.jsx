'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {

  const {data: session} = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

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
            width={40}
            height={40}
            alt="logo"
            className="object-container"
            ></Image>        
            <p className="logo-text">TaskPro</p>
        </Link>

        {/* Main Naivation  */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-task" className="full-btn">Create Task</Link>
                    <button type="buttton" className="outline-btn" onClick={signOut}>Sign Out</button>
                    <Link href={`/profile/${session?.user.id}`}>
                        <Image 
                        src={session.user.image}
                        alt="user-image"
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
        
        {/* Mobile navigation  */}
        <div className="sm:hidden flex relative">
            {session?.user ? <div className="sm:hidden flex">
            <Image src={session?.user.image}
                    width={37}
                    height={37}
                    className='rounded-full cursor-pointer'
                    alt="user_image"
                    onClick={() => setToggleDropdown((prev) => !prev)}
            ></Image>
            {toggleDropdown && (
                <div className='dropdown'>
                    <Link href={`/profile/${session?.user.id}`} className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                    >
                    My Profile
                    </Link>
                    <Link href="/create-task" className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                    >
                    Create Task
                    </Link>
                    <button type="button" 
                    onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                    }}
                    className='mt-5 w-full full-btn'
                    >Sign Out</button>
                </div>
            )}
            </div>: 
            <>
            {providers && Object.values(providers).map(provider => {
                return <button
                type="button"
                key={provider.name}
                onClick={() => {signIn(provider.id)}}
                className='full-btn'
                >Sign In</button>
            })}
            </>
            }            
        </div>
    
    </nav>
    )
}

export default Nav