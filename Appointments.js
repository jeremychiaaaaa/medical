
import React, {useState,useEffect, useCallback,useContext, useRef} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, RefreshControl, ScrollView, TouchableHighlight,Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { setAppointments } from '../redux/actions';
import { getAppointment, deleteAppointment } from '../firebase';
import { NavigationContainer, useNavigation,DrawerActions } from '@react-navigation/native';
import { StackRouter } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import TeleConsult from './TeleConsult';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';   
import { DoctorContext } from './Aesthetic/Botox/BotoxDoctor';
import { setBookAppointment,setAppointmentType } from '../redux/actions';
import LottieView from 'lottie-react-native';
const Tab = createMaterialTopTabNavigator() 
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default function Appointments({navigation}) {
const dispatch = useDispatch()
const lottieRef = useRef()
   const[refreshing, setRefreshing]= useState(false)
   const onRefresh = useCallback(() => {
       setRefreshing(true)
       wait(2000).then(() => setRefreshing(false))
   })
    const[appointment,setAppointment] = useState([])
    const [images,setImages] = useState([])
    const[time,setTime]= useState([])
    const[doctor,setDoctor] = useState([])
    const[type,setType] = useState([])
    const [loading,setLoading] = useState(false)
const[condensed, setCondensed] = useState()
    const {user,uid,appt,types} = useSelector(state => state.userReducer)
    useEffect( () => {
         setLoading(true)
        lottieRef.current?.play()

        setTimeout(async () => {
   
        const data = await getAppointment(user)
   console.log(data)
       
    setAppointment(data.data().temp)

      setLoading(false)
  dispatch(setBookAppointment(false))  
        }, 200)
       
    },[appt])
const nav= useNavigation()
console.log(appt)

let final = appointment.map((appt, index) => (
    {
        appt:(new Date(appt.date).getDate()), time: appt.time, doctor:  appt.doctor, types:appt.type, images:appt.images,id:index,day:(new Date(appt.date).toLocaleString('default', {weekday:'short'})), month:(new Date(appt.date).toLocaleString('default', { month: 'long'}))
    }
))

const action = () => {

        Alert.alert('Are you sure u want to delete',
          [
              {
                  text:'Cancel',
                  onPress: () => console.log('Proceed'),
                  style:'cancel'
              },
              {
                text:'Proceed',
                onPress: () => console.log('Proceed'),
           
            }
          ]
    )
}
const renderRightActions = (progress,id) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: 'center',
          justifyContent: 'center',
          width: 70,
        }}>
      <TouchableHighlight style={styles.delete} onPress={async () => {
          const deletedDate = appointment[id]
          const deletedTime = time[id]
          const deletedDoctor = doctor[id]
          const deletedType = type[id]
          console.log(appointment[0])
          try {
             
            await deleteAppointment(user, {deletedType,deletedDate,deletedDoctor, deletedTime})
            console.log('Successfuly deleted item')
        } catch (error) {
              
          }
      }}>
          <Ionicons name='trash-outline' size={32} />
      </TouchableHighlight>
      </View>
    );
  };
    return(
        <View style={styles.div}>
           
            <View>
              <TouchableOpacity
            onPress={() => {
                      navigation.dispatch(DrawerActions.openDrawer());
                    }}
                    style={{ alignSelf:'flex-start',marginLeft:20, top:60 }}
                    
                    >
                    <Ionicons name='menu-outline' size={40} color={'black'} />
                  </TouchableOpacity>
                <Ionicons name='timer-outline' size={32} color={'grey'}  style={{top:30, alignSelf:'flex-end',marginRight:20 }}/>
                <Text style={{  fontSize:34, fontWeight:'600',marginLeft:20,marginTop:35, marginBottom:40,paddingTop:20}}>Appointments</Text>
            </View>
            <ScrollView
            refreshControl={
                <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
            }
            
            >

                 
  {appt ? (
    <View style={{justifyContent:'center', alignItems:'center'}}>
    <LottieView source={require('../assets/197-glow-loading.json')}  ref={lottieRef}     style={{
width:'100%',height:400
        
      }}  />
   
</View>
  ): 
  
  
  
  
  (appointment.length === 0 ? (
    <View style={{justifyContent:'center',}}>

    <TouchableOpacity onPress={() => nav.navigate('Choose a field')} style={{ }}>
      <Text style={{fontSize:20, fontWeight:'500', justifyContent:'center',marginTop:10, marginHorizontal:20}}>Whoops! You have not made any appointments yet...</Text>  
    </TouchableOpacity>
    
    
    
    </View>
  ) : final.map((i,index) => 
<Swipeable
 renderRightActions={(progress,id) =>
    renderRightActions(progress, i.id)
  }
>
             <View style={styles.card} >
        
    <Text style={{fontSize:18, fontWeight:'600',color:'rgb(0,128,128)', letterSpacing:2, }}>{i.day} <Text style={{fontWeight:'600', fontSize:18}}>{i.month} {i.appt},</Text> {i.time}</Text>
     <TouchableOpacity onPress={() => nav.navigate('TeleConsult')} style={{width:'100%', marginTop:10, backgroundColor:'white', borderWdith:1, borderColor:'transparent', borderRadius:10, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
padding:20

}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
           <Image source={{uri:i.images}} style={{width:60, height:60, borderRadius:30,}} />
           <View style={{marginLeft:30, justifyContent:'space-between'}}>
               <Text style={{marginBottom:10, fontSize:20,fontWeight:'700'}}>{i.doctor}</Text>
               <Text style={{fontWeight:'200', fontSize:17}}>{i.types}</Text>
           </View>
           <Ionicons name='chatbox-outline' size={32} style={{alignSelf:'center', position:'absolute', right:0,color:'rgb(72,209,204)'}}/>
        </View>
    
    </TouchableOpacity>
  </View>
</Swipeable>
        )
     

  )}
  </ScrollView>
</View>
    )
}
const Stack = createStackNavigator()
 export const AppointmentStack = () => {
return(
    <Stack.Navigator>
        <Stack.Screen name='Appointment Main'  options={{headerShown:false,
        
        }}  component={Appointments} />
        <Stack.Screen name='TeleConsult'   component={TeleConsult} />
    </Stack.Navigator>
)
}


export const History = () => {
    return(
        <View>
            <Text>History</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    div : {
        flex:1,
        backgroundColor:'white'
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
    },
    card:{
       

        padding:20,
 
        

    
      
    },
    pending:{
        alignSelf:'flex-end',
        borderWidth:1,
        padding:10,
        borderRadius:15,


    },
    delete:{
        backgroundColor:'red',
       height:'83%',
        marginVertical:15,
        width:'100%',
        padding:20,
        alignSelf:'center',
        justifyContent:'center'
 
    },
    text:{
        fontSize:24,
        padding:10,
    }
})
