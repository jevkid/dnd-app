import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, FlatList, ScrollView, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import ChoicesList from '../components/ChoicesList';

/* Params
// ability_bonuses - [int]
// age - string description
// alignment - string description
// index - int
// language_desc - string description
// languages - [{url: string, name: string}]
// name - string
// size - string
// size_description - string description
// speed - int
// starting_proficiences - [{url: string, name: string}]
// subraces = [{name: string, url: string}] 
// traits = [{url: string, name: string}]
*/

export default class RaceCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      showDetails: false,
      showSubrace: false,
      showAlignment: false,
      showSpeed: false,
      showLanguage: false,
      showSize: false,
      showProficiences: false,
      showTraits: false,
      showBonuses: false
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

  convertToObj(bonuses){
    const list = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
    let abilityBonuses = [];
    bonuses.map((bonus, index) => {
      abilityBonuses.push({
        name: `${list[index]} +${bonus}`
      });
    });
  
    return abilityBonuses;
  }
  render() {
    const data = this.props.data;
    let bonuses = this.convertToObj(data.ability_bonuses);
    const state = this.state;
    const { navigate } = this.props.navigate;    
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const fontFam = this.props.font ? this.props.font : 'FrancoisOne-Regular';
    return (
      <View>
        <View>
          <Touchable
            onPress={() => { this.toggleState('showDetails', state.showDetails); }}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome name={state.showDetails ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
              <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Details</Text>
            </View>
          </Touchable>
          {state.showDetails &&
            <View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={[styles.paragraphBold]}>Speed:</Text>
                <Text style={[styles.paragraph]}>{data.speed}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.paragraphBold}>Size:</Text>
                <Text style={[styles.paragraph]}>{data.size}</Text>
              </View>
              <Text style={[styles.paragraph]}>{data.size_description}</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                <Text style={styles.paragraphBold}>Age:</Text>
                <Text style={[styles.paragraph]}>{data.age}</Text>
              </View>
              <Text style={[styles.paragraph]}>{data.age_description}</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                <Text style={styles.paragraphBold}>Alignment:</Text>
                <Text style={[styles.paragraph]}>{data.alignment}</Text>
              </View>
            </View>
          }
        </View>
        {data.subraces &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showSubrace', state.showSubrace); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showSubrace ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Subraces</Text>
              </View>
            </Touchable>
            {state.showSubrace &&
              <ChoicesList type='subraces' data={data.subraces} navigate={navigate} />
            }
          </View>
        }
        {data.starting_proficiencies &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showProficiencies', state.showProficiencies); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showProficiencies ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Starting proficiences</Text>
              </View>
            </Touchable>
            {state.showProficiencies &&
              <ChoicesList type='starting-proficiencies' data={data.starting_proficiencies} navigate={navigate} />
            }
          </View>
        }
        {data.traits &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showTraits', state.showTraits); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showTraits ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Traits</Text>
              </View>
            </Touchable>
            {state.showTraits &&
              <ChoicesList type='traits' data={data.traits} navigate={navigate} />
            }
          </View>
        }       
        {data.languages &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showLanguage', state.showLanguage); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showLanguage ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Languages</Text>
              </View>
            </Touchable>
            {state.showLanguage &&
              <View>
                <ChoicesList type='languages' data={data.languages} navigate={navigate} />
                <Text style={[styles.paragraph, { marginTop: 10}]}>{data.language_desc}</Text>
              </View>
            }
          </View>
        }
        {data.saving_throws &&
          <ChoicesList type='saving-throws' header='Saving throws' data={data.saving_throws} navigate={navigate} />              
        }
        {data.proficiencies &&
          <ChoicesList type='proficiency' header='Proficiencies' data={data.proficiencies} navigate={navigate} />              
        }
        {data.ability_bonuses &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showBonuses', state.showBonuses); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showBonuses ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Ability bonuses</Text>
              </View>
            </Touchable>
            {state.showBonuses &&
              <FlatList
                data={bonuses}
                renderItem={({item}) => 
                  <Text
                    key={item.name}
                    style={styles.list}                    
                  >
                    {item.name}
                  </Text>
                }
              />
            }
          </View>
        }
      </View>
    );
  }
}

RaceCard.propTypes = {
  data: PropTypes.object
};

const styles = StyleSheet.create({ 
  subheaderText: {
    fontSize: 24,
    color: '#ffffff',
  },
  paragraphBold: {
    fontSize: 18,
    marginRight: 5,
    color: '#ffffff',
    fontFamily: 'Montserrat-Medium'
  },
  paragraph: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '300',
    fontFamily: 'Montserrat-Light'
  },
  list: {
    fontSize: 16,
    color: '#ffffff',
    display: 'flex',
    fontFamily: 'Montserrat-Light'    
  }

});