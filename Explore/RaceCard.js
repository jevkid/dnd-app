import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';

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
      fontLoaded: false
    }
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const data = this.props.data;
    const { navigate } = this.props.navigate;    
    const fontFam = this.props.font ? this.props.font : 'FrancoisOne-Regular';
    return (
      <View>
        {data.age &&
          <View>
            <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>Age</Text>
            <Text style={[styles.paragraph, {marginTop: 10}]}>{data.age}</Text>
          </View>
        }
        {data.subraces &&
          <View>
            <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>Subraces</Text>
            <ChoicesList type='subraces' data={data.subraces} navigate={navigate} />
          </View>
        }
        {data.alignment &&
          <View>
            <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>Alignment</Text>
            <Text style={[styles.paragraph, {marginTop: 10}]}>{data.alignment}</Text>
          </View>
        }
        {data.speed &&
          <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>Speed: {data.speed}</Text>
        }
        {data.languages &&
          <View>
            <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>Languages</Text>
            <ChoicesList type='languages' data={data.languages} navigate={navigate} />              
            <Text style={[styles.paragraph, { marginTop: 10}]}>{data.language_desc}</Text>
          </View>
        }
        {data.size &&
          <View>
            <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>Size</Text>
            <Text style={[styles.paragraph, {marginTop: 10}]}>{data.size}</Text>
            <Text style={[styles.paragraph, {marginTop: 10}]}>{data.size_description}</Text>
          </View>
        }
        {data.saving_throws &&
          <ChoicesList type='saving-throws' header='Saving throws' data={data.saving_throws} navigate={navigate} />              
        }
        {data.proficiencies &&
          <ChoicesList type='proficiency' header='Proficiencies' data={data.proficiencies} navigate={navigate} />              
        }
        {data.proficiency_choices &&
          <View>
            {data.proficiency_choices.map((option, index) => {
              return (
                <ChoicesList key={index} type='proficiency-choice' header={`Proficiency choices (Choose ${option.choose})`} data={option.from} navigate={navigate}/>
              );
            })}
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
  paragraph: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '300',
    fontFamily: 'Montserrat-Light'
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