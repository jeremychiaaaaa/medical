import React, {useState,useEffect, useCallback} from 'react'
import { ImageBackground, Image, StyleSheet, Button, TextInput, Text, View, Alert, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux';

export const CustomDrawer = (props) => {
    const {name,uid, country, POR, username} = useSelector(state => state.userReducer)
    return(
        <View style={{flex:1}}>
    <DrawerContentScrollView {...props}
    contentContainerStyle={{backgroundColor:'rgba(67,179,174,1)'}}

    >
        <ImageBackground source={require('./bg.jpeg')} style={{padding:20}}>
        <Image source={require('../images/profile.jpeg')} style={{height:90, width:80, borderRadius:40, marginBottom:10}}/>
        <Text style={{fontSize:18}}>{username}</Text>
     
        
        
        </ImageBackground>
        <View style={{flex:1, backgroundColor:'white', paddingTop:10}}>
        <DrawerItemList {...props}>

        </DrawerItemList>
        </View>
    </DrawerContentScrollView>
    
    <View style={{padding:20, borderTopWidth:1, borderTopColor:'#ccc'}}>
        <TouchableOpacity style={{paddingVertical:15}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
             <Ionicons name='exit-outline' size={22}/>
             
              <Text style={{fontSize:15, marginLeft:5}}>Log Out</Text>
              </View>
        </TouchableOpacity>
      
    </View>
    
    </View>
    
    )
}


//to open drawer using nav.openDrawer