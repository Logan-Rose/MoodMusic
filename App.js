import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';

let API_KEY = "1d55ff2f438304c43486d5eba9e29692"
let city = "Ottawa"
let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY 


navigator.geolocation.getCurrentPosition(
  position => {
    const location = JSON.stringify(position);
    console.log(location)
    let info = JSON.parse(location)
    console.log(info["coords"]["latitude"])
    console.log(info["coords"]["longitude"])
  },
  error => Alert.alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      weather: "none",
      message: "hello",
      loc: "here",
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
        <Text style = {styles.temperarure}>{this.state.loc}</Text>
        <Button onPress={this.getLocation} title="fuck"></Button>
      
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