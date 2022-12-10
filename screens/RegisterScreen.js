import React, { useLayoutEffect, useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image, Text } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back To Login"
        })
    }, [navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password).then(authUser => {
            updateProfile(authUser.user, {
                displayName: name,
                photoURL: imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZjARMWYr_cyQpmUbWumverqLccq0EwD6dLrM3Ek8BPA&s'
            }).then({
            })
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior={Platform.OS == "ios" ? "padding" : "null"} enabled={true} className="flex-1 items-center justify-center p-[10] bg-white">
            <StatusBar style="light" />
            {/* <Image source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4423/4423638.png'
            }}
                style={{ width: 200, height: 200 }} /> */}
            <Text h3 style={{
                marginBottom: 50
            }}>
                Create a Signal account
            </Text>
            <View className="w-[300]">
                <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={text => setName(text)} />
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={text => setEmail(text)} />
                <Input placeholder="Password" autoFocus type="password" secureTextEntry value={password} onChangeText={text => setPassword(text)} />
                <Input placeholder="Profile Image Url (optional)" autoFocus type="text" value={imageUrl} onChangeText={text => setImageUrl(text)} onSubmitting={register} />
            </View>
            <Button containerStyle={{
                width: 200,
                marginTop: 10,
            }} title="Register" onPress={register} raised />
            <View className="h-[100]" />
        </KeyboardAvoidingView>
    );
}

export default RegisterScreen;