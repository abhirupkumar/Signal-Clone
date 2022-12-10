import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from '@rneui/base';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    const signOutUser = () => {
        signOut(auth).then(() => navigation.replace("Login"))
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'chats'), snapshots => (
            setChats(snapshots.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe;
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { color: 'black' },
            headerTintColor: "black",
            headerLeft: () => (
                <View className="">
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser} >
                        <Avatar rounded source={{
                            uri: auth?.currentUser?.photoURL
                        }} />
                    </TouchableOpacity>
                </View>),
            headerRight: () => (
                <View className="flex-row justify-between w-[80] mr-[20]">
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id: id,
            chatName: chatName
        })
    }

    return (
        <SafeAreaView>
            <StatusBar style="dark" />
            <ScrollView className="h-full">
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen;