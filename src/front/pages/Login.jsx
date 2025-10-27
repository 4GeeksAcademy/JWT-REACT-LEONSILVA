import React from "react";
import { Link } from "react-router-dom";
import { LoginUserFetch } from "../service/fetch";
import { useState } from "react";


export const Login = () => {
  
  const [email,setEmail] = useState()
  const [password, setPassword] = useState()

  const handleChangesEmail = (event) =>{
    setEmail(event.target.value)
  } 
  const handleChangesPassword = (event) =>{
    setPassword(event.target.value)
  } 
  const sendInfo = async(event) =>{
    event.preventDefault()
    const response =  await LoginUserFetch({"email":email,"password":password})
    console.log(response)
  }

  return(
    <>
      <main>
        <div className="form-box">  
          <form action="/login" method="POST" className="login-form">
            <h2>Iniciar sesión</h2>

            <label for="email">Correo electrónico:</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Tu correo"  
            onChange={handleChangesEmail}
            required
            />

            <label for="password">Contraseña:</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Tu contraseña"
            onChange={handleChangesPassword} 
            required
            />

            <button type="submit" onClick={sendInfo}>Entrar</button>

            <p>¿No tienes cuenta? <Link to={"/"}> <p>Regístrate aquí</p></Link></p>
          </form>
        </div>
      </main>
    </>
  )
};
