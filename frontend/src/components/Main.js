import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__wrapper">
                    <div style={{ backgroundImage: `url(${currentUser.avatar})`, backgroundSize: "cover" }} className="profile__photo" />
                    <button onClick={props.onEditAvatar} type="button" className="profile__photo-button"></button>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add-button"></button>
            </section>
            <section className="elements" aria-label="elements">
                <ul className="elements__list">
                    {props.cards.map((message) => (
                        <Card onCardClick={props.onCardClick} onCardLike={props.onCardLike} onBasketClick={props.onBasketClick} card={message} key={message._id} />
                    ))}
                </ul>
            </section>
        </main>);
}

export default Main;