import React from 'react'
import { useSelector } from 'react-redux'

function Header() {
    let moderator = useSelector((status)=> status.moderator)
    let menu;
    if(moderator.isAdmin){
        menu = [
        ]}
  return (
    <div>
        <div>
            MA Registration App
        </div>
        <div>

        </div>
    </div>
  )
}

export default Header