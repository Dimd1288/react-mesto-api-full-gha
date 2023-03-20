import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useLoadingButton } from "../hooks/useLoadingButton";

function AddPlacePopup(props) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const { buttonText, handleButtonChange,  resetButton} = useLoadingButton("Создать", "Сохранение...");

    useEffect(() => {
        resetForm();
        resetButton();
    }, [props.isOpen]);


    function handleSubmit(e) {
        e.preventDefault();

        handleButtonChange();
        props.onAddPlace({
            name: values.name, link: values.link
        });
    }

    return (
    <PopupWithForm name="add-place" title="Новое место" buttonText={buttonText} isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isValid={isValid}>
        <div className="popup__input-container">
            <input type="text" name="name" value={values.name || ''} onChange={handleChange} placeholder="Название" className="popup__input" id="title-input"
                minLength="2" maxLength="30" required />
            <span className="popup__error title-input-error">{errors.name}</span>
        </div>
        <div className="popup__input-container">
            <input type="url" name="link" value={values.link || ''} onChange={handleChange} placeholder="Ссылка на картинку" className="popup__input" id="link-input"
                required />
            <span className="popup__error link-input-error">{errors.link}</span>
        </div>
    </PopupWithForm>);
}

export default AddPlacePopup;