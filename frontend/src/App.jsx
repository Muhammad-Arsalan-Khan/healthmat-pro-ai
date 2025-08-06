import Home from "./pages/Home";
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <Home />
      <ToastContainer
        position="top-left"
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
      />
    </>
  );
}

export default App
