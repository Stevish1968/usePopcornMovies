import { useState } from 'react'
import Search from './Search'
import SiteLogo from '../SiteLogo'
import NumResults from './NumResults'

function NavBar({children}) {

    return(
        <nav className="nav-bar">
             <SiteLogo />
           {children}
        </nav>
    )
} 
export default NavBar