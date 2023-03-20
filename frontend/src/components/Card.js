import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onBasketClick, onCardLike }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleBasketClick() {
        onBasketClick(card);
    }

    return (
        <li className="element">
            <div onClick={handleClick} style={{ backgroundImage: `url(${card.link})`, backgroundSize: "cover" }} className="element__image" />
            {isOwn && <button type="button" className="element__basket" onClick={handleBasketClick}></button>}
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <span className="element__like-counter">{card.likes.length}</span>
            </div>
        </li>
    )
}

export default Card;