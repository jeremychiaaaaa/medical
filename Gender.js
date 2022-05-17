import React, {useState} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert, KeyboardAvoidingView,TouchableOpacity,Image,Dimensions } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { setUser, setUID, setDOB,setCountry,setPOR,setGender } from '../redux/actions';
//rgba(67,179,174,1)
export default function Gender(){
    const dispatch = useDispatch()
    const[select, setSelect] = useState(false)
    const[selectFemale, setSelectFemale] = useState(false)
    const[proceed,setProceed] = useState(false)
    const onSelect = () => {
        setSelect(true)
        setMale(true)
        dispatch(setGender('male'))
        setProceed(true)
        setSelectFemale(false)
    }
    const onSelectFemale = () => {
        setSelectFemale(true)
        setFemale(true)
        setSelect(false)
        dispatch(setGender('female'))
        setProceed(true)
    }
    const[male,setMale] = useState(false)
    const[female,setFemale] = useState(false)
    const {gender,username} = useSelector(state => state.userReducer)
    console.log(gender)
    const nav = useNavigation()
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <Text style={{ fontSize:28, fontWeight:'700', marginLeft:20, marginTop:20}}>Please indicate your gender, {username} </Text>
            <TouchableOpacity onPress={onSelect} style={{padding:20, width:'90%', marginHorizontal:20, marginVertical:10, borderWidth:1, borderRadius:10,  backgroundColor:select ? 'rgba(67,179,174,1)' : 'white', borderColor:select ? 'transparent' : 'lightgrey',justifyContent:'center', shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,}} >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk5CBol0PVTWmgH3yg8Bc5z1FbnUSb6S6Acg&usqp=CAU'}} style={{width:60, height:60, resizeMode:'contain' }}/>
                    <Text style={{marginLeft:50, fontSize:20, fontWeight:'500', }}>Male</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSelectFemale} style={{padding:20, width:'90%', marginHorizontal:20, marginVertical:10, borderWidth:1, borderRadius:10,  backgroundColor:selectFemale ? 'rgba(67,179,174,1)' : 'white', borderColor:selectFemale ? 'transparent' : 'lightgrey',justifyContent:'center', shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri :'https://cdn-icons-png.flaticon.com/512/3233/3233515.png'}} style={{width:60, height:60, }}/>
                    <Text style={{marginLeft:50, fontSize:20, fontWeight:'500', }}>Female</Text>
                </View>
            </TouchableOpacity>
   {proceed && (
          <TouchableOpacity style={{ width:'90%', marginHorizontal:20, padding:20,    backgroundColor:'rgba(67,179,174,1)',
          borderColor:'transparent', borderWidth:1, borderRadius:10,marginTop:35 }} onPress={() => {
            Alert.alert(
                "Thankyou for registering an account with TravelMed.",
                "Please proceed to login",
                [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Log In", onPress: () => nav.navigate('Log In') }
                  ]
              );
              
              
             }}>
                       <Text style={{alignSelf:'center',color:'white',fontSize:20, fontWeight:'600'}}>Continue</Text>
                       </TouchableOpacity>    
   )}
        </View>
    )
}