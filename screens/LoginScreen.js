import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password).then().catch(error => alert(error.message))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        })

        return unsubscribe;
    }, [])


    return (
        <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior={Platform.OS == "ios" ? "padding" : "null"} enabled={true} className="flex-1 items-center justify-center p-[10] bg-white">
            <StatusBar style="light" />
            <Image source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4423/4423638.png'
            }}
                style={{ width: 200, height: 200 }} />
            <View className="w-[300] mt-[50]">
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={text => setEmail(text)} />
                <Input placeholder="Password" autoFocus type="password" secureTextEntry value={password} onChangeText={text => setPassword(text)} onSubmitEditing={signIn} />
            </View>
            <Button containerStyle={{
                width: 200,
                marginTop: 10,
            }} title="Login" onPress={signIn} />
            <Button containerStyle={{
                width: 200,
                marginTop: 10,
            }} title="Register" type='outline' onPress={() => navigation.push("Register")} />
            <View className="h-[120]" />
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;