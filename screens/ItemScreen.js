import { StyleSheet, Text, View, SafeAreaView, Image , TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { Audio } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from "@react-native-material/core";
export default function ItemScreen({ route, navigation: { goBack } }) {

  const item = route.params.item
  const [sound, setSound] = React.useState();


  return (
    <View style={styles.eventview}>
      <Text style={styles.text}>ตลกอีหยัง</Text>
      <SafeAreaView style={styles.eventview}>
        {/* <Text style={styles.eventName}>{item.title}</Text> */}
        <View style={{ flex: 2, backgroundColor: '#343434', borderRadius: 25, marginTop: 20, marginBottom: 25 }}>
          <ScrollView>
            <Text style={styles.eventDetail}>{item.content}</Text>
          </ScrollView>
        </View>
        <View style={{ flex: 1, marginTop: 50 }}>
          <TouchableOpacity style={styles.logoutButton} onPress={()=>goBack()}>
            <Text style={styles.logoutText}>เรื่องตลก</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 30,
    borderRadius: 20

  },

  eventview: {
    padding: 20,
    backgroundColor: '#F7D5FF',
    height: '100%',
  },
  eventImage: {
    width: "100%", height: 200, margin: 10,
    borderRadius: 10,
  },
  eventName: {
    color: "#00A",
    fontSize: 16,
  },
  eventAddress: {
    color: "#55A",
    fontSize: 11,
  }
  ,
  eventDate: {
    fontSize: 11,
    color: "#000",
  },
  inNer: {

  },
  eventDetail: {
    color: "#fff",
    padding: 20,
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 1.25,
  },
  text: {
    fontSize: 40,
    marginTop: 40,
    fontWeight: 'bold',
    color: '#FF0099',
    fontStyle: 'normal',
    fontVariant: ['small-caps'],
    textAlign: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 100,
    width: '50%',
    height: '25%',
    marginStart: 90,
  }, logoutButton: {
    backgroundColor: '#343434',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 40,
    width: 150,
    height: 60,
    marginStart: 115,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    padding: 7
  },
});
