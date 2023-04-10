import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function HomeScreen({ navigation }) {

  const goLogin = () => {
    navigation.navigate("Login")
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>ตลกอีหยัง</Text>
      <Image source={require('../assets/logoHaha.png')} style={styles.image} />
      <View style={styles.inbox}>
        <Text style={styles.textLogin}>Login</Text>
        <Button title="Telephone" onPress={() => goLogin()} style={styles.button} color="#F15ACB"  />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#F7D5FF"
  },
  image: {
    width: 350,
    height: 200,
    marginTop: 120,
    marginBottom: 50,
    
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '70%',
    height: '30%',
    marginStart: 35,
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 50,
    marginTop: 100,
    fontWeight: 'bold',
    color: '#FF0099',
    fontStyle: 'normal',
    fontVariant: ['small-caps']
  },
  inbox: {
    width: 250,
    height: 200,
    backgroundColor: "#FDA9FF",
    borderRadius: 15,
    position: 'absolute',
    top: 400,

  },
  textLogin: {
    textAlign: "center",
    marginTop: 25,
    marginBottom: 25,
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%'
  }
});