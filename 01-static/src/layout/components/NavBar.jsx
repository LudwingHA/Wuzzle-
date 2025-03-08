import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <>
    <nav>
        <div>
            <Link className='title-nav'>
                GAME
            </Link>
        </div>
        <div>
            <li>
                <NavLink>
                    Home
                </NavLink>
                <NavLink>
                    Game
                </NavLink>
                <NavLink>
                    User
                </NavLink>
            </li>
        </div>
    </nav>
    </>
  )
}
