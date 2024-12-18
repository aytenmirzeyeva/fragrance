import { Routes, Route } from "react-router-dom";
import Header from "../layout/Header";
import Home from "./pages/Home";
import Notes from "./pages/NotesPage";
import Brands from "./pages/BrandsPage";
import Footer from "../layout/Footer";
import DetailsPage from "./pages/DetailsPage";
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
        <Route path="/detailsPage/:perfumeId" element={<DetailsPage />} />
        <Route path="/favoritesPage" element={<FavoritesPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
