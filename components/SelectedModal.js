import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity, FlatList, ScrollView } from 'react-native';

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
    const font = Platform.OS === 'android' ? 'notoserif' : 'Avenir';
    const fontFam = this.state.fontLoaded ? 'LibreBaskerville-Regular' : font;
    return (
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={[styles.headerText, {fontFamily: fontFam, marginTop: 10}]}>{data.name}</Text>
            {data.equipment_category && this.state.fontLoaded &&
              <Text style={[styles.paragraph, {fontFamily: fontFam, marginTop: 10}]}>{data.equipment_category}</Text>
            }
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
    fontSize: 36,
    color: '#263238',
    textAlign: 'center'
  },
  subheaderText: {
    fontSize: 28,
    color: '#263238',
  },
  paragraph: {
    fontSize: 24,
    color: '#263238',
  },
  list: {
    fontSize: 18,
    margin: 10,
    color: '#263238',
  }

});