import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import Dice from '../components/Dice';

class Test extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false,
      isLoading: false
    }
  }
  async componentDidMount() {
    try {
      await Font.loadAsync({
        'DnDC': require('../assets/fonts/DnDC.ttf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  render() {    
    return (
        <View style={styles.container}>
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#263238'
  }
});

export default Test;