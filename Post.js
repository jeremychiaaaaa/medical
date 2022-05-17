import React, {useState} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert, KeyboardAvoidingView } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostOne from './PostOne';
import HomePage from './HomePage';
export default function Post() {
    const Stack = createStackNavigator()

    return(
     
        <View style={styles.div}>
            <Text style={styles.content}>One</Text>
        </View>
      

    )
    
}
const styles = StyleSheet.create({
    div : {
        flex:1,
        justifyContent: 'center',
    
    },
    content: {
        marginVertical: 20,
        borderWidth:3,
        borderRadius:6,
        fontSize:18,
      
        padding:30,
        color:'black',
        
    },
    welcome: {
       alignSelf: 'center',
    
        color:'black',
        fontSize:20,
        fontWeight: '500'
    }
})
