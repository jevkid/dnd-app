import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Overlay } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import Button from '../components/Button';
import SelectedModal from '../components/SelectedModal';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fontLoaded: false,
      showMechanics: false,
      showModal: false
    }
  }
  async componentDidMount() {
    try {
      await Font.loadAsync({
        'LibreBaskerville-Regular': require('../assets/fonts/LibreBaskerville-Regular.otf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  handleButton(type) {
    this.setState({ selected: type, isLoading: true });
    this.fetchListData(type);
  }

  handleSelect(url) {
    this.setState({ isLoading: true });
    this.fetchResultData(url);
  }

  fetchListData(type){
    fetch(`http://www.dnd5eapi.co/api/${type}/`)
      .then(response => response.json())
      .then(data => {
        let list = this.formatData(data.results);
        this.setState({list, isLoading: false});
      });
  }

  fetchResultData(url){
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({result: data, isLoading: false, showModal: true});
      });
  }

  handleCloseModal(val){
    this.setState({ showModal: false });
  }

  formatData(data){
    let arr = [];
    data.map((item) => {
      arr.push({
        value: item.url,
        label: item.name
      });
    });
    return arr;
  }

  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          {this.state.fontLoaded &&
            <Text style={{fontSize: 52, color: 'white', fontFamily: 'DnDC', textAlign: 'center'}}>Loading...</Text>
          }
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.state.fontLoaded &&
          <Text style={{fontSize: 52, color: 'white', fontFamily: 'DnDC', textAlign: 'center'}}>What would you like to explore?</Text>
        }
        <View style={{flexDirection: 'row', flexWrap: 'wrap', maxWidth: 340}}>
          <Button title="Character data" id="character-data" disabled={this.state.showCharacterData} handlePress={() => { this.setState({ selected: 'Character data', showCharacterData: !this.state.showCharacterData}) }}/>
          <Button title="Classes" id="classes" disabled={this.state.selected === 'classes'} handlePress={() => { this.handleButton('classes') }}/>
          {/* <Button title="Races" id="races" disabled={this.state.selected === 'races'} handlePress={() => { this.handleButton('races') }}/>
          <Button title="Subraces" id="subraces" disabled={this.state.selected === 'subraces'} handlePress={() => { this.handleButton('subraces') }}/>
          <Button title="Equipment" id="equipment" disabled={this.state.selected === 'equipment'} handlePress={() => { this.handleButton('equipment') }}/>
          <Button title="Game Mechanics" id="mechanics" disabled={this.state.showMechanics} handlePress={() => { this.setState({ selected: 'Game mechanics', showMechanics: !this.state.showMechanics}) }}/>           */}
        </View>
        {this.state.selected &&
          <Dropdown
            label={this.state.selected.charAt(0).toUpperCase() + this.state.selected.slice(1)}
            data={this.state.list}
            containerStyle={styles.dropdown}
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            onChangeText={(value) => this.handleSelect(value)}
          />
        }
        {this.state.result && this.state.showModal &&
          <SelectedModal selectedType={this.state.selected} data={this.state.result} closeModal={() => { this.handleCloseModal() }} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#263238'
  },
  dropdown: {
    width: '90%',
    backgroundColor: 'transparent'    
  }
});


export default Explore;