import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recovery from "./pages/Recovery";
import Home from "./pages/Home";
import Password from "./pages/Password";
import Reset from "./pages/Reset";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import Register1 from "./pages/Register1";
import Email from "./pages/Email";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/register" element={<Register1 />}></Route>
          <Route path="/recover" element={<Recovery />}></Route>
          <Route path="/password" element={<Password />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="/sendMail" element={<Email/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
