import React from "react";
import { useState } from "react";
import { sendUserData } from "../service/fetch";
import { useNavigate } from "react-router-dom";

export const Singup = () => {

  const navigate = useNavigate()
  const [errorMsn,setErrorMsn] = useState()
  const [infoToSend,setInfoToSend] = useState(
    {
      "name" : "",
      "description":"",
      "edad": "",
      "email":"",
      "password":""
    }
  )
  //console.log(infoToSend)
  const callSendData = async (info)=>{
    const response = await sendUserData(info)
    if (response){
      localStorage.setItem("token",response.acces_token)
      localStorage.setItem("isLogin", true)
      navigate("/protected")
    } else {
      setErrorMsn("Email ya registrado")
    }
  }


  return (
    <>
      <main className="d-flex justify-content-center align-items-center">
        <form className="form-signup">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name" maxLength={50} required onChange={(e)=>{
              setInfoToSend({...infoToSend, name : e.target.value})
            }} />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">Edad</label>
            <input type="number" className="form-control" id="edad" min={0} required onChange={(e)=>{
              setInfoToSend({...infoToSend, edad : e.target.value})
            }}/>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              maxLength={200}
              rows={3}
              placeholder="Máximo 200 caracteres"
              required
              onChange={(e)=>{
              setInfoToSend({...infoToSend, description : e.target.value})
            }}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              onChange={(e)=>{
              setInfoToSend({...infoToSend, email : e.target.value})
            }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" required onChange={(e)=>{
              setInfoToSend({...infoToSend, password : e.target.value})
            }}/>
            
          </div>
          <button type="submit" className="btn btn-primary" onClick={(e)=>{
            e.preventDefault()
            callSendData(infoToSend)
          }}>Submit</button>
          {errorMsn ? (
              <p>{errorMsn}</p>
            ):(
              null
            )}
        </form>
      </main>
    </>
  )
};
