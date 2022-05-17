import React, {useState, useEffect} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert,KeyboardAvoidingView, ScrollView,TouchableOpacity, Modal, SafeAreaView } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase, { createUserDocument } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {doc, setDoc, addDoc, getFirestore, collection} from 'firebase/firestore'
import CountryPicker, {CountryModalProvider} from 'react-native-country-picker-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUID, setCountry, setPOR} from '../redux/actions';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default function PaymentGateway() {
    const onChange = form => console.log(form)
    const [clicked, setClicked] = useState(false)
    return(
        <SafeAreaView style={{flex:1,flexDirection:'row'}}>
      {!clicked && (
        <TouchableOpacity style={{flex:1, paddingHorizontal:30, width:'100%', alignItems:'center',  height:100, flexDirection:'row',borderWidth:1, marginHorizontal:20, marginTop:15, borderRadius:15 }}
           onPress={() => setClicked(true)}
           >
               <Text style={{fontSize:30, alignSelf:'center', padding:20 }}>Add Payment Method</Text>
                <Ionicons name='card-outline' size={32} style={{left:-40,marginLeft:40}} />
           </TouchableOpacity>
      )}     
       {clicked && (
           <View>
               <View>
                   <CreditCardInput />
               </View>
               <View>
                   <TouchableOpacity >
                       <Text>Add Another Card</Text>
                   </TouchableOpacity>
               </View>
           </View>
       )}
        </SafeAreaView>
    )
}