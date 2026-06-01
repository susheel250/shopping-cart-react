import Navbar from "./components/Navbar";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <div className="main-content">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
