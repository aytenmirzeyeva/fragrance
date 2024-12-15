import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Notes from "./pages/NotesPage";
import Brands from "./pages/BrandsPage";
import Footer from "./components/layout/Footer";
import PerfumePage from "./pages/PerfumePage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/perfumePage/:perfumeId" element={<PerfumePage />} />
        <Route path="/favoritesPage" element={<FavoritesPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
