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
      tracks = tracks.filter(currentTrack => currentTrack.id != track.id)
      
    this.setState( {playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  search(searchTerm) {
    console.log(searchTerm);
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
