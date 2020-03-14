import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component{
  
  constructor(props){
    super(props)

    this.state = { 
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: [{name:"playlistName1", artist:"playlistArtist1",album:"playlistAlbum",id:1},
      {name:"playlistName2", artist:"playlistArtist2",album:"playlistAlbum",id:2}]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
  }

  removeTrack(track) { 
    if(this)
  }

  render(){
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist playlist={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>

        </div>
      </div>
    );
  }
}


export default App;
