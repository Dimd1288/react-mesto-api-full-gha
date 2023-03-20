class Api {
    constructor(options) {
        this._options = options;
        this._cardsEndpoint = `${this._options.baseUrl}/cards`;
        this._userEndpoint = `${this._options.baseUrl}/users/me`;
        this._authorization = this._options.headers.authorization;
        this._contentType = this._options.headers['Content-Type'];
    }

    getInitialCards() {
        return fetch(this._cardsEndpoint, {
            headers: {
                authorization: this._authorization,
            }
        })
            .then(this._checkResponse);
    }

    getUser() {
        return fetch(this._userEndpoint, {
            headers: {
                authorization: this._authorization,
            }
        })
            .then(this._checkResponse);
    }

    patchUser(userData) {
        return fetch(this._userEndpoint, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        }).then(this._checkResponse);
    }

    postNewCard(cardData) {
        return fetch(this._cardsEndpoint, {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._cardsEndpoint}/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        }).then(this._checkResponse);

    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._cardsEndpoint}/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: {
                authorization: this._authorization
            }
        }).then(this._checkResponse);
    }

    patchAvatar(avatar) {
        return fetch(`${this._userEndpoint}/avatar`, {
            method: 'PATCH', 
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                avatar: avatar.avatar
            })
            
        })
        .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status)
    }

    
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
      authorization: 'd336096d-2d8c-44f4-af75-d1804dff5c64',
      'Content-Type': 'application/json'
    }
  });
export default api;