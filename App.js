import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';

let API_KEY = "1d55ff2f438304c43486d5eba9e29692"
let city = "Ottawa"



//To parse APi weather codes into more general classes
let WEATHER_CODES = {
  2:"Thunder",
  3:"Rain",
  5:"Rain",
  6:"Snow",
  7:"Foggy",
  8:"Clear"
}


class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      weather: "Fetching Weather",
      message: "hello",
      long: 0,
      lat: 0,
      };
  }

  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(location)
        let info = JSON.parse(location)
        this.setState({long:info["coords"]["longitude"], lat:info["coords"]["latitude"]})
        console.log(info["coords"]["latitude"])
        console.log(info["coords"]["longitude"])
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat +"&lon=" + this.state.long+"&appid=" + API_KEY
    fetch(url)
    .then(res => res.json())
    .then(json => this.setState({ weather: parseInt(json.weather[0].id.toString().charAt(0))}))
    .catch(err => console.log(err));
  }



  getWeather(){
    console.log(this.state.long)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.temperature}>{WEATHER_CODES[this.state.weather]}</Text>
        <Text style = {styles.temperature}>{this.state.loc}</Text>
        <Button onPress={() => this.getWeather()} title="fuck"></Button>
      
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