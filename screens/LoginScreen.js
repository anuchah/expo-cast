
import React, { useEffect, useState, useRef } from 'react'
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

export default function LoginScreen({ navigation }) {

    const app = getApp()
    const auth = getAuth()
    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState()
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = useState();
    const attemptInvisibleVerification = false;

    const onSendVerifyCode = async () => {
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
                text: 'กำลังส่งรหัสยืนยันไปที่โทรศัพท์คุณ 😛',
            });
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
    }

    const onConfirmVerifyCode = async () => {
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            await signInWithCredential(auth, credential);
            showMessage({ text: 'เข้าสู่ระบบเสร็จสมบูรณ์ 😜' });
            navigation.navigate('Main')
            // navigation.navigate('Joke')
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
    }

    return (
        <View style={{ padding: 20 , backgroundColor: "#F7D5FF", height: '100%'}}>

            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
            />
            <Text style={{ marginTop: 100, fontSize: 18, marginBottom: 5 }}>Login</Text>
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
                <Text style={styles.buttonText} onPress={() => onSendVerifyCode()}>Send verification code</Text>
            </TouchableOpacity>
            {/* <Button
                title="Send Verification Code"
                disabled={!phoneNumber}
                onPress={() => onSendVerifyCode()}
            /> */}
            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>ยืนยันรหัส</Text>
            <TextInput
                style={styles.input}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            <TouchableOpacity style={styles.button} disabled={!phoneNumber}>
                <Text style={styles.buttonText} onPress={() => onConfirmVerifyCode()}>Confirm Verification Code</Text>
            </TouchableOpacity>
            {/* <Button
                title="Confirm Verification Code"
                disabled={!verificationId}
                onPress={() => onConfirmVerifyCode()}
            /> */}
            {message ? (
                <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 0xffffffee, justifyContent: 'center' },
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <Text
                        style={{
                            color: message.color || 'blue',
                            fontSize: 17,
                            textAlign: 'center',
                            margin: 20,
                        }}>
                        {message.text}
                    </Text>
                </TouchableOpacity>
            ) : (
                undefined
            )}
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5C0B',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#F15ACB',
        paddingVertical: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
