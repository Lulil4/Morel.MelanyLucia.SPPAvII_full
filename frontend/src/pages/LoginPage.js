import { Link } from 'react-router-dom';
import Login from '../components/Login';

function LoginPage() {

    return (
        <div className="centrado" style={{width:"40%"}}>
            <Login />
            <button className="button is-primary"><Link to="/registro">Registrarse</Link></button>
        </div>
    );
}

export default LoginPage;