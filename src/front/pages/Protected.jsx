import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom"
import { getUserDataProtected } from "../service/fetch"

export const Protected = () => {

  const navigate = useNavigate()
  const [infoUser, setInfoUser] = useState({})

  const getUserData = async(myToken)=>{
    const userData = await getUserDataProtected(myToken,navigate)
    return userData
  }

  useEffect(()=>{
    const fetchUserData = async () => {
      try {
        let myToken = localStorage.getItem("token")
        if (!myToken) {
          navigate("/login")
        }
        const data = await getUserData(myToken)
        setInfoUser(data.user)
        localStorage.setItem("userDataObj", JSON.stringify(data.user))

      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error)
      }
    } 
    fetchUserData()
  },[])

	return(
		<>
      <main>
        <h1>Esta es una pagina protegida</h1>
        <h2>Esta es tu info:</h2>
        <h3>pdt: Se ve precioso este front no me lo devuelvas porfavor si me lo devuelves un perrito muere</h3>
        <img src="https://imgs.search.brave.com/-252vmjgK5A7tqbDtBGwJ01m7SB1-14hnULRYWAyHvg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9paDEu/cmVkYnViYmxlLm5l/dC9pbWFnZS4yNTE1/NjgyODY5Ljc2OTIv/cmFmLDM2MHgzNjAs/MDc1LHQsZmFmYWZh/OmNhNDQzZjQ3ODYu/anBn" alt="perrito triste" />
        {infoUser?(
          <section>
            <p className="ms-5">{infoUser.name}</p>
            <p className="ms-5">{infoUser.description}</p>
            <p className="ms-5">{infoUser.edad}</p>
            <p className="ms-5">{infoUser.email}</p>
          </section>
        ):(null)}
      </main>
    </>
	)
}