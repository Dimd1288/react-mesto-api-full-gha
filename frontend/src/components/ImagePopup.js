import { useRef } from "react";

function ImagePopup(props) {
    const ref = useRef();

    function handleClose(e) {
        if (e.target === ref.current) {
            props.onClose();
        }
    }
    
    return (
        <div ref={ref} className={`popup popup_overlay_dark ${props.card.isOpened ? 'popup_opened' : ''}`} id="element-popup" onClick={handleClose}>
            <div className="popup__container popup__container_place_element">
                <button onClick={props.onClose} type="button" className="popup__close-icon"></button>
                <figure className="popup__figure">
                    <img src={props.card.link} alt={props.card.name} className="popup__image" />
                    <figcaption className="popup__caption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;