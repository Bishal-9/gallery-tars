import React, { useState } from 'react'
import logo from './logo.jpg'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import './Header.css'

function Header({searchData, func, imageFunc}) {

    const [search, setSearch] = useState('')

    const getImage = () => {
        imageFunc()
        func(search)
        searchData(search)
    }

    return (
        <div className="header">
            <img className="header__logo" src={logo} alt="Logo"/>
            <form className="header__input">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search image..."/>
                <IconButton onClick={getImage}>
                    <SearchIcon />
                </IconButton>
            </form>
        </div>
    )
}

export default Header
