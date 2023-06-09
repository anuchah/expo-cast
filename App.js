import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={HomeScreen} /> 
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: true, headerBackTitle: "Back"}}/>
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
