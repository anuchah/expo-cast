import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebase';
import { Button } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ route, navigation }) {

    const phoneNumber = route.params.phoneNumber

    const signOutHandle = () => {
        try {
            getAuth().signOut()
            navigation.navigate("Home")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.header}>ข้อมูลผู้ใช้</Text>
            <Text style={styles.title}>
                <Icon name='phone' size={48} color="black" /> : {phoneNumber}
            </Text>

            <TouchableOpacity style={styles.logoutButton} onPress={signOutHandle}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        position: 'absolute',
        top: 300
    },
    logoutButton: {
        backgroundColor: '#841584',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        position: 'absolute',
        top: 700
    },
    logoutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    header: {
        textAlign: 'center',
        fontSize: 48,
        position: 'absolute',
        top: 90,
        fontWeight: 'bold',
        color: '#FF0099',
    }
});
