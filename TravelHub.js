import React, {useState, useEffect, useContext,useCallback,useRef} from 'react'
import { StyleSheet,Modal, Button, TextInput, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity,Image,ScrollView, SafeAreaView, StatusBar, ActivityIndicator, RefreshControl } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Documents from './Documents'
import {AppointmentStack} from './Appointments'
import Profile from './Profile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Post from './Post'
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
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
import { setUser, setUID, setCountry, setPOR, setUsername,setDoc,setTravelHub,setUserDoc} from '../redux/actions';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';   
import { doc, getFirestore, getDoc, collection,  } from 'firebase/firestore';
import * as OpenAnything from 'react-native-openanything'
import { useFocusEffect } from '@react-navigation/native';
import { createTravelDocument, getTravelDocument } from '../firebase';
import UploadDocument from './UploadDocument'
import { number } from 'yup'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LottieView from 'lottie-react-native';
const Tab = createMaterialTopTabNavigator() 
export const FileObject = React.createContext()
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }  
    const storage = getStorage()
    const storageRef = ref(storage)
export default function TravelHub() {
    const [modalVisible, setModalVisible] = useState(false);
    const[refreshing, setRefreshing]= useState(false)
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        wait(2000).then(() => setRefreshing(false))
    })

   const[fileObject, setFileObject] = useState()
   const {fileName,setFileName,fileURL,setFileURL, clicked, setClicked } = useContext(FileObject)
   
    const[choose,setChoose] = useState(false)
    const[uploaded, setUploaded] = useState(false)
    const[spinner, setSpinner] = useState(false)
    const nav = useNavigation()
    const {user,doc} = useSelector(state => state.userReducer)
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

const metadata = {
    contentType: 'application/pdf'
}
const uploadFile = async () => {
 setSpinner(true)
    const fileRef = ref(storageRef, fileName)
  await uploadBytes(fileRef, fileObject,metadata)
        
          console.log('Success upload')
        setSpinner(false)
          setUploaded(true)

    setFileURL(await getDownloadURL(fileRef))
    console.log('Added URL')
}

const downloadFile = async () => {
 
  
      
      
       
        try{
            await  createTravelDocument(user, {fileURL,fileName}) 
     console.log('Created Document')
        nav.navigate('Documents')
        } catch(err){
            console.log(err.message)
        }
      
  
}

    return(
        <View style={{flex:1, flexDirection:'column'}}>
          <TouchableOpacity style={{ paddingHorizontal:30, alignItems:'center',  height:100, flexDirection:'row',borderWidth:1, marginHorizontal:20, marginTop:15, borderRadius:15 }}
          onPress={selectOneFile}
          >
              <Text style={{fontSize:30, alignSelf:'center', padding:20 }}>Upload Document</Text>
              </TouchableOpacity>
              {choose && (
                 <TouchableOpacity onPress={() => OpenAnything.Pdf(i)}  style={{padding:20, justifyContent:'center',borderWidth:1, borderColor:'lightgrey', marginHorizontal:25, marginTop:20}}>
                 <Text>{fileName}</Text>
             </TouchableOpacity>
              )}
       {choose && (
       
           <TouchableOpacity style={{ paddingHorizontal:30,  alignItems:'center',  height:100, flexDirection:'row',borderWidth:1, marginHorizontal:20, marginTop:15, borderRadius:15 }}
          onPress={uploadFile}
          >
              <Text style={{fontSize:30, alignSelf:'center', padding:20 }}>Confirm</Text>
              </TouchableOpacity>
       )}     
    {spinner && (
         <ActivityIndicator size="large" />
    )

    }
           {uploaded && (
       
           <TouchableOpacity style={{ paddingHorizontal:30,  alignItems:'center',  height:100, flexDirection:'row',borderWidth:1, marginHorizontal:20, marginTop:15, borderRadius:15 }}
          onPress={downloadFile}
          >
              <Text style={{fontSize:30, alignSelf:'center', padding:20 }}>View Document</Text>
              </TouchableOpacity>
       )}     
       
        </View>
    )
}


const Stack= createStackNavigator()
export const TravelStack = () => {
    const[fileName,setFileName] = useState('')
    const[fileURL, setFileURL] = useState('')
    const[numberOfDocument1, setNumberOfDocument1] = useState(0)
    const[clicked,setClicked] = useState()
    const[name,setName] = useState('')
    return(
        <FileObject.Provider value={{fileName,setFileName,fileURL, setFileURL, setNumberOfDocument1,numberOfDocument1, clicked, setClicked,name,setName}} >
        <Stack.Navigator>
            <Stack.Screen name='Travel Hub Home' options={({navigation}) => ({
        
        title:'',
        headerStyle:{
          backgroundColor:'#fff',
          height:120,
        
        },
        headerShown:false,
             headerBackTitleVisible:false,
           headerBackTitleStyle:{opacity:0},
            headerRight: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.dispatch(DrawerActions.openDrawer());
                    }}>
                    <Ionicons name='menu-outline' size={30} color={'black'} />
                  </TouchableOpacity>
                );
              },
          
          })}  component={TravelHubLandingPage} />
           <Stack.Screen name='Upload File Page' options={({navigation}) => ({
        
        title:'Documents',
        headerStyle:{
          backgroundColor:'#fff',
          height:120
        },
             headerBackTitleVisible:false,
            headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'}/>,
            headerRight: () => {
                return (
                  <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                  }}>
                  <Ionicons name='menu-outline' size={30} color={'black'} />
                </TouchableOpacity>
                );
              },
          
          })}  component={UploadDocument} />
           
            <Stack.Screen name='Upload Documents'  options={{headerShown:false}} component={TravelHub} />
            <Stack.Screen name ='Documents' options={({navigation}) => ({
        
        title:'View Documents',
        headerStyle:{
          backgroundColor:'#fff',
          height:120
        },
             headerBackTitleVisible:false,
            headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'}/>,
            headerRight: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.dispatch(DrawerActions.openDrawer());
                    }}>
                    <Ionicons name='menu-outline' size={30} color={'black'} />
                  </TouchableOpacity>
                );
              },
          
          })}  component={Documents} />
        </Stack.Navigator>
        </FileObject.Provider>
    )
}

export const TravelHubLandingPage = ({navigation}) => {
    const nav=useNavigation()
    const {user,doc,travel,d} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const lottieRef = useRef()
    const[displayDocument,setDisplayDocument] = useState([])
    const[uploadedFileName, setUploadedFileName] = useState([])

    useEffect( () => {
       setLoading(true)
            lottieRef.current?.play()
       setTimeout(async() => {
           const data = await getTravelDocument(user)
        console.log(data)
       
    
       setDisplayDocument(data.data().documents)
       setUploadedFileName(data.data().documentNames)
       dispatch(setUserDoc(false))
       setLoading(false)
       },2500)
             
           
       
     
     
        
    
    },[d])
    const SimpleLottie = () => {
      return(
       
          <LottieView source={require('../assets/197-glow-loading.json')}
        ref={lottieRef}

        
          style={{width:'100%', height:400,
          justifyContent:'center',
          alignSelf:'center', top:40}}
          />
         
      )
    }
    console.log(uploadedFileName)
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            {loading ? <SimpleLottie/> : (
              <>
 <View style={{ padding:20}}>
 <TouchableOpacity
                    onPress={() => {
                      navigation.dispatch(DrawerActions.openDrawer());
                    }}
                    style={{alignSelf:'flex-end'}}
                    
                    >
                    <Ionicons name='menu-outline' size={30} color={'black'} />
                  </TouchableOpacity>
 <Text style={{fontSize:35, marginBottom:20, fontWeight:'700',}}>Travel Hub</Text>
 <Text style={{fontSize:20, fontWeight:'300', bottom:20}}>All your travel documents in one hub!</Text>
</View>
<ScrollView>
 <View style={{ justifyContent:'center', marginBottom:10}}>
     <TouchableOpacity style={{ padding:20, width:'90%', height:100, borderWidth:1, marginHorizontal:20, marginBottom:20, borderRadius:10, borderColor:'transparent', backgroundColor:'white',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,}}
   onPress={
       () => {
           nav.navigate('Documents')
        dispatch(setTravelHub(true))
       }
   }
     >
       
       
         
       
     <Text style={{fontSize:24, fontWeight:'500',}}>PCR Test Results</Text>

 <TouchableOpacity style={{}}>

{uploadedFileName.length <= 1 ? (
      <Text style={{ fontSize:16, marginTop:10,fontWeight:'200'}}>You have {uploadedFileName.length} document</Text>
) : 
<Text style={{ fontSize:16, marginTop:10}}>You have {uploadedFileName.length} documents</Text>
}
 </TouchableOpacity>

      <Ionicons name='add-circle-outline' size={40} style={{alignSelf:'flex-end', bottom:45, color:'rgb(72,209,204)'}} onPress={() => {
         nav.navigate('Upload File Page') 
         dispatch(setDoc('PCR Test Results'))
     }}/>
     </TouchableOpacity>
 </View>
 <View style={{justifyContent:'center', marginBottom:10}}>
     <TouchableOpacity style={{ padding:20, width:'90%', height:100, borderWidth:1, marginHorizontal:20, marginBottom:20, borderRadius:10, borderColor:'transparent', borderRadius:10, borderColor:'transparent', backgroundColor:'white',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,}}>
       
       
         
       
     <Text style={{fontSize:24, fontWeight:'500',}}>Flight Tickets</Text>
     <Text style={{ fontSize:16, marginTop:10, fontWeight:'200'}}>No documents added</Text>
      <Ionicons name='add-circle-outline' size={40} style={{alignSelf:'flex-end', bottom:45, color:'rgb(72,209,204)'}}/>
     </TouchableOpacity>
 </View>
 <View style={{ justifyContent:'center', marginBottom:10}}>
     <TouchableOpacity style={{ padding:20, width:'90%', height:100, borderWidth:1, marginHorizontal:20, marginBottom:20, borderRadius:10, borderColor:'transparent', borderRadius:10, borderColor:'transparent', backgroundColor:'white',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,}}>
       
       
         
       
     <Text style={{fontSize:24, fontWeight:'500',}}>Visa</Text>
     <Text style={{ fontSize:16, marginTop:10, fontWeight:'200'}}>No documents added</Text>
      <Ionicons name='add-circle-outline' size={40} style={{alignSelf:'flex-end', bottom:45, color:'rgb(72,209,204)'}}/>
     </TouchableOpacity>
 </View>
 <View style={{ justifyContent:'center', marginBottom:10}}>
     <TouchableOpacity style={{ padding:20, width:'90%', height:100, borderWidth:1, marginHorizontal:20, marginBottom:20, borderRadius:20, borderColor:'lightgrey'}}>
       
       
         
       
     <Text style={{fontSize:24, fontWeight:'500',}}>Vaccine Certificate</Text>
     <Text style={{fontSize:16, marginTop:10, fontWeight:'200'}}>No documents added</Text>
      <Ionicons name='add-circle-outline' size={40} style={{alignSelf:'flex-end', bottom:45, color:'rgb(72,209,204)'}}/>
     </TouchableOpacity>
 </View>
 <View style={{ justifyContent:'center', marginBottom:10}}>
     <TouchableOpacity style={{ padding:20, width:'90%', height:100, borderWidth:1, marginHorizontal:20, marginBottom:20, borderRadius:10, borderColor:'transparent', borderRadius:10, borderColor:'transparent', backgroundColor:'white',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,}}>
       
       
         
       
     <Text style={{fontSize:24, fontWeight:'500',}}>Hotel Documents</Text>
     <Text style={{ fontSize:16, marginTop:10, fontWeight:'200'}}>No documents added</Text>
      <Ionicons name='add-circle-outline' size={40} style={{alignSelf:'flex-end',bottom:45, color:'rgb(72,209,204)'}}/>
     </TouchableOpacity>
 </View>
 <View style={{ justifyContent:'center', marginBottom:10}}>
     <TouchableOpacity style={{ padding:20, width:'90%', height:100, borderWidth:1, marginHorizontal:20, marginBottom:20, borderRadius:10, borderColor:'transparent', borderRadius:10, borderColor:'transparent', backgroundColor:'white',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,}}>
       
       
         
       
     <Text style={{fontSize:24, fontWeight:'500',}}>Other Documents</Text>
     <Text style={{ fontSize:16, marginTop:10, fontWeight:'200'}}>No documents added</Text>
      <Ionicons name='add-circle-outline' size={40} style={{alignSelf:'flex-end', bottom:45, color:'rgb(72,209,204)'}}/>
     </TouchableOpacity>
 </View>
 </ScrollView>
 </>
            )}
           
        </SafeAreaView>
    )
}