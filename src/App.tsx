import { Router, Route } from "@solidjs/router"; 
import Landingpage from './pages/Landingpage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPasswordPage from './pages/forgotpassword';
import Sewamotor from './pages/Sewamotor';
import Sewa from './pages/sewa';
import Profil from './pages/Profil';
import Orderan from './pages/Orderan'
import GalleryPage from "./pages/gallery";
import ContactPage from "./pages/contact";
import KirimData from "./pages/kirimdata";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Landingpage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/Sewamotor" component={Sewamotor} />
      <Route path="/sewa" component={Sewa} />
      <Route path="/Profil" component={Profil} />
      <Route path="/Orderan" component={Orderan} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/kirimdata" component={KirimData} />
    </Router>
  );
}
