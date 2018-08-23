import React, { Component } from 'react';
import { Font, LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
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
  render() {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    if(this.props.gradient){
      return (
        <Touchable
          testID={this.props.id}
          disabled={this.props.disabled}
          onPress={this.props.handlePress}>
          <LinearGradient
            start={[0.5, 0.2]}
            colors={this.props.colors}
            style={this.props.disabled ? [this.props.buttonStyle, this.props.disabledStyle] : this.props.buttonStyle}
          >
            {this.state.fontLoaded &&
              <Text style={this.props.textStyle}>
                {this.props.title}
              </Text>
            }
          </LinearGradient>
        </Touchable>
      );
    } else {

    }
    return (
      <Touchable
        testID={this.props.id}
        disabled={this.props.disabled}
        onPress={this.props.handlePress}>
        <View style={this.props.disabled ? [this.props.buttonStyle, this.props.disabledStyle] : this.props.buttonStyle}>
          {this.state.fontLoaded &&
            <Text style={this.props.textStyle}>
              {this.props.title}
            </Text>
          }
        </View>
      </Touchable>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  handlePress: PropTypes.func
};
