import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ListItem, Avatar } from '@rneui/base'
import { db } from '../firebase'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'

const CustomListItem = ({ id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(doc(collection(db, 'chats'), id), "messages"), orderBy("timestamp", "desc")), snapshot => setChatMessages(snapshot.docs.map((doc) => doc.data())));

        return unsubscribe;
    }, [])


    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar rounded={true} source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZjARMWYr_cyQpmUbWumverqLccq0EwD6dLrM3Ek8BPA&s"
            }} />
            <ListItem.Content>
                <ListItem.Title className="font-[800] text-lg" >
                    {chatName}
                </ListItem.Title>
                {chatMessages?.[0] && <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>}
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem