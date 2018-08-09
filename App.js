<script src="http://localhost:8097"></script>
import React, { Component } from 'react';
import { Font } from 'expo';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Button from './components/Button';
import RollDice from './Dice/RollDice';
import Explore from './Explore/Explore';
import Randomise from './Randomise/Randomise';

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
        'DnDC': require('./assets/fonts/DnDC.ttf')
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
          <Text style={{fontSize: 52, color: 'white', fontFamily: 'DnDC'}}>Start your adventure</Text>
        }
        <View style={{flexDirection: 'row', maxWidth: 340, flexWrap: 'wrap'}}>
          <Button title="Roll Die" id="roll" disabled={false} handlePress={() => navigate('RollDice')}/>
          <Button title="Explore" id="explore" disabled={false} handlePress={() => navigate('Explore')}/>
          <Button title="Randomise" id="random" disabled={false} handlePress={() => navigate('Randomise')}/>
          {/* <Button title="Build" id="build" disabled={false} handlePress={() => navigate('Build')}/> */}
        </View>
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
  Randomise: {
    screen: Randomise
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
    alignItems: 'center',
    backgroundColor: '#263238'
  }
});
