import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, Linking, View, TouchableNativeFeedback, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';

import LinkButton from '../components/LinkButton';
import ClassCard from './ClassCard';
import RaceCard from './RaceCard';

import classes from '../components/classes';

class ExploreCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fontLoaded: false,
      image: ''
    }
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'FrancoisOne-Regular': require('../assets/fonts/FrancoisOne-Regular.ttf'),
        'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
    this.fetchResultData();
  }

  fetchResultData(val){
    let props = this.props.navigation.state.params
    let url = val ? val : props.value;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({result: data, isLoading: false});
        console.log(data);
      });
  }

  fetchAddition(url){
    this.setState({additionalLoading: true});
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({additional: data, additionalLoading: false});
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    let props = this.props.navigation.state.params;
    let data = this.state.result;
    // let imageUrl;
    const font = Platform.OS === 'android' ? 'notoserif' : 'Avenir';
    const fontFam = this.state.fontLoaded ? 'FrancoisOne-Regular' : font;
    // if(!this.state.isLoading && props && data){
    //   imageUrl = classes[data.name];
    // }
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          {this.state.fontLoaded &&
            <Text style={{fontSize: 52, color: '#263238', fontFamily: 'FrancoisOne-Regular', textAlign: 'center'}}>Loading...</Text>
          }
        </View>
      )
    }
    return (
        <View style={styles.container}>
          <ScrollView>
            {/* <Image
              style={{height: 200, width: 'auto', flex: 1, alignSelf: 'stretch'}}
              source={imageUrl}
              resizeMode='contain'
            /> */}
            <Text style={[styles.headerText, {fontFamily: fontFam, marginTop: 10}]}>{data.name}</Text>
            {props.type === 'classes' &&
              <ClassCard data={data} navigate={this.props.navigation} />
            }
            {props.type === 'races' &&
              <RaceCard data={data} navigate={this.props.navigation} />
            }
          </ScrollView>
        </View>
    );
  }
}

ExploreCard.propTypes = {
  selectedType: PropTypes.string,
  data: PropTypes.object,
  closeModal: PropTypes.func
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#fffaef',
    width: '95%',
    minHeight: 500,
    maxHeight: 'auto',
    borderRadius: 4
  },
  container: {
    backgroundColor: '#464B8A',
    borderRadius: 4,
    padding: 10,
    height: '100%',
    overflow: 'scroll'
  },
  dropdown: {
    width: '90%',
    backgroundColor: 'transparent'    
  },  
  headerText: {
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center'
  },
  subheaderText: {
    fontSize: 24,
    color: '#ffffff',
  },
  paragraph: {
    fontSize: 18,
    color: '#ffffff',
  },
  list: {
    fontSize: 16,
    margin: 10,
    color: '#ffffff',
    display: 'flex',
    textDecorationLine: 'underline'
  }

});

export default ExploreCard;