import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Text, View, FlatList, ScrollView } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import ChoicesList from '../components/ChoicesList';

/* Params
// category_range - string
// cost - {quantity: int, unit: string}
// weight - int
// equipment_categoey - string

/// Weapons
// damage - {dice_count: int, dice_value: int, damage_type: { url: string, name: string }}
// properties - [{url: string, name: string}]
// range - {normal: int, long: int}
// weapon category - string
// weapon_range - string

/// Armor
// stealth_disadvantage: bool
// str_minimum: int
// armor_category: string
// armor_class: {base: int, dex_bonus: bool, max_bonus: int}
// 
*/

export default class EquipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      showDetails: true
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
              {data.equipment_category &&
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Equipment category:</Text>
                  <Text style={[styles.paragraph]}>{data.equipment_category}</Text>
                </View>
              }
              {data.armor_category &&
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Armor category:</Text>
                  <Text style={[styles.paragraph]}>{data.armor_category}</Text>
                </View>
              }              
              {data.weapon_category &&
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Weapon category:</Text>
                  <Text style={[styles.paragraph]}>{data.weapon_category}</Text>
                </View>
              }
              {data.weapon_range &&
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Weapon range:</Text>
                  <Text style={[styles.paragraph]}>{data.weapon_range}</Text>
                </View>
              }
              {data.cost &&
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Cost:</Text>
                  <Text style={[styles.paragraph]}>{data.cost.quantity}{data.cost.unit}</Text>
                </View>
              }
              {data.weight &&
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Weight:</Text>
                  <Text style={[styles.paragraph]}>{data.weight}</Text>
                </View>
              }
            </View>
          }
        </View>
        {data.armor_class &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showArmorClass', state.showArmorClass); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showArmorClass ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Armor class</Text>
              </View>
            </Touchable>
            {state.showArmorClass &&
              <View>
                {data.armor_class && data.armor_class.base &&
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={styles.paragraphBold}>Base:</Text>
                    <Text style={[styles.paragraph]}>{data.armor_class.base}</Text>
                  </View>
                }
                {data.armor_class && data.armor_class.dex_bonus &&
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={styles.paragraphBold}>Dex bonus</Text>
                  </View>
                }
                {data.armor_class && data.armor_class.max_bonus &&
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={styles.paragraphBold}>Max bonus:</Text>
                    <Text style={[styles.paragraph]}>{data.armor_class.max_bonus}</Text>
                  </View>
                }
              </View>
            }
          </View>
        }
        {data.properties &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showProperties', state.showProperties); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showProperties ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Properties</Text>
              </View>
            </Touchable>
            {state.showProperties &&
              <View>
                <ChoicesList type='subraces' data={data.subraces} navigate={navigate} />
                {data.range && data.range.normal &&
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={styles.paragraphBold}>Normal range:</Text>
                    <Text style={[styles.paragraph]}>{data.range.normal}</Text>
                  </View>
                }
                {data.range && data.range.long &&
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={styles.paragraphBold}>Long range:</Text>
                    <Text style={[styles.paragraph]}>{data.range.long}</Text>
                  </View>
                }
                {data.throw_range && data.throw_range.normal &&
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={styles.paragraphBold}>Normal throw range:</Text>
                    <Text style={[styles.paragraph]}>{data.throw_range.normal}</Text>
                  </View>
                }
                {data.throw_range && data.throw_range.long &&
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={styles.paragraphBold}>Long throw range:</Text>
                    <Text style={[styles.paragraph]}>{data.throw_range.long}</Text>
                  </View>
                }
              </View>
            }
          </View>
        }
        {data.damage &&
          <View>
            <Touchable
              onPress={() => { this.toggleState('showDamage', state.showDamage); }}
            >
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name={state.showDamage ? 'caret-down' : 'caret-right'} size={25} style={{ color: 'white', marginRight: 5, marginTop: 5 }} />
                <Text style={[styles.subheaderText, {fontFamily: fontFam}]}>Damage</Text>
              </View>
            </Touchable>
            {state.showDamage &&
              <View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Damage type:</Text>
                  <Text style={[styles.paragraph]}>{data.damage.damage_type.name}</Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Dice count:</Text>
                  <Text style={[styles.paragraph]}>{data.damage.dice_count}</Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                  <Text style={styles.paragraphBold}>Dice value:</Text>
                  <Text style={[styles.paragraph]}>{data.damage.dice_value}</Text>
                </View>
              </View>
            }
          </View>
        }
      </View>
    );
  }
}

EquipCard.propTypes = {
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