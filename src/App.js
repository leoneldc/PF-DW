import { Outlet } from "react-router-dom";
import Navbar from "./components/views/Navbar";

function App(params) {
    return(
            <div className="main">
                <Navbar/>
                <Outlet/>
            </div>
        )    
}

export default App;

