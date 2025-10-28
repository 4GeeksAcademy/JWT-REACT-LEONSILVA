import React from "react";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;


export const LoginUserFetch = async (userdata) => {
  try {
    const response = await fetch(`${url}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata), //convertimos a format JSON 
      });
      
      if (!response.ok){
        console.error("Login fallido:",response.status)
        return null
      }

      const data =  await response.json() // desempaquetamos el JSON y lo pasamos a JS
      return data 
  } catch (error) {
    console.error("Error al hacer login:", error);
  }
};

export const getUserDataProtected = async (jwtToken,navigate) => {
  try {
    const response = await fetch(`${url}/protected`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        }
      });
      
      if(response.status == 401){
        localStorage.removeItem("token")
        localStorage.removeItem("userDataObj")
        localStorage.removeItem("isLogin")
        navigate("/login")
      }
      
      if (!response.ok){
        console.error("peticion fallida:",response.status)
        return null
      }

      const data =  await response.json()
      //console.log(data.user.name)
      return data 
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

export const sendUserData = async (info) => {
  console.log(info)
  try {
    const response = await fetch(`${url}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info)
      });
      
      if (!response.ok){
        console.error("peticion fallida:",response.status)
        return null
      }

      const data =  await response.json()
      //console.log(data.user.name)
      return data 
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};
