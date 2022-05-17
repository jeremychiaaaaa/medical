import React, {useState, useEffect, useContext,useCallback} from 'react'
import { StyleSheet,Modal, Button, TextInput, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity,Image,ScrollView, SafeAreaView, StatusBar, ActivityIndicator, RefreshControl,Pressable } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Documents from './Documents'
import {AppointmentStack} from './Appointments'
import Profile from './Profile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Post from './Post'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackRouter } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import PostOne from './PostOne'
import AestheticStack from './Aesthetic/Aesthetic'
import ElectiveSurgeryStack from './ElectiveSurgery/ElectiveSurgery'
import CriticalIllnessStack from './CriticalIllness/CriticalIllness'
import { CustomDrawer } from './CustomDrawer'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUID, setCountry, setPOR, setUsername,setUserDoc} from '../redux/actions';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';   
import { doc, getFirestore, getDoc, collection, setDoc } from 'firebase/firestore';
import * as OpenAnything from 'react-native-openanything'
import { useFocusEffect } from '@react-navigation/native';
import { createTravelDocument, getTravelDocument } from '../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FileObject } from './TravelHub'
import Entypo from 'react-native-vector-icons/Entypo'

const storage = getStorage()
const storageRef = ref(storage)
export default function UploadDocument() {
    const[modalVisible, setModalVisible] = useState(false)
    const[clicked,setClicked] = useState(false)
    const switchClicked = () => setOpenDate(true)
    const [openDate,setOpenDate] = useState(false)
    const[remove,setRemove] = useState(false)
    const[spinner, setSpinner] = useState(false)
    const {user,doc} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const[fileObject, setFileObject] = useState()
    const {fileName,setFileName,fileURL,setFileURL,numberOfDocument1, setNumberOfDocument1,name,setName } = useContext(FileObject)
    const metadata = {
        contentType: 'application/pdf'
    }
    const [mode,setMode] = useState('date')
     const[choose,setChoose] = useState(false)
     const[uploaded, setUploaded] = useState(false)
    const[selectedDate, setSelectedDate] = useState(new Date())
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

const dateChange = (event,date) => {
  const select = date
  setSelectedDate(select)
    }
    const nav = useNavigation()
const downloadFile = async () => {
 
  

       
        try{
            await  createTravelDocument(user, {fileURL,fileName,name}) 
     console.log('Created Document')
        nav.navigate('Travel Hub Home')
      dispatch(setUserDoc(true))
        } catch(err){
            console.log(err.message)
        }
      
  
}
    const selectOneFile = async () => {
       
        try {
           let  res = await DocumentPicker.getDocumentAsync({
               type:'application/pdf'
           })
           console.log(res)
           const response = await fetch(res.uri)
           let blob = await response.blob()
        setFileName(res.name)
        setFileObject(blob)
           setChoose(true)
             console.log('res : ' + JSON.stringify(res));
           console.log('URI : ' + res.uri);
           console.log('Type : ' + res.type);
            
       console.log(fileName) 
           console.log('File Size : ' + res.size);
   
         
        } catch (error) {
           console.log(error.message)
       }
          
   }

   const uploadFile = async () => {
    setSpinner(true)
       const fileRef = ref(storageRef, fileName)
     await uploadBytes(fileRef, fileObject,metadata)
           
             console.log('Success upload')
           setSpinner(false)
             setUploaded(true)
   
       setFileURL(await getDownloadURL(fileRef))
       setModalVisible(!modalVisible)
       console.log('Added URL')
   }




    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <View style={{ padding:20}}>
                 <Text  style={{fontSize:25, fontWeight:'600'}}>{doc}</Text>
            </View>
           <View >
               <Text style={{marginHorizontal:20, fontSize:20,marginTop:40,}}>Document Name</Text>
               <TextInput
               placeholder={`e.g ${doc}`}
                style={{marginTop:40, borderBottomWidth:1, borderBottomColor:'lightgrey', marginBottom:10,marginHorizontal:20, fontSize:24, paddingBottom:20}}
               onChangeText={text => setName(text)}
               placeholderTextColor='lightgrey'
               />

             
                </View>
        <View>
              
<TouchableOpacity onPress={switchClicked} style={{ padding:20,borderWidth:1, width:'90%', marginHorizontal:15,borderColor:'lightgrey',borderRadius:10, marginTop:10}}>
   
   <View style={{flexDirection:'row',alignItems:'center'}}>
   <Text style={{ fontSize:16}}> Date : {JSON.stringify(selectedDate).slice(1,11)}</Text>
  {openDate && (
    <Entypo name="cross" size={20} color="lightgrey" style={{ position:'absolute' ,right:0 }} onPress={() => {
                     setOpenDate(false)
                             }}/>
  )} 
</View>
     </TouchableOpacity>

   {openDate && (
      <DateTimePicker
  display='inline'
  value={selectedDate}
  mode={mode}
  is24Hour={true}
  onChange={dateChange}
  style={{backgroundColor:'white', marginTop:10, color:'black',}}
  themeVariant='light'
/>     
   )}      
     </View>
           
           <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginHorizontal:20, marginVertical:40}}>
          <View style={{flex:1}}>
          {!openDate && (
             <TouchableOpacity style={{borderWidth:1,width:160,height:60, justifyContent:'center', backgroundColor:'white', borderColor:'rgba(67,179,174,1)', borderRadius:0}} onPress={selectOneFile}>
                 <Text style={{fontSize:22, alignSelf:'center',color:'rgba(67,179,174,1)', fontWeight:'700'}}>Upload</Text>
             </TouchableOpacity>
          )}    
              {choose && (
                <View style={{flexDirection:'row', opacity: !choose ? 0 : 1}}>
                 <TouchableOpacity onPress={() => OpenAnything.Pdf(i)}  style={{padding:20, justifyContent:'center',borderWidth:1, borderColor:'lightgrey',marginTop:20, width:'175%'}}>
                 <Text>{fileName}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{alignSelf:'flex-end', right:25, bottom:18}} onPress={() => setChoose(false)} >
                   <Text style={{fontSize:22, fontWeight:'300'}}>X</Text>
                 </TouchableOpacity>
            
             </View>
              )}
{choose && (
       
       <TouchableOpacity style={{padding:20, justifyContent:'center',borderWidth:1, borderColor:'lightgrey',marginTop:40, width:'175%', backgroundColor:'#89CFF0', }}
      onPress={uploadFile}
      >
          <Text style={{fontSize:20, alignSelf:'center',  }}>Save</Text>
          </TouchableOpacity>
   )}     
    {spinner && (
         <ActivityIndicator size="large" style={{marginTop:40, marginLeft:160}} />
    )

    }
{uploaded && (
     <View style={styles.centeredView}>
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
         <View style={styles.modalView}>
             <Text style={{fontSize:24}}>
                 We have successfully added your document. Click to view it ! 
             </Text>
         <TouchableOpacity style={{ paddingHorizontal:30,  alignItems:'center', justifyContent:'flex-end', height:60, flexDirection:'row',borderWidth:1, marginHorizontal:20, marginTop:15, borderRadius:20 }}
          onPress={downloadFile}
          >
              <Text style={{fontSize:24, alignSelf:'center' }}>View Document</Text>
              </TouchableOpacity>
   
         </View>
       </View>
     </Modal>
     
   </View>
)}
            </View>
       {!openDate && (
         <TouchableOpacity style={{borderWidth:1,width:160,height:60, justifyContent:'center',  backgroundColor:'white', borderColor:'rgba(67,179,174,1)',  }}>
                 <Text style={{fontSize:22,   alignSelf:'center',color:'rgba(67,179,174,1)', fontWeight:'700'}}>Take Photo</Text>
             </TouchableOpacity>
       )}      
               </View>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
   backgroundColor:'white'
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
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height:350,
      justifyContent:'space-evenly',
      marginTop:30
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  