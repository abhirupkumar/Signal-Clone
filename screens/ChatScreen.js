import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Avatar } from '@rneui/base';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Video till 02:57:57

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View className="flex-row items-center">
                    <Avatar rounded source={{
                        uri: messages[0]?.data.photoURL
                    }} />
                    <Text className="text-white ml-[10] font-[700] text-xl">{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View className="flex-row w-[80] justify-between mr-[10]">
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = async () => {
        Keyboard.dismiss();
        addDoc(collection(doc(collection(db, 'chats'), route.params.id), "messages"), {
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });
        setInput('');
    }

    useLayoutEffect(() => {
        const unsubscribe = onSnapshot(query(collection(doc(collection(db, 'chats'), route.params.id), "messages"), orderBy("timestamp")), (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));

        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'null'}
                keyboardVerticalOffset={90}
                style={{
                    flex: 1
                }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView className="pt-[15]" contentContainerStyle={{
                            paddingBottom: 15
                        }}>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} className="p-[15] bg-[#ECECEC] mr-[15] mb-[20] relative rounded-2xl" style={{ maxWidth: "80%", alignSelf: "flex-end" }}>
                                        <Avatar position="absolute" bottom={-15} right={-5} size={30} rounded source={{ uri: data.photoURL }} />
                                        <Text className="ml-[10] text-black" style={{ fontWeight: "500" }}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} className="p-[15] bg-[#2B68E6] m-[15] relative rounded-2xl" style={{ maxWidth: "80%", alignSelf: "flex-start" }}>
                                        <Avatar position="absolute" bottom={-15} left={-5} size={30} rounded source={{ uri: data.photoURL }} />
                                        <Text className="ml-[10] mb-[15] text-white" style={{ fontWeight: "500" }}>{data.message}</Text>
                                        <Text className="left-[10] pr-[10] text-white" style={{ fontSize: 10 }}>{data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View className="flex-row items-center w-full p-[15]">
                            <TextInput multiline={true} className="bottom-0 h-auto flex-1 mr-[15] p-[10] text-gray-500 bg-[#ECECEC]" style={{ borderColor: 'transparent', borderWidth: 1, borderRadius: 30 }} placeholder='Signal Message' value={input} onChangeText={text => setInput(text)} />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen;