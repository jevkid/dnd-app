import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import Button from './Button';

export default class SelectedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    }
  }
  async componentDidMount() {
    try {
      await Font.loadAsync({
        'LibreBaskerville-Regular': require('../assets/fonts/LibreBaskerville-Regular.otf'),
        'DnDC': require('../assets/fonts/DnDC.ttf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    let data = this.props.data;
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const font = this.state.fontLoaded ? 'LibreBaskerville-Regular' : '';
    return (
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={[styles.headerText, {fontFamily: font}]}>{data.name} 1</Text>
          <Text style={[styles.paragraph, {fontFamily: font}]}>{data.equipment_category}</Text>
        </View>
        <TouchableOpacity onPress={this.props.closeModal}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SelectedModal.propTypes = {
  selectedType: PropTypes.string,
  data: PropTypes.object,
  closeModal: PropTypes.func
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#fffaef',
    width: 300,
    minHeight: 500,
    maxHeight: 'auto',
    borderRadius: 4
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffaef',
    borderRadius: 4
  },
  dropdown: {
    width: '90%',
    backgroundColor: 'transparent'    
  },  
  headerText: {
    fontSize: 48,
    color: '#263238',
    textAlign: 'center'
  },
  paragraph: {
    fontSize: 24,
    color: '#263238',
    textAlign: 'left'
  }

});