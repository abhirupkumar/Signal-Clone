import { View, Text } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Input } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add A New Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () => {
        addDoc(collection(db, 'chats'), {
            chatName: input,
        }).then(() => navigation.goBack()).catch(error => alert(error.message))
    }

    return (
        <View className="bg-white p-[30] h-full">
            <Input placeholder='Enter a chat name' value={input} onChangeText={text => setInput(text)} leftIcon={<AntDesign name="wechat" size={24} color="black" />} onSubmitEditing={createChat} />
            <Button disabled={!input} onPress={createChat} title="Create a new chat" />
        </View>
    )
}

export default AddChatScreen;