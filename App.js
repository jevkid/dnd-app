<script src="http://localhost:8097"></script>
import React, { Component } from 'react';
import { Font, LinearGradient } from 'expo';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Button from './components/Button';
import RollDice from './Dice/RollDice';
import Explore from './Explore/Explore';
import ExploreCard from './Explore/ExploreCard';
import Randomise from './Randomise/Randomise';
import Test from './Test/Test';

type Props = {};

class HomeScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'Kosugi-Regular': require('./assets/fonts/Kosugi-Regular.ttf')
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.fontLoaded &&
          <Text style={{fontSize: 52, color: 'white', fontFamily: 'Kosugi-Regular'}}>Start your adventure</Text>
        }
        <View style={{flexDirection: 'row', maxWidth: 340, flexWrap: 'wrap'}}>
          <Button title="explore" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']} id="explore" disabled={false} handlePress={() => navigate('Explore')}/>
          <Button title="roll die" id="roll" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']}  disabled={false} handlePress={() => navigate('RollDice')}/>
          <Button title="randomise" id="random" buttonStyle={styles.button} disabledStyle={styles.disabled} textStyle={styles.text} gradient={true} colors={['#523E7B', '#464B8A', '#365a84']}  disabled={false} handlePress={() => navigate('Randomise')}/>
          {/* <Button title="Test" id="test" disabled={false} handlePress={() => navigate('Test')}/> */} 
        </View>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  RollDice: {
    screen: RollDice
  },
  Explore: {
    screen: Explore
  },
  ExploreCard: {
    screen: ExploreCard
  },
  Randomise: {
    screen: Randomise
  },
  Test: {
    screen: Test
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#200F44',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 0,
    marginVertical: 25,
    marginRight: 5,
    borderRadius: 2
  },
  disabled: {
    backgroundColor: '#845353',
    borderColor: '#845353'
  },
  text: {
    color: 'white',
    fontFamily: 'Kosugi-Regular'
  }
});
//home screen with dnd imgage and overlay background on top with white text