import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from "@react-native-material/core";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebase';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';


const Tab = createMaterialBottomTabNavigator();

try {
  firebase.initializeApp(firebaseConfig)
} catch (error) {
  console.log(error)
}

function DashBoard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let auth = getAuth();
    auth.onAuthStateChanged((us) => {
      setUser(us)
    })
    
  }, [])

  if (user == null) {
    return <LoginScreen />
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {user.phoneNumber}</Text>
    </View>
  )
}

function Welcome(){
  return <DashBoard />
}

function Joke() {
  return (
    <View style={styles.container}>
      <Text>Joke</Text>
    </View>
  )
}

function Profile({ navigation }) {

  const signOutHandle = () => {
    try {
      getAuth().signOut()
      navigation.navigate("Home")
    } catch (error) {
      // DO SHOMETHING
    }
  }

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button onPress={() => signOutHandle()} title="Logout" color='error' />
    </View>
  )
}

export default function MainScreen({ navigation }) {
  return (
    <>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        activeColor="#fff"

        barStyle={{ backgroundColor: '#262626' }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Welcome}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            )
          }}
          
        />
        <Tab.Screen
          name="Joke"
          component={Joke}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='album' color={color} size={26} />
            )
          }} />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account' color={color} size={26} />
            )
          }} />
      </Tab.Navigator>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
