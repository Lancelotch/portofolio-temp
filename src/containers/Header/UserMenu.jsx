import React from 'react';
import PropTypes from 'prop-types'
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from '../../routers/path';

export default function UserMenu({onClick}){
    const {handleLogout, history} = useRootContext();
    return(
        <div>
        <p onClick={()=>{history.push(PATH_URL.HOME)}}>Pesenan Saya</p>
        <p onClick={()=>{history.push(PATH_URL.HOME)}}>Pengaturan Privasi</p>
        <p onClick={()=>{history.push(PATH_URL.HOME)}}>Hubungi Kami</p>
        <p onClick={()=>handleLogout()}>Log Out</p>
      </div>
    )
}

UserMenu.propType = {
    onClick: PropTypes.func
}