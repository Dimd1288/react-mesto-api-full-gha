import iconSuccess from '../images/success.svg';
import iconDecline from '../images/decline.svg';
import { useEffect, useRef } from 'react';

function InfoTooltip(props) {
    const ref = useRef();
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
    },[props.isOpen, props.isSuccess]);

    function handleClose(e) {
        if (e.target === ref.current) {
            props.onClose();
        }
    }

    return(
        <div ref={ref} className={`tooltip ${props.isOpen ? 'tooltip_visible' : ''}`} onClick={handleClose}>
            <div className="tooltip__container">
                <button className="tooltip__close-icon" onClick={props.onClose}></button>
                <img src={props.isSuccess ? iconSuccess : iconDecline} className="tooltip__image"/>
                <p className="tooltip__message">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;