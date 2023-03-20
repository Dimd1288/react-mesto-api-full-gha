import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useLoadingButton } from "../hooks/useLoadingButton";

function EditProfilePopup(props) {
    const { values, handleChange, errors, isValid, resetForm, setValues } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);
    const { buttonText, handleButtonChange,  resetButton} = useLoadingButton("Сохранить", "Сохранение...");

    useEffect(() => {
        resetForm();
        setValues({name: currentUser.name, about:currentUser.about});
        resetButton();
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        handleButtonChange();
        props.onUpdateUser({
          name: values.name,
          about: values.about,
        });
      } 

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText={buttonText} isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isValid={isValid}>
            <div className="popup__input-container">
                <input type="text" name="name" value={values.name || ''} onChange={handleChange} placeholder="Имя" className="popup__input" id="name-input" minLength="2"
                    maxLength="40" required />
                <span className="popup__error name-input-error">{errors.name}</span>
            </div>
            <div className="popup__input-container">
                <input type="text" name="about" value={values.about || ''} onChange={handleChange} placeholder="О себе" className="popup__input" id="about-input"
                    minLength="2" maxLength="200" required />
                <span className="popup__error about-input-error">{errors.about}</span>
            </div>
        </PopupWithForm>)
}
export default EditProfilePopup;