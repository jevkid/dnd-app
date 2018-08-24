import React, { Component } from 'react';
import { Font, LinearGradient } from 'expo';
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
        'Kosugi-Regular': require('../assets/fonts/Kosugi-Regular.ttf')
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
            <Text style={{fontSize: 52, color: 'white', fontFamily: 'Kosugi-Regular', textAlign: 'left'}}>What would you like to explore?</Text>
          }
          <View style={{flexDirection: 'row', flexWrap: 'wrap', maxWidth: 340}}>
            <Button title="classes" id="classes" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} disabled={selected === 'classes'} handlePress={() => { this.handleButton('classes', true) }}/>                    
            <Button title="races" id="races" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} disabled={selected === 'races'} handlePress={() => { this.handleButton('races', true) }}/>
            <Button title="equip" id="equipment" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} disabled={selected === 'equipment'} handlePress={() => { this.handleButton('equipment') }}/>
            <Button title="conditions" id="conditions" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} disabled={selected === 'conditions'} handlePress={() => { this.handleButton('conditions') }}/>
          </View>
          {this.state.fontLoaded &&
            <Text style={{fontSize: 36, color: 'white', fontFamily: 'Kosugi-Regular', textAlign: 'left'}}>Loading...</Text>
          }
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 'auto',
            }}
          />
        </View>
      )
    }
    const selected = this.state.selected;
    const isSub = selected && (selected === 'classes' || selected === 'races');
    return (
      <View style={styles.container}>
        {this.state.fontLoaded &&
          <Text style={{fontSize: 52, color: 'white', fontFamily: 'Kosugi-Regular', textAlign: 'left'}}>What would you like to explore?</Text>
        }
        <View style={{flexDirection: 'row', flexWrap: 'wrap', maxWidth: 340}}>
          <Button title="classes" id="classes" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} disabled={selected === 'classes'} handlePress={() => { this.handleButton('classes', true) }}/>                    
          <Button title="races" id="races" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} disabled={selected === 'races'} handlePress={() => { this.handleButton('races', true) }}/>
          <Button title="equip" id="equipment" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} disabled={selected === 'equipment'} handlePress={() => { this.handleButton('equipment') }}/>
          <Button title="conditions" id="conditions" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} disabled={selected === 'conditions'} handlePress={() => { this.handleButton('conditions') }}/>
        </View>
        {selected &&
          <Dropdown
            label={selected}
            data={this.state.list}
            containerStyle={styles.dropdown}
            baseColor='#ffffff'
            textColor='#ffffff'
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
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 'auto',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    alignItems: 'flex-start',
    backgroundColor: '#200F44',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  dropdown: {
    width: '90%',
    backgroundColor: 'transparent',
    height: 'auto',
    padding: 0
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 0,
    marginVertical: 25,
    marginRight: 5,
    borderRadius: 2
  },
  disabled: {
    backgroundColor: '#845353',
    borderColor: '#845353'
  },
  text: {
    color: 'white',
    fontFamily: 'Kosugi-Regular'
  }
});


export default Explore;