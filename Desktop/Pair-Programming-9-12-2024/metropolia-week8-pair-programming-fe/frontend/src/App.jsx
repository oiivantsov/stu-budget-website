import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import ThemeProvider from "./Context/ThemeProvider";
import AuthProvider from "./Context/AuthProvider";
// import RouteGuard from "./components/RouteGuard";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
     <AuthProvider>
      {/*<ThemeProvider>*/} 
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs/:id" element={<JobPage />} />
                <Route path="/jobs/add-job" element={<AddJobPage />} />
                <Route path="/edit-job/:id" element={<EditJobPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      {/*</ThemeProvider>*/} 
     </AuthProvider>
  );
};

export default App;
