import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, ActivityIndicator, Keyboard, Button, TextInput, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Modal, FlatList,Image     } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryPicker from 'react-native-country-picker-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { DoctorContext } from './BotoxDoctor';
import PhysicalAppointment from './PhysicalAppointment';
import { AppointmentStack } from '../../Appointments';
import { SliderBox } from 'react-native-image-slider-box';
import ProgressBar from "react-native-animated-progress";
import { LinearGradient } from 'expo-linear-gradient';
import ReadMore from '@fawazahmed/react-native-read-more';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default function DRPage() {

    const {doctor, setDoctor, fakeData, setFakeData,images,setImages, type, setType } = useContext(DoctorContext)
   const nav=useNavigation()
   console.log(images)
    const renderItem = ({item}) => {
      
        if(item.title === doctor){
            return(
                <View style={{}}>
            
                <TouchableOpacity>
                    <Item detailed={item.detailed} />

                </TouchableOpacity>
                </View>
            )
        }
    }
    return(
        <View style={{flex:1}}>
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
     <View style={{flexDirection:'column', }}>
       
         <TouchableOpacity onPress={() => nav.navigate('Botox Doctor')}>
<Ionicons name='chevron-back-outline' size={32} style={{color:'rgb(67,179,174)', padding:10,paddingVertical:5, borderRadius:15, borderWidth:1, marginLeft:25, bottom:20,backgroundColor:'rgba(176,224,230,0.7)', borderColor:'transparent', width:60, paddingHorizontal:12}}/>
</TouchableOpacity>
<View style={{flexDirection:'row'}}>
<Image   source={{uri : images}} style={{width:80, height:80, borderRadius:40,resizeMode:'cover', alignSelf:'flex-start', marginLeft:20, bottom:0}}/>
<View style={{marginLeft:40, flexDirection:'column',top:10}}>
<Text style={{fontSize:22, fontWeight:'600'}}>{doctor}</Text>
<Text style={{marginTop:5, fontWeight:'300', fontSize:18}}>Botox Doctor</Text>
</View>
</View>
<View style={{ flexDirection:'row', width:'100%',alignItems:'center' }}>
    <View>
    <Feather name='users' size={28} color={'rgb(72,209,204)'} style={{backgroundColor:'rgba(255,255,255,0.9)', width:70, paddingVertical:10, paddingHorizontal:20,marginLeft:55, justifyContent:'center', alignContent:'center', top:20, zIndex:3, borderWidth:1, borderRadius:10,overflow:'hidden', borderColor:'rgba(244,240,236,0.1)'}}/>
    <TouchableOpacity style={{borderwidth:1, backgroundColor:'rgba(231,254,255,0.5)', width:100, marginLeft:40, height:80, borderRadius:10, }}>
        <View style={{justifyContent:'center', marginTop:20}}>
       <Text style={{alignSelf:'center',marginTop:5, fontSize:20, fontWeight:'700' }}>1600+</Text>
       <Text style={{alignSelf:'center', marginTop:5, fontWeight:'300'}}>Patients</Text>
    </View>
    </TouchableOpacity>
  </View>
  <View>
  <Ionicons name='medkit-outline' size={28} color={'rgb(72,209,204)'} style={{backgroundColor:'rgba(255,255,255,0.9)', width:70, paddingVertical:10, paddingHorizontal:20,marginLeft:35, justifyContent:'center', alignContent:'center', top:20, zIndex:3, borderWidth:1, borderRadius:10,overflow:'hidden', borderColor:'rgba(244,240,236,0.1)'}}/>
    <TouchableOpacity style={{borderwidth:1, backgroundColor:'rgba(231,254,255,0.5)', width:100, marginLeft:20, height:80, borderRadius:10, }}>
        <View style={{justifyContent:'center', marginTop:20}}>
       <Text style={{alignSelf:'center',marginTop:5, fontSize:20, fontWeight:'700' }}>8</Text>
       <Text style={{alignSelf:'center', marginTop:5, fontWeight:'300'}}>Years</Text>
    </View>
    </TouchableOpacity>
  </View>
  <View>
  <Ionicons name='business-outline' size={28} color={'rgb(72,209,204)'} style={{backgroundColor:'rgba(255,255,255,0.9)', width:70, paddingVertical:10, paddingHorizontal:20,marginLeft:35, justifyContent:'center', alignContent:'center', top:20, zIndex:3, borderWidth:1, borderRadius:10,overflow:'hidden', borderColor:'rgba(244,240,236,0.1)'}}/>
    <TouchableOpacity style={{borderwidth:1, backgroundColor:'rgba(231,254,255,0.5)', width:100, marginHorizontal:20, height:80, borderRadius:10, }}>
        <View style={{justifyContent:'center', marginTop:20}}>
       <Text style={{alignSelf:'center',marginTop:5, fontSize:20, fontWeight:'700' }}>MOUNT A</Text>
       <Text style={{alignSelf:'center', marginTop:5, fontWeight:'300'}}>Hospital</Text>
    </View>
    </TouchableOpacity>
  </View>
</View>

<View>

</View>
</View>


</LinearGradient>
<View style={{borderWidth:1, borderTopLeftRadius:60, borderTopRightRadius:60, borderColor:'transparent',backgroundColor:'white', height:'100%', transform:[{translateY: -30}]}}>
       
          <View style={styles.list__container}>
            <FlatList 
            data={fakeData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
 <View style={{position:'absolute',top:180}}>
        <TouchableOpacity style={{borderWidth:1, marginLeft:20,borderRadius:10,marginVertical:10, backgroundColor:'white', shadowColor: "#000",
shadowOffset:{
width: 0,
height: 2,
},
shadowOpacity: 0.23,

shadowRadius: 2.62,
elevation: 4,
borderColor:'transparent',
flexDirection:'row',
alignItems:'center',
width:'90%'
}}  onPress={() => {
            nav.navigate('TeleConsult')
            setType('Tele-Consult')
            }}>
           
            <Ionicons name='cellular' size={28} style={{color:'rgba(67,179,174,1)', transform:[{translateX:5}]}} />
       <Text style={styles.button}>Book TeleConsultation with {doctor} now!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:1, marginLeft:20,borderRadius:10,marginVertical:10, backgroundColor:'white', shadowColor: "#000",
shadowOffset:{
width: 0,
height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,
elevation: 4,
flexDirection:'row',
alignItems:'center',
width:'90%',
borderColor:'transparent' }} onPress={() => {
            nav.navigate('Physical Appointment')
            setType('Physical Appointment')
            }}>
               <Ionicons name='business' size={28} style={{color:'rgb(209,159,232)', transform:[{translateX:5}]}} />
            <Text style={styles.button}>Book Physical Appointment with {doctor} now!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:1, marginLeft:20,borderRadius:10, marginVertical:10,  backgroundColor:'white', shadowColor: "#000",
shadowOffset:{
width: 0,
height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,
elevation: 4,
flexDirection:'row',
alignItems:'center',
width:'90%',
borderColor:'transparent'}} >
   <Ionicons name='cloud-upload' size={28} style={{color:'rgb(95,158,160)', transform:[{translateX:5}]}} />
            <Text style={styles.button}>Upload documents(prior to appointment)</Text>
        </TouchableOpacity>
       
  </View>
</View>
        </View>
    </View>
    )
}
const Item = ({title,detailed, image2, image, image3}) => {
   
  
    return(
        <View style={styles.item}>
        
        <Text style={styles.title}>About Doctor</Text>
        
        <ReadMore numberOfLines={4} style={styles.details} seeMoreStyle={{fontSize:18, color:'rgb(72,209,204)'}} seeLessStyle={{fontSize:18, color:'rgb(72,209,204)'}}>
          {
       detailed
          }
        </ReadMore>
    </View>
    )
   
}

const styles = StyleSheet.create({
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",

      },
      title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 5,

      
    padding:10,
    textDecorationLine:'underline'
      },
       
    header:{
      
      
       
        alignContent:'center',
            textAlign:'center',
             width:'100%',
             height: HEIGHT * 0.45,
             borderBottomColor:'#F5F5F5',
             borderBottomWidth:1,
             alignSelf:'center',
             justifyContent:'center'
            
         },
      list__container: {
       backgroundColor:'transparent',
        height: "85%",
        width: "100%",
      },
      imageContainer:{
        
        width: WIDTH,
        height: HEIGHT * 0.25,
      
        
      },
      image: {
        width:100,
        height:100,
        borderRadius:50
    },
    button:{
       
      
        padding:10,
        fontSize:18,
      fontWeight:'600',
        margin:10,
      
    },
    details: {
        fontSize:18,
       
    }


})