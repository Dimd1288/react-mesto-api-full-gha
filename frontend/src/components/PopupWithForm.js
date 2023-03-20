import { useEffect, useRef } from "react";

function PopupWithForm(props) {
    const ref = useRef();

    function handleClose(e) {
        if (e.target === ref.current) {
            props.onClose();
        }
    }

    useEffect(() => {
        function handleEsc(e){
            if(e.key === 'Escape') {
                props.onClose();
            }
        }
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    },[props.isOpened])

    return (
        <div ref={ref} className={`popup ${props.isOpened ? 'popup_opened' : ''}`} id={`${props.name}`} onClick={handleClose}>
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__close-icon"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form name="${props.name}-form" action="https://server.serve" method="post" onSubmit={props.onSubmit} className="popup__form" noValidate>
                    {props.children}
                    <button type="submit" className={`popup__save-button ${!props.isValid ? 'popup__save-button_disabled' : ''}`} disabled={!props.isValid}>{props.buttonText}</button>
                </form>
            </div>
        </div>);
}

export default PopupWithForm;