import routes from "./conts";
import { Route, Routes } from "react-router-dom";

const RouterPath = () => {
  return (
    <Routes>
      {
        routes.map((item, index) => {
          return <Route key={index} path={item.path} element={item.component} />
        })
      }
    </Routes>
  )
}

export default RouterPath;

