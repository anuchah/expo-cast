import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import JokeScreens from './screens/JokeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ItemScreen from './screens/ItemScreen';
import Login from './screens/Login';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name='Item' component={ItemScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: true, headerBackTitle: "Back", headerTransparent: '#F7D5FF', }}/>
        <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
