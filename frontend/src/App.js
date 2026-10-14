import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AskAI } from "@/components/site/AskAI";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import CaseStudy from "@/pages/CaseStudy";
import About from "@/pages/About";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";
import Matcher from "@/pages/Matcher";
import Login from "@/pages/Login";
import OwnerLayout from "@/pages/owner/OwnerLayout";
import Strategy from "@/pages/owner/Strategy";
import Tailor from "@/pages/owner/Tailor";
import Inbox from "@/pages/owner/Inbox";
import Applications from "@/pages/owner/Applications";
import Interview from "@/pages/owner/Interview";

const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const PublicLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <AskAI />
  </>
);

function App() {
  return (
    <div className="App grain">
      <AuthProvider>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/match" element={<Matcher />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/owner" element={<OwnerLayout />}>
              <Route index element={<Strategy />} />
              <Route path="tailor" element={<Tailor />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="applications" element={<Applications />} />
              <Route path="interview" element={<Interview />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" theme="dark" />
      </AuthProvider>
    </div>
  );
}

export default App;
