import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useLoadingButton } from "../hooks/useLoadingButton";

function EditAvatarPopup(props) {
    const { handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const imageRef = useRef();
    const { buttonText, handleButtonChange,  resetButton} = useLoadingButton("Обновить", "Сохранение...");

    useEffect(() => {
        resetForm();
        resetButton();
        imageRef.current.value='';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        handleButtonChange();
        props.onUpdateAvatar({
          avatar: imageRef.current.value,
        });
      } 

    return (
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonText={buttonText} isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isValid={isValid}>
            <div className="popup__input-container">
                <input ref={imageRef} type="url" name="avatar" placeholder="Ссылка на картинку" className="popup__input" id="avatar-input" onChange={handleChange}
                    required />
                <span className="popup__error avatar-input-error">{errors.avatar}</span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;