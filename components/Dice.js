import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

export default class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    if(this.props.sides === 'd12'){
      return (
        <Touchable
            diceId={this.props.id}
            disabled={this.props.disabled}
            onPress={this.props.handlePress}
            style={styles.base}
          >
          <View>
          <View>
            <View style={[styles.d12]} />
            <View style={[styles.d12Flat, styles.d12]} />
            <View style={[styles.d12Left, styles.d12]} />
            <View style={[styles.d12Right, styles.d12]} />
          </View>
          {this.state.fontLoaded &&
            <View style={this.props.textStyle}><Text style={{fontSize: 24, color: 'white', fontFamily: 'LibreBaskerville-Regular'}}>{this.props.val}</Text></View>
          }
          </View>
        </Touchable>
      )
    }
    if(this.props.sides !== 'd12'){
      return (
        <Touchable
          diceId={this.props.id}
          disabled={this.props.disabled}
          onPress={this.props.handlePress}
          style={styles.base}
        >
          <View>
            <View>
              <View style={styles[`${this.props.sides}Before`]}></View>
              <View style={styles[`${this.props.sides}`]}></View>
              <View style={styles[`${this.props.sides}After`]}></View>
            </View>
            {this.state.fontLoaded &&
              <View style={this.props.textStyle}><Text style={{fontSize: 24, color: 'white', fontFamily: 'LibreBaskerville-Regular'}}>{this.props.val}</Text></View>
            }
          </View>
        </Touchable>
      );
    }
  }
}

Dice.propTypes = {
  sides: PropTypes.string,
  disabled: PropTypes.bool,
  handlePress: PropTypes.func,
  textStyle: PropTypes.object
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  // D4 TRIANGLE
  d4Before:{},
  d4:{
    width: 0,
    height: 0,
    bottom: 0,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderBottomWidth: 76.6,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderColor: 'transparent',
    borderBottomColor:'#1abc9c'
  },
  d4After:{},

  // D6 SQUARE
  d6Before:{},
  d6:{
    margin: 0,
    width: 65,
    height: 65,
    position: 'relative',
    backgroundColor: '#1abc9c'
  },
  d6After:{},

  // D8 DIAMOND
  d8Before:{},
  d8:{
    width: 50,
    height: 50,
    left: Platform.OS === 'android' ? 20 : 0,
    backgroundColor: '#1abc9c',
    transform: [
      {rotate: '47deg'}
    ]
  },
  d8After:{},
  // D10
  d10Before:{},
  d10:{
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderLeftWidth: 35,
    borderRightColor: 'transparent',
    borderRightWidth: 35,
    borderBottomColor: '#1abc9c',
    borderBottomWidth: 25
  },
  d10After:{
    borderTopWidth: 40,
    borderTopColor: '#1abc9c',
    borderLeftColor: 'transparent',
    borderLeftWidth: 35,
    borderRightColor: 'transparent',
    borderRightWidth: 35,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0
  },
  // D12 OCTAGON
  d12: {
    width: 31.5,  
    height: 75,
    left: Platform.OS === 'android' ? 20 : 0,
    backgroundColor: '#1abc9c'
  },
  d12Flat: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [
      {rotate: '90deg'}
    ]
  },
  d12Left: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [
      {rotate: '-45deg'}
    ]
  },
  d12Right: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [
      {rotate: '45deg'}
    ]
  },
  // D20
  d20Before:{
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: 37.5,
    borderColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 20,
    borderBottomColor: '#1abc9c',
  },
  d20: {
    width: 75,
    height: 42,
    position: 'relative',
    backgroundColor: '#1abc9c'
  },
  d20After: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: 37.5,
    borderColor: 'rgba(0,0,0,0)',
    borderTopWidth: 22,
    borderTopColor: '#1abc9c',
    borderBottomWidth: 2,
  }
});