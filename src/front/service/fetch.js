import React from "react";
const url = import.meta.env.VITE_BACKEND_URL;

export const LoginUserFetch = async (userdata) => {
  try {
    const response = await fetch(`${url}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });
      
      if (!response.ok){
        console.error("Login fallido:",response.status)
        return null
      }

      const data =  await response.json()
      return data 
  } catch (error) {
    console.error("Error al hacer login:", error);
  }
};

export const getUserDataProtected = async (jwtToken) => {
  try {
    const response = await fetch(`${url}/protected`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        }
      });
      
      if (!response.ok){
        console.error("peticion fallida:",response.status)
        return null
      }

      const data =  await response.json()
      console.log(data)
      return data 
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};
