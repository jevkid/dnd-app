import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';

import ChoicesList from '../components/ChoicesList';

/* Params
// class_levels - { url: string, class: string}
// hit_die - int
// index - int
// name - string
// proficiences - [{url: string, name: string}]
// proficiency_choices - [{choose: int, from: [{name: string, url: string}], type: string}]
// saving_throws = [{url: string, name: string}]
// starting_equipment = {url: string, class: string}
// subclasses = [{name: string, url: string}] 
*/

export default class ClassCard extends React.Component {
  render() {
    const data = this.props.data;
    const { navigate } = this.props.navigate;    
    const fontFam = this.props.font ? this.props.font : 'FrancoisOne-Regular';
    return (
      <View>
        {/* {data.equipment_category
            <Text style={[styles.paragraph, {fontFamily: fontFam, marginTop: 10}]}>{data.equipment_category}</Text>
        } */}
        {data.subclasses &&
          <ChoicesList type='subclasses' header='Subclasses' data={data.subclasses} navigate={navigate} />
        }
        {data.hit_die &&
          <Text style={[styles.paragraph, {fontFamily: fontFam, marginTop: 10}]}>Hit die: {data.hit_die}</Text>
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
  list: {
    fontSize: 16,
    margin: 10,
    color: '#ffffff',
    display: 'flex',
    fontFamily: 'Montserrat-Light',
    textDecorationLine: 'underline'
  }

});