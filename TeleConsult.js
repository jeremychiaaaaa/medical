import React, {useState, useEffect} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity,Image,ScrollView, SafeAreaView, StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Documents from './Documents'
import Appointments from './Appointments'
import Profile from './Profile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Post from './Post'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackRouter } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import {io} from 'socket.io-client' //client-side

import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUID } from '../redux/actions';
import { Camera } from 'expo-camera'
import FontAwesome from 'react-native-vector-icons/FontAwesome'



let socket
let menuIcons = [
    {
        id:1,
        name:'microphone',
        title:'Mute',
       
    },
    {
        id:2,
        name:'video-camera',
        title:'Stop Video',
      
    },
    {
        id:3,
        name:'upload',
        title:'Share Content',
       
    },
    {
        id:4,
        name:'group',
        title:'Participants',

    },

]

export default function TeleConsult(){
    const {user} = useSelector(state => state.userReducer)
    const email = user.user.email
    const[name,setName] = useState()
    const [roomId, setRoomId] = useState()
    const [activeUsers, setActiveUsers] = useState([ 'gx', 'ahneh', 'zac'])
    const [startCamera, setStartCamera] = useState(false)
    const startCallCamera = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        if(status === 'granted'){
            setStartCamera(true)
        } else {
            Alert.alert('Need Camera to call !')
        }
    }
    const joinRoom = () => {
        startCallCamera()
        socket.emit('join-room', {roomId: roomId, userName: name}) 
        
    }
    useEffect(() => {
  
      socket = io('https://2afd-42-61-222-117.ap.ngrok.io') //backend using ngrok 
        socket.on('connection', () => console.log('connected')) 
        socket.on('all-users', users => {
            console.log('Active Users')
            console.log(users)
   
            setActiveUsers(users)
        })
    })
    return(
        <View style={styles.container}>
            {startCamera ? (
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.activeUsersContainer}>
                    <View style={styles.cameraContainer}>
                        <Camera
              type={'front'}
              style={{width: activeUsers.length <= 1 ? '100%' : 200, height: activeUsers.length <= 1 ? 600 : 200}}
              >

              </Camera>
              {activeUsers.filter(user => {user.userName != name}).map((user,index) => 
              <View key={index} style={styles.activeUserContainer}>
                 <Text style={{color:'white'}}>{user.userName}</Text>
                 
                 
                 
                  </View>
                  
                  
                  
                  )}
                    </View>
              </View>
              <View style={styles.menu}>
         
                  
                  
                           <TouchableOpacity
                style={styles.tile}
                >
                     <FontAwesome name={'microphone'} size={24} color={'white'}></FontAwesome>
                       <Text style={styles.textTile}>Mute</Text>
                  
                </TouchableOpacity>
            
                  
                <TouchableOpacity
                style={styles.tile}
                >
                     <FontAwesome name={'video-camera'} size={24} color={'white'}></FontAwesome>
                       <Text style={styles.textTile}>Stop Video</Text>
                  
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.tile}
                >
                     <FontAwesome name={'upload'} size={24} color={'white'}></FontAwesome>
                       <Text style={styles.textTile}>Share Screen</Text>
                  
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.tile}
                >
                     <FontAwesome name={'group'} size={24} color={'white'}></FontAwesome>
                       <Text style={styles.textTile}>Participants</Text>
                  
                </TouchableOpacity>
               
              </View>
              </SafeAreaView>
            ) : (
                <View style={styles.container}>
                     <View style={styles.startMeetingContainer}>
                    <View style={styles.info} >
                <TextInput
                placeholder='Username'
                placeholderTextColor='#767476'
                style={styles.textInput}
                onChangeText = {val => setName(val)}
                >

                </TextInput>
                </View>
                <View style={styles.info} >
                <TextInput
                     style={styles.textInput}
                     placeholderTextColor='#767476'
                placeholder='Room ID'
                onChangeText={val => setRoomId(val)}
                >

                </TextInput>    
                </View>   
                </View>
                <TouchableOpacity style={styles.joinRoomButton} onPress={joinRoom}>
                <Text style={styles.joinRoom}>Join Room</Text>
                </TouchableOpacity>
                </View>
            )}
            
        </View>
    )
}
const styles = StyleSheet.create({
container:{
backgroundColor:'#1c1c1c',
    flex:1,
 
},
tile:{
    justifyContent:'center',
    alignItems:'center',
    height:50,
    marginTop:15,
  
},
textTile: {
  color:'white',
    marginTop:15
},
menu:{
    flexDirection:'row',
    justifyContent:'space-around'
},
cameraContainer:{

backgroundColor:'black',
justifyContent:'center',
flexDirection:'row',
flexWrap:'wrap',

},
activeUsersContainer:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black'
},
activeUserContainer:{
    borderColor:'gray',
    borderWidth:1,
    width:200,
    height:200,
    justifyContent:'center',
    alignItems:'center',
    
},
info:{
    width: '100%',
    backgroundColor:'#373538',
    borderTopWidth:1,
    borderBottomWidth:1,
    height:50,
    borderColor:'#484648',
    padding:12,
    justifyContent:'center'
},
textInput: {
    color:'white',
    fontSize:18
},
joinRoomButton:{
  borderWidth:1,
    backgroundColor:'blue',
    padding:15,
  
  
 
},
joinRoom:{
    color:'white',
    fontSize:18
}
})
