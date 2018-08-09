import React, { Component } from 'react';
import { Font } from 'expo';
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
        'LibreBaskerville-Regular': require('../assets/fonts/LibreBaskerville-Regular.otf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <Touchable
        testID={this.props.id}
        disabled={this.props.disabled}
        onPress={this.props.handlePress}>
        <View style={this.props.disabled ? [styles.button, styles.disabled] : styles.button}>
          {this.state.fontLoaded &&
            <Text style={styles.text}>
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#962424',
    padding: 10,
    margin: 10,
    borderRadius: 4,
    borderColor: '#962424',
    borderWidth: 1
  },
  disabled: {
    backgroundColor: '#845353',
    borderColor: '#845353'
  },
  text: {
    color: 'white',
    fontFamily: 'LibreBaskerville-Regular'
  }
});