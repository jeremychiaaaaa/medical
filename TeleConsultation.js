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
import { createAppointment,  newAppointment,getAppointment} from '../../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setBookAppointment,setAppointmentType } from '../../../redux/actions'
import { BlurView } from 'expo-blur';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { DoctorContext } from './BotoxDoctor';
import LottieView from 'lottie-react-native';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
export default function TeleConsult() {

  const {doctor, setDoctor, fakeData, setFakeData,images,setImages, type, setType, calendarDate, setCalendarDate,clicked,setClicked,pressDate,setPressDate,pressDate1, setPressDate1, pressDate2, setPressDate2, pressDate3, setPressDate3,viewAppointment, setViewAppointment } = useContext(DoctorContext)
    const[selectedDate,setSelectedDate] = useState()
    const[time,setTime] = useState()

    const[click,setClick] = useState(null)
    const [modalVisible,setModalVisible] = useState(false)
const[date,setDate] = useState()
const dateChange = () => {
  setPressDate3(false)
  setPressDate(true)
  setPressDate1(false)
  setPressDate2(false)
  

  
}
    const dateChange1 = () => {
      setPressDate3(false)
      setPressDate(false)
      setPressDate1(true)
      setPressDate2(false)
      if(!clicked){

          
        setDate(startingDate2 + '/' + startingMonth + '/' + startingYear)
              console.log(date)
         }
    }
    const dateChange2 = () => {
      setPressDate3(false)
      setPressDate(false)
      setPressDate1(false)
      setPressDate2(true)
      if(!clicked){

          
        setDate(startingDate3 + '/' + startingMonth + '/' + startingYear)
              console.log(date)
         }
    }
    const dateChange3 = () => {
      setPressDate3(true)
      setPressDate(false)
      setPressDate1(false)
      setPressDate2(false)
      if(!clicked){

          
        setDate(startingDate4 + '/' + startingMonth + '/' + startingYear)
              console.log(date)
         }
         
    }
console.log(calendarDate)
  const[confirm, setConfirm] = useState(false)
  const[waiting,setWaiting] = useState(false)
const monthsWithout31 = [1,3,5,8,10]
const[startingMonth, setStartingMonth] = useState()
const[startingYear, setStartingYear] = useState()

  const[startingDate, setStartingDate] = useState()
  const[startingDate2, setStartingDate2] = useState('')
  const[startingDate3, setStartingDate3] = useState('')
  const[startingDate4, setStartingDate4] = useState('')
  const[startingDay, setStartingDay] = useState('')
  const[startingDay2, setStartingDay2] = useState('')
  const[startingDay3, setStartingDay3] = useState('')
  const[startingDay4, setStartingDay4] = useState('')
    const nav=useNavigation()
    const {user,uid, appt,} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    console.log(user)
    console.log(uid)
    const disabledDates = ["2022-04-18", "2022-04-19", "2022-04-21", "2022-04-25"] 
  
    useEffect(() => {
 
  if(calendarDate === null){
     switch (new Date().getDay()) {
  case 0:
   setStartingDay('Sun')
   setStartingDay2('Mon')
   setStartingDay3('Tue')
   setStartingDay4('Wed')
    break;
  case 1:
    setStartingDay('Mon')
    setStartingDay2('Tue')
    setStartingDay3('Wed')
    setStartingDay4('Thu')
    break;
  case 2:
    setStartingDay('Tue')
    setStartingDay2('Wed')
    setStartingDay3('Thu')
    setStartingDay4('Fri')
    break;
  case 3:
    setStartingDay('Wed')
    setStartingDay2('Thu')
    setStartingDay3('Fri')
    setStartingDay4('Sat')
    break;
  case 4:
    setStartingDay('Thu')
    setStartingDay2('Fri')
    setStartingDay3('Sat')
    setStartingDay4('Sun')
    break;
  case 5:
    setStartingDay('Fri')
    setStartingDay2('Sat')
    setStartingDay3('Sun')
    setStartingDay4('Mon')
    break;
  case 6:
    setStartingDay('Sat')
    setStartingDay2('Sun')
    setStartingDay3('Mon')
    setStartingDay4('Tues')
}
setStartingDate(new Date().getDate())
setStartingMonth(new Date().getMonth())
setStartingYear(new Date().getFullYear())
if(startingDate > 31){
  setStartingDate(1)
}
switch(new Date().getMonth()){
  case 0:
    setStartingMonth('Jan')
    break;
    case 1:
    setStartingMonth('Feb')
    break;
    case 2:
      setStartingMonth('Mar')
      break;
      case 3:
        setStartingMonth('Apr')
        break;
        case 4:
          setStartingMonth('May')
          break;
          case 5:
            setStartingMonth('Jun')
            break;
            case 6:
              setStartingMonth('Jul')
              break;
              case 7:
                setStartingMonth('Aug')
                break;
                case 8:
                  setStartingMonth('Sep')
                  break;
                  case 9:
                    setStartingMonth('Oct')
                    break;
                    case 10:
                      setStartingMonth('Nov')
                      break;
                      case 11:
                        setStartingMonth('Dec')
               
}
} else if (calendarDate !== null){
    let datee =  new Date(calendarDate.toString())
    console.log(datee)
    console.log(datee.getDay())
    switch (datee.getDay()) {
      case 0:
       setStartingDay('Sun')
       setStartingDay2('Mon')
       setStartingDay3('Tue')
       setStartingDay4('Wed')
        break;
      case 1:
        setStartingDay('Mon')
        setStartingDay2('Tue')
        setStartingDay3('Wed')
        setStartingDay4('Thu')
        break;
      case 2:
        setStartingDay('Tue')
        setStartingDay2('Wed')
        setStartingDay3('Thu')
        setStartingDay4('Fri')
        break;
      case 3:
        setStartingDay('Wed')
        setStartingDay2('Thu')
        setStartingDay3('Fri')
        setStartingDay4('Sat')
        break;
      case 4:
        setStartingDay('Thu')
        setStartingDay2('Fri')
        setStartingDay3('Sat')
        setStartingDay4('Sun')
        break;
      case 5:
        setStartingDay('Fri')
        setStartingDay2('Sat')
        setStartingDay3('Sun')
        setStartingDay4('Mon')
        break;
      case 6:
        setStartingDay('Sat')
        setStartingDay2('Sun')
        setStartingDay3('Mon')
        setStartingDay4('Tues')
    }
    setStartingDate(datee.getDate())
    console.log(clicked)
setStartingMonth(datee.getMonth())
setStartingYear(datee.getFullYear())
  }
    



    },[clicked])
console.log(appt)
    return(
        <View>
          <LinearGradient 

colors ={['rgba(32,178,170,0.8)',  'rgba(176,224,230,0.1)']}
start={{
    x: 0,
    y: 0
  }}
  end={{
    x: 1,
    y: 1
  }}
  style={styles.header}
 >
     <View style={{flexDirection:'column',}}>
       
         <TouchableOpacity onPress={() => nav.navigate(`${doctor} page`)}>
<Ionicons name='chevron-back-outline' size={32} style={{color:'rgb(67,179,174)', padding:10,paddingVertical:5, borderRadius:15, borderWidth:1, marginLeft:25, bottom:0,backgroundColor:'rgba(176,224,230,0.7)', borderColor:'transparent', width:60, paddingHorizontal:12}}/>
</TouchableOpacity>
<View style={{justifyContent:'center', alignItems:'center'}}>
<Image   source={{uri : images}} style={{width:180, height:180,resizeMode:'cover', alignSelf:'center', bottom:-10, borderRadius:10}}/>
<View style={{flexDirection:'column',top:10}}>
<Text style={{fontSize:22, fontWeight:'600', marginTop:20}}>Dr. James Holland</Text>
<Text style={{marginTop:5, fontWeight:'300', fontSize:18, top:10, marginLeft:30}}>Botox Doctor</Text>
</View>
</View>
<View style={{ flexDirection:'row', width:'100%',alignItems:'center' }}>
   <View style={{flexDirection:'row', alignItems:'center', top:30, marginLeft:'28%'}}>
     <TouchableOpacity  style={{backgroundColor:'white', marginHorizontal:20, borderRadius:15}}>
    <Ionicons name='call' size={28} style={{color:'rgb(67,179,174)', padding:15 }}/>
     </TouchableOpacity>
     <TouchableOpacity style={{backgroundColor:'white', borderRadius:15}}>
    <Ionicons name='mail' size={28} style={{color:'rgb(67,179,174)', padding:15 }}/>
     </TouchableOpacity>
   </View>

</View>

<View>

</View>
</View>


</LinearGradient>
<View style={{borderWidth:1, borderTopLeftRadius:60, borderTopRightRadius:60, borderColor:'transparent',backgroundColor:'white', height:'100%', transform:[{translateY: -30}]}}>
  <View>
  <View style={{flexDirection:'row', padding:20, marginLeft:20}}>
  <Text style={{fontSize:20, fontWeight:'600'}}>
  Select Date
  </Text>
 
</View>
  <View key={1} style={{flexDirection:'row', marginHorizontal:30, alignContent:'space-around'}}>
    <TouchableOpacity style={{borderColor:'transparent', borderWidth:1, borderRadius:15, bottom:10, marginHorizontal:10, width:60, height:80, backgroundColor:pressDate ? 'rgba(67,179,174,0.5)' : 'rgba(220,220,220,0.2)'}} 
        onPress ={dateChange}
    >
      <View style={{justifyContent:'center', alignSelf:'center', marginTop:20}}>
      <Text style={{fontSize:20, fontWeight:'200', bottom:5}}>{startingDay}</Text>
      <Text style={{fontSize:22, fontWeight:'600',}}>{startingDate}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity key={2} style={{borderColor:'transparent', borderWidth:1, borderRadius:15, bottom:10, marginHorizontal:10, width:60, height:80, backgroundColor:pressDate1 ? 'rgb(67,179,174)' : 'rgba(220,220,220,0.2)'}}
    onPress ={dateChange1}
    >
      <View style={{ alignSelf:'center', marginTop:20, }}>
      <Text style={{fontSize:20, fontWeight:'200', bottom:5}}>{startingDay2}</Text>
      <Text style={{fontSize:22, fontWeight:'600',}}>{monthsWithout31.includes(startingMonth) === true ? (
 startingDate + 1 === 31 ? 1 : startingDate + 1
      ) :(
        startingDate + 1 <= 31 ? startingDate + 1 : 1
      )
     

      
       
       }     
         </Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity key={3} style={{borderColor:'transparent', borderWidth:1, borderRadius:15, bottom:10, marginHorizontal:10, width:60, height:80, backgroundColor:pressDate2 ? 'rgb(67,179,174)' : 'rgba(220,220,220,0.2)'}}
        onPress ={dateChange2}
    >
      <View style={{ alignSelf:'center', marginTop:20}}>
      <Text style={{fontSize:20, fontWeight:'200', bottom:5}}>{startingDay3}</Text>
      <Text style={{fontSize:22, fontWeight:'600',}}>{monthsWithout31.includes(startingMonth) === true ? (
 startingDate + 2 === 32 ? 2 : startingDate + 2
      ) :(
        startingDate + 2 <= 31 ? startingDate + 2 : 2
      )
     

      
       
       }     
       </Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity key={4} style={{borderColor:'transparent', borderWidth:1, borderRadius:15, bottom:10, marginHorizontal:10, width:60, height:80, backgroundColor:pressDate3 ? 'rgb(67,179,174)' : 'rgba(220,220,220,0.2)'}}
        onPress ={dateChange3}
    >
      <View style={{ alignSelf:'center', marginTop:20}}>
      <Text style={{fontSize:20, fontWeight:'200', bottom:5}}>{startingDay4}</Text>
      <Text style={{fontSize:22, fontWeight:'600',}}>{monthsWithout31.includes(startingMonth) === true ? (
 startingDate + 3 === 33 ? 3 : startingDate + 3
      ) :(
        startingDate + 3 <= 31 ? startingDate + 3 : 3
      )
     

      
       
       }  </Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity style={{alignSelf:'center'}} onPress={() => nav.navigate('Full Appointment')}>
     
     <Ionicons name='chevron-forward-circle-sharp' size={40} color={'rgba(67,179,174,1)'} style={{marginLeft:2}}/>
 </TouchableOpacity>
  </View>
 
  </View>

      
         
          <Text style={{marginLeft:20, padding:20, marginTop:0, fontWeight:'700', fontSize:20}}>Select TeleConsult Time</Text>
          
                <FlatList 
            data={data}
            renderItem={({item}) => 
            <TouchableOpacity  onPress={ () => {
                 setClick(item.id)
                setTime(() => item.time)

             
              
            
            }}
            style={item.id === click ? styles.click : styles.text }
            >
              
            <Text style={{fontSize:18}} >{item.time} </Text>
            
            </TouchableOpacity>
        }
           numColumns={3}
           keyExtractor={(item) => item.id}   />
        
          
    
              
     
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >

        <View style={styles.centeredView}>
      
         <BlurView intensity={100} style={{height:'100%', justifyContent:'center', width:'100%'}}>
          <View style={styles.modalView}> 
            <Ionicons name='close-circle' size={32} onPress={() => setModalVisible(false)} style={{alignSelf:'flex-end', bottom:30, }}/>
            
            <Ionicons name='notifications' size={40} style={{color:'rgba(67,179,174,1)'}}/>
            
            <Text style={{fontSize:22,}}>You will be notified to begin the consultation on :</Text>
            <Text style={{fontSize:20, fontWeight:'600'}}>{date}</Text>
            <Text style={{fontSize:20, fontWeight:'400'}}>{time}</Text>
            
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={confirm ? () =>{ 
                setModalVisible(false)
             dispatch(setBookAppointment(true))
            console.log(appt)
                nav.navigate('Appointment') }:     async() => {
          
                try {
                     setWaiting(true)
 dispatch(setAppointmentType(type))
                
                  console.log(date)
                  const a = {date,time,doctor,type,images}
           
                let temp = []
                temp.push(a)
                    await createAppointment(user, {temp})
                 
              
                 
                 
                 
           
                 console.log('Success')
   
               setConfirm(true)
   
               setWaiting(false)

               } catch (error) {
                 Alert.alert('Please make sure you have selected an appointment date and time. Thankyou !')
                 console.log(error.message)
               }
              }}
            >
   <Text style={styles.buttonText}>{confirm ? 'View Appointment' :'Confirm Booking'}</Text>
            </TouchableOpacity>
             {waiting && (
        <LottieView source={require('../../../assets/197-glow-loading.json')}       style={{
          width:'100%', height:50,
                  
                }} autoPlay loop/>
       )} 
       
      
          
          </View>
       </BlurView>
        </View>
      </Modal>
      
 <TouchableOpacity 
           style={styles.button1}
           onPress={
         () => {setModalVisible(true)
           if(clicked === true){
             if(pressDate === true){
                  setDate(calendarDate.toString().slice(3,15))
             }else if(pressDate1  === true){
              setDate(startingMonth + ' ' + '0' + (startingDate + 1) + ' ' + startingYear)
            } else if(pressDate2 === true){
              setDate(startingMonth + ' ' + '0' + (startingDate + 2) + ' ' + startingYear)
            } else if(pressDate3 === true){
              setDate(startingMonth + ' ' + '0' + (startingDate + 3) + ' ' + startingYear)
            }
                 
                  
                  } else if (!clicked){
                    if(pressDate === true){
                       setDate(startingMonth + ' '  + '0' + startingDate + ' ' + startingYear)
                    } else if(pressDate1  === true){
                      setDate(startingMonth + ' ' + '0' + (startingDate + 1) + ' ' + startingYear)
                    } else if(pressDate2 === true){
                      setDate(startingMonth + ' ' + '0' + (startingDate + 2) + ' ' + startingYear)
                    } else if(pressDate3 === true){
                      setDate(startingMonth + ' ' + '0' + (startingDate + 3) + ' ' + startingYear)
                    }
                   
                
                  }}
           }>
            <Text style={styles.buttonText}>Book an appointment</Text>  
       
       </TouchableOpacity>
 
       
    
            
             

          
        </View>
        </View>
    )
}

const data=[
    {
        id: "1",
        time: "0800 a.m",
      },
      {
        id: "2",
        time: "1000 a.m",
      },
      {
        id: "3",
        time: "1300 p.m",
      },
      {
        id: "4",
        time: "1500 p.m",
      },
      {
        id: "5",
        time: "1700 p.m",
      },
]

const styles= StyleSheet.create({
  header:{
      
      
       
    alignContent:'center',
        textAlign:'center',
         width:'100%',
         height: HEIGHT * 0.55,
         borderBottomColor:'#F5F5F5',
         borderBottomWidth:1,
         alignSelf:'center',
         justifyContent:'center'
        
     },
    text:{
        fontSize:20,
        padding:10,
        width:100,
        height:50,
        marginLeft:30,
        marginBottom:10,
       alignSelf:'center',
backgroundColor:'rgba(220,220,220,0.2)',
borderRadius:10,
justifyContent:'center'
    },
    click:{
        backgroundColor:'rgb(214,202,221)',
        fontSize:20,
        padding:10,
     width:100,
     height:50,
        alignSelf:'center',
        marginLeft:30,
        marginBottom:10,
        borderRadius:10,
        justifyContent:'center'
        
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
 borderRadius:15,


  width:'90%',
  marginHorizontal:10,
  backgroundColor:'rgba(67,179,174,1)',
  borderColor:'transparent'

    },
    button1: {
      alignSelf:'center',
     padding:15,
     borderWidth:1,
  borderRadius:15,
 position:'absolute',
 top:'25%',
 
   width:'90%',
   marginHorizontal:10,
   backgroundColor:'rgba(67,179,174,1)',
   borderColor:'transparent'
 
     },
    buttonText:{
      fontSize:20,
      alignSelf:'center',
      color:'white',
      fontWeight:'700'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '88%',
      height: HEIGHT * 0.6,
      justifyContent:'space-evenly'
    },
  

})

export const FullAppointment = () => {
  const {doctor, setDoctor, fakeData, setFakeData,images,setImages, type, setType, calendarDate, setCalendarDate,clicked,setClicked,pressDate,setPressDate,pressDate1, setPressDate1, pressDate2, setPressDate2, pressDate3, setPressDate3 } = useContext(DoctorContext)
 const dateChange = (date) => {
  
  
  
  setCalendarDate(date)
   setClicked(true)
    setPressDate(true)
    setPressDate2(false)
    setPressDate3(false)
    setPressDate1(false)
  nav.navigate('TeleConsult')
 setClicked(!clicked)
}
 const disabledDates = ["2022-04-18", "2022-04-19", "2022-04-21", "2022-04-25"] 
 const nav = useNavigation()
  return(
  <View style={{marginTop:100}}>
      <TouchableOpacity onPress={() => nav.navigate('TeleConsult')}>
<Ionicons name='chevron-back-outline' size={32} style={{color:'rgb(67,179,174)', padding:10,paddingVertical:5, borderRadius:15, borderWidth:1, marginLeft:25, bottom:0,backgroundColor:'rgba(176,224,230,0.7)', borderColor:'transparent', width:60, paddingHorizontal:12}}/>
</TouchableOpacity>
    <CalendarPicker onDateChange={dateChange} disabledDates={disabledDates} startFromMonday={true}/>

 
  </View>
  )
}