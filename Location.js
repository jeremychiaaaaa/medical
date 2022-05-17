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
import { setUser, setUID, setDOB,setCountry,setPOR } from '../redux/actions';
import CountryPicker, {CountryModalProvider} from 'react-native-country-picker-modal'

export default function Location(){
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

    const switchVisible = () =>  setVisible(true)
const[withFilter, setWithFilter] = useState(true)
  const dispatch = useDispatch()
  const[withFlag,setWithFlag] = useState(true)
  const onSelect = (stateCountry) => {
    setStateCountry(stateCountry)
    console.log(stateCountry)
    
dispatch(setPOR(stateCountry.name))
}
console.log(country)
const nav = useNavigation()
    return(
        <CountryModalProvider>
     <View style={{flex:1, backgroundColor:'white'}}>
         <Text style={{ fontSize:28, fontWeight:'700', marginLeft:15, marginTop:20}}>Where are you currently living at ?</Text>
         <Text style={{fontSize:20, fontWeight:'400', marginVertical:20,marginLeft:15,}}>So that we can help to filter to where you are currently reside in</Text>
         <TouchableOpacity onPress={switchVisible} style={{ padding:20,borderWidth:1, width:'90%', marginHorizontal:15,borderColor:'lightgrey',borderRadius:10}}>
<View style={{flexDirection:'row',alignContent:'space-between', alignItems:'center'}}>
         <TextInput 
                    placeholder='Place Of Residence'
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
                   
                      
                      
                      
                      withFlag,
                      onClose: () => setVisible(false),
                      onOpen: () => setVisible(true),
               
                  }}
                visible
                  />   
        )}           
 
        
           

        
               
      {stateCountry !== '' && (
           <TouchableOpacity style={{ width:'90%', marginHorizontal:15, padding:20,    backgroundColor:'rgba(67,179,174,1)',
   borderColor:'transparent', borderWidth:1, borderRadius:10,marginTop:25 }} onPress={() => nav.navigate('Step 3 of 3')}>
                <Text style={{alignSelf:'center',color:'white',fontSize:20, fontWeight:'600'}}>Continue</Text>
                </TouchableOpacity>    
      )}     

       
     </View>
     </CountryModalProvider>
    )
}
