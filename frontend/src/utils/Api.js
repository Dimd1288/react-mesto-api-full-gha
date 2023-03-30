class Api {
    constructor(options) {
        this._options = options;
        this._cardsEndpoint = `${this._options.baseUrl}/cards`;
        this._userEndpoint = `${this._options.baseUrl}/users/me`;
        this._contentType = this._options.headers['Content-Type'];
    }

    getInitialCards() {
        return fetch(this._cardsEndpoint, {credentials: 'include'})
            .then(this._checkResponse);
    }

    getUser() {
        return fetch(this._userEndpoint, {credentials: 'include'})
            .then(this._checkResponse);
    }

    patchUser(userData) {
        return fetch(this._userEndpoint, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
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
            credentials: 'include',
            headers: {
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
            credentials: 'include'
        }).then(this._checkResponse);

    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._cardsEndpoint}/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            credentials: 'include'
        }).then(this._checkResponse);
    }

    patchAvatar(avatar) {
        return fetch(`${this._userEndpoint}/avatar`, {
            method: 'PATCH', 
            credentials: 'include',
            headers: {
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
    baseUrl: 'https://api.dedomrachev.nomoredomains.work',
    headers: {
      'Content-Type': 'application/json'
    }
  });
export default api;