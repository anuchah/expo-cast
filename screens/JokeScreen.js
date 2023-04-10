import { View, FlatList, StyleSheet, Text, Button, ActivityIndicator, TouchableOpacity, Image } from "react-native"
import React from 'react'
import { Audio } from 'expo-av';


export default function JokeScreens({ route, navigation }) {

    const joke = route.params.joke

    return (
        <View style={{ marginTop: 50, backgroundColor: '#F7D5FF', height: '100%'}}>
            <Text style={styles.textHead}>ตลกอีหยัง</Text>
            <FlatList
                data={joke}
                renderItem={({ item }) =>
                    <Box
                        item={item}
                        navigation={navigation.navigate}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
               
            />
        </View>
    )
}

function Box({ item, navigation }) {
    var item = item;


    const handleSend = () => {
        navigation("Item", params = { item: item })
    }

    return (
        
            <TouchableOpacity
                onPress={() => handleSend()}
                style={styles.eventBox} >
                <Image style={styles.eventImage} source={require('../assets/dino2.png')}
                />
                <View>
                    <Text style={styles.eventText}>{item.title}</Text>
                </View>
            </TouchableOpacity>
      
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F7D5FF"
    },
    eventBox: {
        flexDirection: "row",
        marginTop: 10,
    },
    eventImage: {
        width: 100,
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        marginTop: 20
    },
    eventText: {
        color: "#000",
        marginTop: 20
    },
    eventAddress: {
        color: "#55A",
        fontSize: 11,
    }
    ,
    eventDate: {
        fontSize: 11,
    },
    textHead: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FF0099',
        fontStyle: 'normal',
        fontVariant: ['small-caps'],
        marginTop: 20
    }
});


