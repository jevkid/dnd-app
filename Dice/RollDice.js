import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import Dice from '../components/Dice';

class RollDice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false,
      d4: 4,
      d6: 6,
      d8: 8,
      d10: 10,
      d12: 12,
      d20: 20
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

  rollDice(dice, max){
    this.setState({[dice]: (Math.floor(Math.random() * max) + 1) });
  }

  render() {    
    return (
        <View style={styles.container}>
          {this.state.fontLoaded &&
            <Text style={{fontSize: 52, color: 'white', fontFamily: 'DnDC'}}>Choose your weapon</Text>
          }
          <View >
            <Dice sides='d4' val={this.state.d4} handlePress={() => { this.rollDice('d4', 4) }} textStyle={{top: -45}}/>
            <Dice sides='d6' val={this.state.d6} handlePress={() => { this.rollDice('d6', 6) }} textStyle={{top: -47}}/>
            <Dice sides='d8' val={this.state.d8} handlePress={() => { this.rollDice('d8', 8) }} textStyle={{top: -40}}/>
          </View>
          <View >
            <Dice sides='d10' val={this.state.d10} handlePress={() => { this.rollDice('d10', 10) }} textStyle={{top: -50}}/>
            <Dice sides='d12' val={this.state.d12} handlePress={() => { this.rollDice('d12', 12) }} textStyle={{top: -51}}/>
            <Dice sides='d20' val={this.state.d20} handlePress={() => { this.rollDice('d20', 20) }} textStyle={{top: -55}}/>
          </View>
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
  }
});

export default RollDice;