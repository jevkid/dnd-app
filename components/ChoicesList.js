import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';

export default class ChoicesList extends React.Component {
  render() {
    const { navigate } = this.props.navigate;    
    const fontFam = this.props.font ? this.props.font : 'FrancoisOne-Regular';
    return (
      <View>
        <Text style={[styles.subheaderText, {fontFamily: fontFam, marginTop: 10}]}>{this.props.header}</Text>
        <FlatList
          data={this.props.data}
          renderItem={({item}) => 
            <Text
              key={item.name}
              style={styles.list}
              onPress={() => 
                navigate('ExploreCard', { 
                  type: this.props.type,
                  value: item.url
                })
              }
            >
              {item.name}
            </Text>
          }
        />
      </View>
    );
  }
}

ChoicesList.propTypes = {
  data: PropTypes.array
};

const styles = StyleSheet.create({ 
  subheaderText: {
    fontSize: 24,
    color: '#ffffff',
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