import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  
  constructor(props){
    super(props)

    this.state = { 
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
     
      this.state.playlistTracks.push(track);
    }
  }

  removeTrack(track) { 
    let tracks = this.state.playlistTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
      
    this.setState( {playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      })
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
    .then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  

  render(){
    return (
      <div>
          <h1>Beat<span className="highlight">S</span>ync</h1>
        <div className="App">
            <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist playlist={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onSave={this.savePlaylist} />
          </div>

        </div>
      </div>
    );
  }
}


export default App;
