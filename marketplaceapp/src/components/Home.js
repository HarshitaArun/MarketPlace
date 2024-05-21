import React, {useEffect, useState} from "react"
import axios from "axios"
import {useLocation, useNavigate, Link} from "react-router-dom"

const Home = () => {
    const location = useLocation()
    return(
        <div className="homepage">
            <h1>Hello {location.state.id}! Buy or Sell?</h1>
        </div>
    )
}

export default Home