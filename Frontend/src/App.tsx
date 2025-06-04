import { Route, Routes } from "react-router-dom";
import { Inicio } from "./inicio/inicioHTML";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
    </Routes>
  )
}
