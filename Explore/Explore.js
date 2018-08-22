import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Overlay } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import Button from '../components/Button';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fontLoaded: false,
      showMechanics: false
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

  handleButton(type, isSub) {
    this.setState({ selected: type, isLoading: true });
    this.fetchListData(type);
    if(isSub) {
      this.fetchListData(`Sub${type}`, true);
    }
  }

  handleSelect(url) {
    this.setState({ isLoading: true });
    this.fetchResultData(url);
  }

  fetchListData(type, isSub){
    fetch(`http://www.dnd5eapi.co/api/${type}/`)
      .then(response => response.json())
      .then(data => {
        if(isSub){
          let sublist = this.formatData(data.results);
          this.setState({sublist, isLoading: false});
        } else {
          let list = this.formatData(data.results);
          this.setState({list, isLoading: false});
        }
      });
  }

  // fetchResultData(url){
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({result: data, isLoading: false, showModal: true});
  //     });
  // }

  // handleCloseModal(val){
  //   this.setState({ showModal: false });
  // }

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
    const { navigate } = this.props.navigation;
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          {this.state.fontLoaded &&
            <Text style={{fontSize: 52, color: 'white', fontFamily: 'DnDC', textAlign: 'center'}}>Loading...</Text>
          }
        </View>
      )
    }
    const selected = this.state.selected;
    const isSub = selected && (selected === 'classes' || selected === 'races');
    return (
      <View style={styles.container}>
        {this.state.fontLoaded &&
          <Text style={{fontSize: 52, color: 'white', fontFamily: 'DnDC', textAlign: 'center'}}>What would you like to explore?</Text>
        }
        <View style={{flexDirection: 'row', flexWrap: 'wrap', maxWidth: 340}}>
          <Button title="Classes" id="classes" disabled={selected === 'classes'} handlePress={() => { this.handleButton('classes', true) }}/>                    
          <Button title="Races" id="races" disabled={selected === 'races'} handlePress={() => { this.handleButton('races', true) }}/>
          <Button title="Equipment" id="equipment" disabled={selected === 'equipment'} handlePress={() => { this.handleButton('equipment') }}/>
          <Button title="Conditions" id="conditions" disabled={selected === 'conditions'} handlePress={() => { this.handleButton('conditions') }}/>
        </View>
        {selected &&
          <Dropdown
            label={selected.charAt(0).toUpperCase() + selected.slice(1)}
            data={this.state.list}
            containerStyle={styles.dropdown}
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            onChangeText={(value, id, data) => 
              navigate('ExploreCard', { 
                type: selected,
                value: value
              })
            }
          />
        }
        {/* {isSub &&
          <Dropdown
            label={`Sub${selected}`}
            data={this.state.sublist}
            containerStyle={styles.dropdown}
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            onChangeText={(value) => this.handleSelect(value)}
          />
        } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#263238'
  },
  dropdown: {
    width: '90%',
    backgroundColor: 'transparent'    
  }
});


export default Explore;