import React from "react";
const url = import.meta.env.VITE_BACKEND_URL;

export const LoginUserFetch = async (userdata) => {
  console.log(userdata);
  try {
    const response = await fetch(`${url}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });
      const data =  await response.json()
      console.log(data)
      return data 
  } catch (error) {
    console.error("Error al hacer login:", error);
  }
};
