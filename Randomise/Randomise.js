import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import Button from '../components/Button';

class Randomise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fontLoaded: false
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

//   handleSelect(type) {
//     console.log(type);
//     this.setState({ selected: type, isLoading: true });
//     this.fetchData(type);
//   }

//   fetchData(type){
//     let results = []
//     fetch(`http://www.dnd5eapi.co/api/${type}/`)
//       .then(response => response.json())
//       .then(data => {
//         let list = this.formatData(data.results);
//         this.setState({list, isLoading: false});
//       });
//   }

//   formatData(data){
//     let arr = [];
//     data.map((item) => {
//       arr.push({
//         value: item.url,
//         label: item.name
//       });
//     });
//     return arr;
//   }

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
          <Text style={{fontSize: 52, color: 'white', fontFamily: 'DnDC', textAlign: 'center'}}>What would you like to Randomise?</Text>
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


export default Randomise;