const clientID ="f243bdd248e14ce49e7b31c602f04f56"
const redirectURL = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }

        //checks for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessTokenMatch = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //Clears parameters, making it so that new access token is  able to be obtained after session expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else{
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;

            window.location = accessURL;
        }
    },

    search(term) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: {Authorization: `Bearer ${accessToken}`}})
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            if(jsonResponse.track){
                return jsonResponse.tracks.item.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            }else{
                return {};
            }
        })
    },

    savePlaylist(playlistName, trackURI) {
        if(!name || !trackURI.length){
            return;
        }

        const  accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response =>{
             userId = response.json();
             return fetch(`https://api.spotify.com/v1/${userId}/playlists`, {
                 headers: headers,
                 method: 'POST',
                 body: JSON.stringify({ name: name})
             }).then(response => response.json())
             .then(jsonResponse => {
                 const playlistId = jsonResponse.id;
             })

        })
        
    }

}

export default Spotify;