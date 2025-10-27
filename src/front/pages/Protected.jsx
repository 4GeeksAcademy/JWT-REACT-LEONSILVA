import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom"
import { getUserDataProtected } from "../service/fetch"

export const Protected = () => {

  const navigate = useNavigate()
  const {store, dispatch} = useGlobalReducer()
  const [infoUser, setInfoUser] = useState()

  function getUserData(myToken){
    const userData = getUserDataProtected(myToken)
    return userData
  }

  useEffect(()=>{
    let myToken = localStorage.getItem("token")
    if (!myToken){
      navigate("/login")
    }
    else{
      getUserData(myToken)
    }
  },[])

	return(
		<>
      <main>
        <h1>Esta es una pagina protegida</h1>
      </main>
    </>
	)
}