import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Text, View, FlatList, ScrollView } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import ChoicesList from '../components/ChoicesList';

/* Params
// class_levels - { url: string, class: string}
// hit_die - int
// proficiences - [{url: string, name: string}]
// proficiency_choices - [{choose: int, from: [{name: string, url: string}], type: string}]
// saving_throws = [{url: string, name: string}]
// spellcasting - - { url: string, class: string}
// starting_equipment = {url: string, class: string}
// subclasses = [{name: string, url: string}] 
*/

export default class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      showHitDie: false,
      showSubclass: false,
      showSavingThrows: false,
      showProficiences: false,
      showProficiencyChoices: false
    }
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  toggleState(val, bool){
    const state = this.state[val];
    this.setState({ [val]: !bool });
  }

  render() {
    const data = this.props.data;
    const { navigate } = this.props.navigate;
    const state = this.state;
    const fontFam = this.props.font ? this.props.font : 'FrancoisOne-Regular';
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <View>
        {data.subclasses &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showSubclass', state.showSubclass); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showSubclass ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Subclasses</Text>
              </View>
            </Touchable>
            {state.showSubclass &&
              <ChoicesList type='subclasses' data={data.subclasses} navigate={navigate} />
            }
          </View>
        }
        {data.hit_die &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showHitDie', state.showHitDie); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showHitDie ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Hit dice</Text>
              </View>
            </Touchable>
            {state.showHitDie &&
              <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                <Text style={styles.paragraphBold}>Hit die:</Text>
                <Text style={[styles.paragraph]}>{data.hit_die}</Text>
              </View>
            }
          </View>
        }
        {data.saving_throws &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showSavingThrows', state.showSavingThrows); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showSavingThrows ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Saving throws</Text>
              </View>
            </Touchable>
            {state.showSavingThrows &&
              <ChoicesList type='saving-throws' data={data.saving_throws} navigate={navigate} />              
            }
          </View>
        }
        {data.proficiencies &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showProficiences', state.showProficiences); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showProficiences ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Proficiencies</Text>
              </View>
            </Touchable>
            {state.showProficiences &&
              <ChoicesList type='proficiency' data={data.proficiencies} navigate={navigate} />                            
            }
          </View>
        }
        {data.proficiency_choices &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showProficiencyChoices', state.showProficiencyChoices); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showProficiencyChoices ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Proficiency choices</Text>
              </View>
            </Touchable>
            {state.showProficiencyChoices &&
              <View>
                {data.proficiency_choices.map((option, index) => {
                  return (
                    <View key={index}>
                      <Text style={styles.paragraphBold}>Choose {option.choose}</Text>
                      <ChoicesList type='proficiency-choice' data={option.from} navigate={navigate}/>
                    </View>
                  );
                })}
              </View>
            }
          </View>          
        }
      </View>
    );
  }
}

ClassCard.propTypes = {
  data: PropTypes.object
};

const styles = StyleSheet.create({ 
  subheaderText: {
    fontSize: 24,
    color: '#ffffff',
  },
  paragraph: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Montserrat-Light'
  },
  paragraphBold: {
    fontSize: 18,
    marginRight: 5,
    color: '#ffffff',
    fontFamily: 'Montserrat-Medium'
  },
  list: {
    fontSize: 16,
    margin: 10,
    color: '#ffffff',
    display: 'flex',
    fontFamily: 'Montserrat-Light',
    textDecorationLine: 'underline'
  }

});