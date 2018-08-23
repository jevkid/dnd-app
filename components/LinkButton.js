import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

export default class LinkButton extends React.Component {
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
        onPress={this.props.handlePress}
      >
        <Text style={styles.text}>
          {this.props.title}
        </Text>
      </Touchable>
    );
  }
}

LinkButton.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  handlePress: PropTypes.func
};

const styles = StyleSheet.create({
  text: {
    color: '#263238',
    fontSize: 18,
    fontFamily: 'LibreBaskerville-Regular'
  }
});