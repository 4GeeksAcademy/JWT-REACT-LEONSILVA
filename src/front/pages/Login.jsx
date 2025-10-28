import React from "react";
import { Link } from "react-router-dom";
import { LoginUserFetch } from "../service/fetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
  
  const navigate = useNavigate()
  const [email,setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMsn,setErrorMsn] = useState()
  const {store,dispatch} = useGlobalReducer()

  const handleChangesEmail = (event) =>{
    setEmail(event.target.value)
  } 
  const handleChangesPassword = (event) =>{
    setPassword(event.target.value)
  } 
  const sendInfo = async(event) =>{
    event.preventDefault()
    const response =  await LoginUserFetch({"email":email,"password":password})
    if (response){
      localStorage.setItem("token",response.JWT)
      localStorage.setItem("isLogin", true)
      setErrorMsn(null)
      navigate("/protected")
    }
    else {
      setErrorMsn("password or email not avaliable")
    }
  }

  return(
    <>
      <main>  
        <form className="login-form login-size" onSubmit={(e) => { e.preventDefault(); sendInfo(); }}>
          <h2>Iniciar sesión</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Tu correo"  
              className="form-control"
              onChange={handleChangesEmail}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Tu contraseña"
              className="form-control"
              onChange={handleChangesPassword} 
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={sendInfo}>Entrar</button>

          <p className="mt-3">
            ¿No tienes cuenta?{" "}
            <Link to={"/"}>
              <span>Regístrate aquí</span>
            </Link>
          </p>

          {errorMsn && <p className="text-danger">{errorMsn}</p>}
        </form>
      </main>
    </>
  )
};
