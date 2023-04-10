// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import styles from './style';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

export default function Login() {
    const app = getApp()
    const auth = getAuth()
    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState()
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = useState();
    const attemptInvisibleVerification = false;
    const [showModal, setShowModal] = React.useState(false);
    
    const handleLogin = async() => {
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            // showMessage({
            //     text: 'Verification code has been sent to your phone.',
            // });
            // setShowModal(true)
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
        setShowModal(true); // show verification code popup
      };

      const handleVerifyCode = async() => {
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            await signInWithCredential(auth, credential);
            showMessage({ text: 'Phone authentication successful 👍' });
            navigation.navigate('Main')
            // setShowModal(false); // close verification code popup
            // navigation.navigate('Joke')
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
        setShowModal(false); // close verification code popup
      };

    return (
        <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
             <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
            />
            <View style={{ marginTop: 50 }}>
                <Text style={styles.title}>Login with Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tel +66"
                    autoFocus
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                />
                <TouchableOpacity style={styles.button} disabled={!phoneNumber}>
                    <Text style={styles.buttonText} onPress={handleLogin}>Send verification code</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showModal} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Verification Code</Text>
                        <TextInput
                            style={styles.modalInput}
                            // onChangeText={setVerificationCode}
                            // value={verificationCode}
                            keyboardType="number-pad"
                            placeholder="123456"
                            editable={!!verificationId}
                            onChangeText={setVerificationCode}
                            placeholderTextColor="#A6A6A6"
                        />
                        <TouchableOpacity style={styles.modalButton} 
                        onPress={() => setShowModal(false)}
                        >
                            <Text >Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} 
                        onPress={handleVerifyCode}
                        >
                            <Text >Verify</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback> */}
                </View>
            </Modal>
        </View>
    )
}

