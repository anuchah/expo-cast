import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from "@react-native-material/core";

export default function HomeScreen({navigation}) {

    const goLogin = () => {
        navigation.navigate("Main")
    }

    
  return (
    <View style={styles.container}>
      <Button onPress={() => goLogin()} title="LOGIN WITH TELEPHONE" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    button: {
        marginTop: 2
    }
  });
  