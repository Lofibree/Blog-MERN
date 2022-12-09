import Container from "@mui/material/Container";
import { Header } from "./components";
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { PostsByTag } from "./pages/PostsByTag";
import { Navigate } from "react-router-dom";
import PersonalAcc from "./pages/PersonalAcc/PersonalAcc";

function App() {


  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const location = useLocation()

  useEffect(() => {
    dispatch(fetchAuthMe(isAuth))
  }, [])

  if (location.pathname === '/') {
    return <Navigate to='/posts/new' />
  }
 
  // if (!isAuth) {
  //   return <Navigate to='/login' />
  // }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/posts/new" element={<Home/>}/>
          <Route path="/posts/popular" element={<Home/>}/>
          <Route path="/tags/:tag" element={<PostsByTag/>}/>
          <Route path="/posts/:id" element={<FullPost />}/>
          <Route path="/posts/:id/edit" element={<AddPost />}/>
          <Route path="/add-post" element={<AddPost />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Registration />}/>
          <Route path="/personal/me" element={<PersonalAcc />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
