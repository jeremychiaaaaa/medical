import React, {useState, useEffect} from 'react'
import { Dimensions, StyleSheet, Button, TextInput, Text, View, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, PixelRatio, Image } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box';
import { SvgUri } from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


export default function WelcomePage2() {
    return(
        <SafeAreaView style={{flex:1,alignContent:'center', justifyContent:'center' }}>
            <View style={{flex:1, padding:20, marginHorizontal:20, justifyContent:'center',}}>
                <Image source ={{uri: 'https://cdn-icons.flaticon.com/png/512/3385/premium/3385882.png?token=exp=1651565265~hmac=8aed340219738a8da0f8de86f5099b7e'}} style={{width:100, height:100, alignSelf:'center', bottom:50,}}/>
           <Text style={{fontSize:20,fontWeight:'600',alignSelf:'center'}}>All your healthcare and travel needs made simple at your fingertips !</Text>
              <Text style={{marginTop:10, fontWeight:'200', fontSize:13}}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</Text>
           <View>
               <TouchableOpacity style={{padding:20, alignSelf:'center'}}>
                   <Text>SignUp</Text>
               </TouchableOpacity>
           </View>
           </View>

        </SafeAreaView>
    )
}