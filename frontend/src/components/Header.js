import pageLogo from '../images/header-logo.svg';
import { Link, useNavigate  } from 'react-router-dom'

function Header(props) {
    const navigate = useNavigate();

    function logOut(e) {
        if(props.link === "") {
            e.preventDefault();
            props.onLogIn(false);
            navigate('/sign-in', {replace: true});
            localStorage.removeItem('jwt');

        }
    }

    return (<header className="header">
        <img src={pageLogo} alt="Логотип заголовка" className="header__logo" />
        <div className='header__user-menu'>
            {props.loggedIn && <p className='header__email'>{props.email}</p>}
            <Link onClick={logOut} to={props.link} className='header__link'>{props.linkName}</Link>
        </div>
    </header>)
}

export default Header;