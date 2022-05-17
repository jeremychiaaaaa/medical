import React, {useState, useEffect} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert,KeyboardAvoidingView, ScrollView,TouchableOpacity, Modal,Image,Dimensions } from 'react-native'
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

import DatePicker from 'react-native-datepicker';
import CalendarPicker from 'react-native-calendar-picker';
const {width, height} = Dimensions.get('window')

const ReviewSchema = Yup.object().shape({
 
    email: Yup.string().email('Not a valid email').required('This is a required field'),
    password: Yup.string().required('This is a required field').matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
   
    })
    
const Stack = createStackNavigator()

const auth=getAuth()




 export default function SignUp() {
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
     const[selectedDate, setSelectedDate] = useState()
     const[open,setOpen] = useState(false)
     const dateChange = (date) => {
        setSelectedDate(date)
    }
    const {name,uid, country, POR} = useSelector(state => state.userReducer)
    const[visibile,setVisible] = useState(false)
    const [stateCountry, setStateCountry] = useState('')
    const[withModal, setwithModal] = useState(true)
    const[withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [fontScaling, setFontScaling] = useState(true)
    const [disableNativeModal, setDisableNativeModal] = useState(false)
    const[initial, setInitial] = useState(
      {  country:{
            cca2:'US',
            
        }}
    )
    const[withCountryNameButton, setWithCountryNameButton] = useState(true)
    const switchVisible = () =>  setVisible(!visibile)
const[withFilter, setWithFilter] = useState(true)
  const dispatch = useDispatch()
  const[withFlag,setWithFlag] = useState(true)
       const nav = useNavigation()
       const onSelect = (stateCountry) => {
           setStateCountry(stateCountry)
           console.log(stateCountry)
       }
    const onSignUp = async (country,residence) => {
       
        try {
        
        
            dispatch(setCountry(country))
            dispatch(setPOR(residence))
     
        } catch (error) {
            Alert.alert('Hello', error.message)
        }
    }
  return (
        
        <KeyboardAvoidingView style={styles.div}>
            <ScrollView>
              <View style={{}}>
                <Image source={{uri:'https://img.freepik.com/free-vector/patient-visit-doctor-medical-health-consultation-flat-illustration_7081-2922.jpg?w=826'}} style={{width:'100%',height:height*0.3,marginTop:40,}} />

              </View>

        <Formik 
        initialValues={{country:'', residence:''}} //these are basically like the usestate hooks 
   
        onSubmit={(values, actions) => {
         
            onSignUp(values.country,values.residence)
             
          console.log(values.residence)
            nav.navigate('Create Account')
        }}
        >
            {(props) => ( //this here is some props that are provided to us by formik such as onChange functions / access to values /submission handler
           
                <CountryModalProvider
                >
                  <View style={{flex:1, width:'90%', marginLeft:20, marginTop:20, height:height*0.7}}>
                    <Text style={{fontSize:24, fontWeight:'700',marginLeft:15 }}>Sign Up</Text>
                      <Text style={{padding:15, fontSize:20, fontWeight:'400', top:20}}>Step One: Please select your country of birth</Text>
                 <View style={{borderBottomWidth:1, borderBottomColor:'lightgrey', width:'90%', marginHorizontal:15, bottom:60, justifyContent:'flex-end'}}>
                     <TouchableOpacity>
                       <CountryPicker 
                  {...{
                      allowFontScaling:fontScaling,
                      withFilter,
                      onSelect,
                    placeholder:'',
                      withModal,
                      preferredCountries:['SG'],
                      disableNativeModal,
                      withAlphaFilter,
                      modalProps: {
                        visibile
                      },
                      withFlag,
                      onClose: () => setVisible(false),
                      onOpen: () => setVisible(true),
                  containerButtonStyle:{ paddingVertical:40, marginTop:10, justifyContent:'center', }
                  }}
                
                  />   
 
        
                  {stateCountry === '' ? (
                      
            <TextInput 
            placeholder='Singapore'
          value={'Singapore'}
          onChange={props.handleChange('country')}
          
          style={{fontSize:20}}
      
          selectTextOnFocus={false}
            />
                  )  : (

            <TextInput 
                    placeholder='Country'
                  value={stateCountry !== '' ? stateCountry.name : ''}
                  onChange={props.handleChange('country')}
                  
                  style={{fontSize:20}}
                  
                  selectTextOnFocus={false}
                    />
                  )}
                
</TouchableOpacity>
         
               </View>
               <Text style={{padding:15, fontSize:18, fontWeight:'400', top:20}}>Step Two: Please select your place of residence</Text>
                 <View style={{borderBottomWidth:1, borderBottomColor:'lightgrey', width:'90%', marginHorizontal:15, bottom:60, justifyContent:'flex-end'}}>
                     <TouchableOpacity>
                       <CountryPicker 
                  {...{
                      allowFontScaling:fontScaling,
                      withFilter,
                      onSelect,
                    placeholder:'',
                      withModal,
                      preferredCountries:['SG'],
                      disableNativeModal,
                      withAlphaFilter,
                      modalProps: {
                        visibile
                      },
                      withFlag,
                      onClose: () => setVisible(false),
                      onOpen: () => setVisible(true),
                  containerButtonStyle:{ paddingVertical:40, marginTop:10, justifyContent:'center', }
                  }}
                
                  />   
 
        
               

            <TextInput 
                    placeholder='Country'
                  value={stateCountry !== '' ? stateCountry.name : ''}
                  onChange={props.handleChange('country')}
                  
                  style={{fontSize:20}}
                  
                  selectTextOnFocus={false}
                    />
               
                
</TouchableOpacity>
         
               </View>
               <Text style={{padding:15, fontSize:18, fontWeight:'400'}}>Step Three: Please select your DOB(Date Of Birth)</Text>
                 <View style={{borderBottomWidth:1, borderBottomColor:'lightgrey', width:'90%', marginHorizontal:15, justifyContent:'flex-end'}}>
                     <TouchableOpacity
                    
                     
                     
                     >
                     <DatePicker
          style={{width: '100%'}}
          date={selectedDate}
          format="DD/MM/YYYY"
          minDate="01/05/1920"
          maxDate={today}
          onDateChange={dateChange}
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
           
            datePickerCon:{
               backgroundColor:'black'
            }
            // ... You can check the source to find the other keys.
          }}
        />   
               

           
               
                
</TouchableOpacity>
         
               </View>
               <TouchableOpacity onPress={() => nav.navigate('Create Account')} style={{margin:15, justifyContent:'center', alignSelf:'center', padding:15, left:0, width:'94%', borderWidth:1,marginTop:60, backgroundColor:'rgb(30,81,123)'}}>
                   <Text style={{fontSize:24, fontWeight:'500', alignSelf:'center',color:'white'}}>NEXT</Text>
               </TouchableOpacity>
                </View>
                
</CountryModalProvider>
                

          
            )}
    
     </Formik>
    
    </ScrollView>
    </KeyboardAvoidingView>
    
    )
}


const styles = StyleSheet.create({
    div : {
        flex:1,
        justifyContent: 'center',
        backgroundColor:'white',
        width:width,
        height:height
    },
    icons:{
       
        flexDirection:'row',
        
        position:'absolute',
        left:'84%',
        
        fontSize:32,
       
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
       
    
        color:'black',
        fontSize:30,
        fontWeight: '500',
     
    },
    select:{
        paddingVertical:20,
        flex:1,

    marginTop:15,
   height:100,
  borderBottomWidth:1,
  color:'lightgrey',
    width:'90%',
    marginHorizontal:20,
    flexDirection:'column',
justifyContent:'space-between'
    }
})
