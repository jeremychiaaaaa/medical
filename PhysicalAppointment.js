import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, ActivityIndicator, Keyboard, Button, TextInput, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Modal, FlatList,Image     } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryPicker from 'react-native-country-picker-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import CalendarPicker from 'react-native-calendar-picker';
import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getFirestore, getDoc, collection, setDoc } from 'firebase/firestore';
import { createAppointment,  newAppointment} from '../../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setAppointments } from '../../../redux/actions'
import moment from 'moment';
import { DoctorContext } from './BotoxDoctor';
export default function PhysicalAppointment() {
  const {doctor, setDoctor, fakeData, setFakeData,images,setImages,type,setType } = useContext(DoctorContext)
    const[selectedDate,setSelectedDate] = useState()
    const[time,setTime] = useState()
    const[click,setClick] = useState(null)
    const dateChange = (date) => {
        setSelectedDate(date)
    }
  const[confirm, setConfirm] = useState(false)
  const[waiting,setWaiting] = useState(false)
    const nav=useNavigation()
    const {user,uid, appointment} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    console.log(user)
    console.log(uid)
    const disabledDates = ["2022-04-18", "2022-04-19", "2022-04-21", "2022-04-25"] 
    const date = JSON.stringify(selectedDate)
    
    const dateee = moment.utc(date).format('MM/DD/YYYY')
    console.log(dateee)
   const finalDoctor = doctor.split()
    return(
      <View>
      <CalendarPicker onDateChange={dateChange} disabledDates={disabledDates}  />
     
      <Text>{date}</Text> 
      {selectedDate && (
            <FlatList 
        data={data}
        renderItem={({item}) => 
        <TouchableOpacity  onPress={async () => {
            setClick(item.id)
            setTime(() => item.time)

         
          
        
        }}>
        <Text style={item.id === click ? styles.click : styles.text }>{item.time}</Text>
        
        </TouchableOpacity>
    }
       numColumns={3}
       keyExtractor={(item) => item.id}   />
      )}
      
 
   {time && (
          
          !confirm && (
            <>
            <View style={{borderWidth:1, marginHorizontal:30, marginTop:10, paddingVertical:15}}>
              <Text style={{fontSize:26,alignSelf:'center', textDecorationLine:'underline' }}>Appointment Details</Text>
            <Text style={{fontSize:20,alignSelf:'center', padding:10 }}>Date : {date.slice(1,11)}</Text> 
            <Text style={{fontSize:20,alignSelf:'center', padding:10 }}>Time : {time}</Text> 
            <Text style={{fontSize:20,alignSelf:'center', padding:10 }}>Type : {type}</Text> 
    <TouchableOpacity 
              style={styles.button}
              onPress={async() => {
                try {
                     setWaiting(true)
                     const finalDate = date.split()
   
       const finalTime = time.split()
       const finalDoctor = doctor.split()
                 await createAppointment(user, {date, time, doctor,type})
           
                 console.log('Success')
   
               setConfirm(true)
   
               setWaiting(false)
               } catch (error) {
                 console.log(error.message)
               }
              }}>
               <Text style={styles.buttonText}>Confirm</Text>  
          
          </TouchableOpacity>
           </View>
          </>
          )
  )}
        
         

       {waiting && (
     <ActivityIndicator size="large" />
   )} 
   {confirm && (   <TouchableOpacity 
       style={styles.button}
       onPress={() =>   nav.navigate('Appointment')}>
         <View style={{flexDirection:'row', alignContent:'space-between'}}>
         <Text style={styles.buttonText} >View Appointment</Text>
         <Ionicons name="calendar-outline" style={{marginLeft:10, alignSelf:'center'}}  size={28} />
         </View>
       </TouchableOpacity>)}
  
    </View>
    )
}

const data=[
    {
        id: "1",
        time: "0800",
      },
      {
        id: "2",
        time: "1000",
      },
      {
        id: "3",
        time: "1300",
      },
      {
        id: "4",
        time: "1500",
      },
      {
        id: "5",
        time: "1700",
      },
]

const styles= StyleSheet.create({

    text:{
        fontSize:20,
        padding:15,
        borderWidth:1,
       
        margin:10,
        marginHorizontal:25
    },
    click:{
        backgroundColor:'green',
        fontSize:20,
        padding:15,
        borderWidth:1,
        
        margin:10,
        marginHorizontal:25
    },
    unavailable:{
        backgroundColor:'red',
        fontSize:20,
        padding:15,
        borderWidth:1,
        borderRadius:15,
        margin:10,
        marginHorizontal:25
    },
    button: {
      alignSelf:'center',
      padding:15,
      borderWidth:1,
   borderRadius:25,
      marginTop:15
   

    },
    buttonText:{
      fontSize:24,
 alignSelf:'center'
    }
})