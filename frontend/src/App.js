import RegisterForm from "./fake-data";

import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center items-center">
      <div><RegisterForm/></div>
      <Login />
    </div>
  );
}

export default App;
