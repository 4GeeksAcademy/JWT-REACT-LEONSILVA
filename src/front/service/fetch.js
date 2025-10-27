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
