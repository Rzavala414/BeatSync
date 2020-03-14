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
    }
}

export default Spotify;