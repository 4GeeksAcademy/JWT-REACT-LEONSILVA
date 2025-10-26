import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Protected } from "./pages/Protected";
import { Singup } from "./pages/Singup";
import { Login } from "./pages/Login";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/protected" element={<Protected />} /> {/*pagina a la que podran entrar aquellos que tenga permiso*/}
        <Route index element={ <Singup />} /> {/*pagina para registrar o darle al button del login*/}
        <Route path="/login" element={<Login />} />
      </Route>
    )
);