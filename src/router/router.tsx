import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdvertismentsPage } from "../pages/advertisments";
import { NewAdvertismentPage } from "../pages/newAdvertisment";
import { HomePage } from "../pages/home";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { ErrorPage } from "../pages/error";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advertisments" element={<ProtectedRoute />}>
          <Route index element={<AdvertismentsPage />} />
          <Route path="new" element={<NewAdvertismentPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};
