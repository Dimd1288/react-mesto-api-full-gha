import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";

function Register(props) {
    const [creds, setCredentials] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        props.onChangeHeader({
            link: "/sign-in",
            name: "Войти"
        });
    }, [])

    const [isStatusSuccess, changeStatus] = useState(true);
    const navigate = useNavigate();

    function handleStatusChange(res) {
        if (!res) {
            changeStatus(false)} else changeStatus(true);
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setCredentials({ 
            ...creds, 
            [name]: value 
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const {email, password} = creds;
        props.onRegister(email, password)
        .then((res) => {
            handleStatusChange(res);
            setCredentials({username: '', password: ''});
        })
            .finally(() => props.onTooltipOpen())
    }

    function onTooltipClose() {
        if (isStatusSuccess) {
            navigate('/sign-in', {replace: true});
            props.onTooltipClose();
        } else {
            props.onTooltipClose();
        }
    }

    return (
        <>
            <main className="auth-page">
                <div className="auth-page__form-container">
                    <h2 className="auth-page__title">Регистрация</h2>
                    <form className="auth-page__form" onSubmit={handleSubmit}>
                        <input name="email" className="auth-page__input" placeholder="Email" onChange={handleChange} value={creds.email || ''} id="email-input" />
                        <input name="password" className="auth-page__input" placeholder="Пароль" onChange={handleChange} value={creds.password || ''} id="password-input" />
                        <button type="submit" className="auth-page__button">Зарегистрироваться</button>
                    </form>
                    <p className="auth-page__form-caption">Уже зарегистрированы? <Link className="auth-page__link" to="/sign-in">Войти</Link></p>
                </div>
            </main>
            <InfoTooltip isSuccess={isStatusSuccess} isOpen={props.isTooltipOpen} onClose={onTooltipClose}/>
        </>
    );
}

export default Register;