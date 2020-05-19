import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';


let API_KEY = "1d55ff2f438304c43486d5eba9e29692"
let city = "Ottawa"
let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY 



class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      weather: "none",
      message: "hello"
    };
  }

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({ weather: json.weather[0].main}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.temperarure}>{this.state.weather}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperature:{
    fontSize:40
  }
});

export default App;