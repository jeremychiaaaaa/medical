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
import { setUser, setUID, setDOB, setCountry } from '../redux/actions';
import CountryPicker, {CountryModalProvider} from 'react-native-country-picker-modal'
import DateTimePicker from '@react-native-community/datetimepicker';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
export default function Birthday() {

    const[selectedDate, setSelectedDate] = useState(new Date())
const[clicked,setClicked] = useState(false)
const[openDate,setOpenDate] = useState(false)
const [mode,setMode] = useState('date')
    const dateChange = (event,date) => {
   const select = date
        setSelectedDate(select)
        dispatch(setDOB(select))
      
    }
    const switchClicked = () => setOpenDate(true)
    const {username,dob,country,POR } = useSelector(state => state.userReducer)
    const[visibile,setVisible] = useState(false)
    const [stateCountry, setStateCountry] = useState('')
    const[withModal, setwithModal] = useState(false)
    const[withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [fontScaling, setFontScaling] = useState(true)
    const [disableNativeModal, setDisableNativeModal] = useState(false)
    const[initial, setInitial] = useState(
      {  country:{
            cca2:'US',
            
        }}
    )
    const[withCountryNameButton, setWithCountryNameButton] = useState(true)
    const onSelect = (stateCountry) => {
        setStateCountry(stateCountry)
        console.log(stateCountry)
        
    dispatch(setCountry(stateCountry.name))
    }
    console.log(selectedDate)
    const switchVisible = () =>  setVisible(true)
const[withFilter, setWithFilter] = useState(true)
  const dispatch = useDispatch()
  const[withFlag,setWithFlag] = useState(true)
    console.log(dob)
    function formattedDate(d = new Date) {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
      
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      
        return `${day}-${month}-${year}`;
      }
     console.log(formattedDate()) 
     let today = formattedDate()
     const nav = useNavigation()
    return(

        <View style={{flex:1, backgroundColor:'white', jstifyContent:'center', alignContent:'center'}}>
            <Text style={{ fontSize:28, fontWeight:'700', marginLeft:15, marginTop:20}}>When were you born {username} ? </Text>
            <Text style={{fontSize:16, fontWeight:'400', marginVertical:20,marginLeft:15,}}>Please also indicate your country of birth. The default is Singapore</Text>
            <TouchableOpacity onPress={switchVisible} style={{ padding:20,borderWidth:1, width:'90%', marginHorizontal:15,borderColor:'lightgrey',borderRadius:10}}>
<View style={{flexDirection:'row',alignContent:'space-between', alignItems:'center'}}>
         <TextInput 
                    placeholder='Country'
                  value={stateCountry !== '' ? stateCountry.name : ''}
                  onChange={country => onSelect(country)}
         pointerEvents='none'
                  style={{fontSize:22}}
                  
                  selectTextOnFocus={false}
                    />
                    <Ionicons name='caret-down-outline' size={32} color={'lightgrey'} style={{alignSelf:'flex-end', position:'absolute', right:0, top:0,marginBottom:5}}/>
</View>
</TouchableOpacity>

        
     
        {visibile && (
                <CountryPicker 
                  {...{
                      allowFontScaling:fontScaling,
                      withFilter,
                      onSelect,
                    placeholder:'',
                   
                      preferredCountries:['SG', 'ID'],
                      disableNativeModal,
                      withAlphaFilter,
                      
                      
                      
                      withFlag,
                      onClose: () => setVisible(false),
                      onOpen: () => setVisible(true),
               
                  }}
                visible
                  />   
        )}           
 
        
           

        
               
      {clicked === true && (
           <TouchableOpacity style={{ width:'90%', marginHorizontal:15, padding:20, backgroundColor:'rgba(67,179,174,1)',
   borderColor:'transparent', borderWidth:1, borderRadius:10,marginTop:25 }}>
                <Text style={{alignSelf:'center',color:'white',fontSize:20, fontWeight:'600'}}>Continue</Text>
                </TouchableOpacity>    
      )}     
      <TouchableOpacity onPress={switchClicked} style={{ padding:20,borderWidth:1, width:'90%', marginHorizontal:15,borderColor:'lightgrey',borderRadius:10, marginTop:10}}>
   
      <Text style={{fontWeight:'200', fontSize:16}}> DOB : {JSON.stringify(selectedDate).slice(1,11)}</Text>

        </TouchableOpacity>
    
{openDate && (
  <>
  <DateTimePicker
  display='inline'
  value={selectedDate}
  mode={mode}
  is24Hour={true}
  onChange={dateChange}
  style={{backgroundColor:'white', marginTop:10, color:'black'}}
  themeVariant='light'
/>
<TouchableOpacity onPress={() => nav.navigate('Step 2 of 3')} style={{ width:'90%', marginHorizontal:20, padding:20,    backgroundColor:'rgba(67,179,174,1)',
   borderColor:'transparent', borderWidth:1, borderRadius:10,marginTop:25 }}>
  <Text style={{alignSelf:'center',color:'white',fontSize:20, fontWeight:'600'}}>Proceed</Text>
</TouchableOpacity>
</>

)}
          
        </View>
    )
}