import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';

import LinkButton from '../components/LinkButton';
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
        'LibreBaskerville-Regular': require('../assets/fonts/LibreBaskerville-Regular.otf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
    this.fetchResultData();
  }

  fetchResultData(){
    let props = this.props.navigation.state.params
    let url = props.value;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({result: data, isLoading: false});
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
    let props = this.props.navigation.state.params;
    let data = this.state.result;
    let imageUrl;
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const font = Platform.OS === 'android' ? 'notoserif' : 'Avenir';
    const fontFam = this.state.fontLoaded ? 'LibreBaskerville-Regular' : font;
    console.log(data);
    if(!this.state.isLoading && props && data){
      imageUrl = classes[data.name];
    }
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          {this.state.fontLoaded &&
            <Text style={{fontSize: 52, color: '#263238', fontFamily: 'DnDC', textAlign: 'center'}}>Loading...</Text>
          }
        </View>
      )
    }
    return (
        <View style={styles.container}>
          <ScrollView>
            <Image
              style={{height: 200, width: 'auto', flex: 1, alignSelf: 'stretch'}}
              source={imageUrl}
              resizeMode='contain'
            />
            <Text style={[styles.headerText, {fontFamily: fontFam, marginTop: 10}]}>{data.name}</Text>
            {data.equipment_category && this.state.fontLoaded &&
              <Text style={[styles.paragraph, {fontFamily: fontFam, marginTop: 10}]}>{data.equipment_category}</Text>
            }
            {/* {data.subclasses && data.subclasses.length &&
              <View>
                {data.subclasses.map((subclass) => {
                  <LinkButton onPress={() => { this.fetchAddition(subclass.url);}} title={`View ${subclass.name}`} />
                })}
              </View>
            } */}
            {data.hit_die && this.state.fontLoaded &&
              <Text style={[styles.paragraph, {fontFamily: fontFam, marginTop: 10}]}>Hit die: {data.hit_die}</Text>
            }
            {data.proficiencies && this.state.fontLoaded &&
              <View>
                <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>Proficiencies</Text>
                <FlatList
                  data={data.proficiencies}
                  renderItem={({item}) => <Text key={item.name} style={styles.list}>&#9672;  {item.name}</Text>}
                />
              </View>
            }
            {data.proficiency_choices &&
              <View>
                {data.proficiency_choices.map((option, index) => {
                  return (
                    <View key={index}>
                      <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>Proficiency choices (Choose {option.choose})</Text>
                      <FlatList
                        data={option.from}
                        key={option.from}
                        renderItem={({item}) => <Text key={item.name} style={styles.list}>&#9672;  {item.name}</Text>}
                      />
                    </View>
                  );
                })}
              </View>
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
    // position: 'absolute',
    backgroundColor: '#fffaef',
    width: '95%',
    minHeight: 500,
    maxHeight: 'auto',
    borderRadius: 4
  },
  container: {
    backgroundColor: '#fffaef',
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
    color: '#263238',
    textAlign: 'center'
  },
  subheaderText: {
    fontSize: 24,
    color: '#263238',
  },
  paragraph: {
    fontSize: 18,
    color: '#263238',
  },
  list: {
    fontSize: 16,
    margin: 10,
    color: '#263238',
  }

});

export default ExploreCard;