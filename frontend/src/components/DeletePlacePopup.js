import { useRef, useEffect } from "react";
import { useLoadingButton } from "../hooks/useLoadingButton";

function DeletePlacePopup(props) {
    const ref = useRef();
    const {buttonText, handleButtonChange,  resetButton} = useLoadingButton("Да", "Удаление...");

    useEffect(() => {
        resetButton();
    }, [props.isOpen]);

    function handleClose(e) {
        if (e.target === ref.current) {
            props.onClose();
        }
    }

    function handleSubmit() {
        handleButtonChange();
        props.onCardDelete(props.card);
    }

    return (
        <div ref={ref} className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id="delete-place" onClick={handleClose}>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <h2 className="popup__title">Вы уверены?</h2>
                <button type="submit" className="popup__save-button" onClick={handleSubmit}>{buttonText}</button>
            </div>
        </div>
    )
}

export default DeletePlacePopup;