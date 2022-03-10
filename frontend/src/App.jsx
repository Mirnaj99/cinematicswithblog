import "./app.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import Blog from "./pages/BlogHome/Blog";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Details from "./pages/movieDetails/Details";
import Watchtrailer from "./pages/watchtrailer/Watchtrailer";
import Mylist from "./pages/mylist/Mylist";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate replace to="/register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate replace to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/movies"
          element={user ? <Home type="movie" /> : <Login />}
        />
        <Route
          path="/series"
          element={user ? <Home type="series" /> : <Login />}
        />
        <Route path="/watch" element={user ? <Watchtrailer /> : <Login />} />
        <Route
          path="/watchtrailer"
          element={user ? <Watchtrailer /> : <Login />}
        />
        <Route
          path="/details/:title"
          element={user ? <Details /> : <Login />}
        />
        <Route path="/mylist" element={user ? <Mylist /> : <Login />} />
        
      </Routes>

      <Routes>
        <Route path="/blog" element={user ? <Blog /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
