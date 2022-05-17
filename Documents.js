import React, {useState,useEffect,useCallback,useContext} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, RefreshControl, ScrollView, TouchableHighlight, StatusBar } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { setAppointments,setTravelHub } from '../redux/actions';
import { getAppointment } from '../firebase';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackRouter } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import TeleConsult from './TeleConsult';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';  
import { createTravelDocument, getTravelDocument, deleteTravelDoc } from '../firebase'; 
import * as OpenAnything from 'react-native-openanything'
import { FileObject } from './TravelHub';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
const Tab = createMaterialTopTabNavigator() 

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
export default function Documents() {
    const nav = useNavigation()
    const {user,travel} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const[clicked,setClicked] = useState(false)
    const[displayDocument,setDisplayDocument] = useState([])
    const[uploadedFileName, setUploadedFileName] = useState([])
    const[customFileNames, setCustomFileNames] = useState([])
    const[getData,setGetData] = useState(false)
    const[deleteItem, setDeleteItem] = useState()
    const[loading,setLoading] = useState(true)
    let final;
    const SimpleLottie = () => {
        return(
          <View>
            <LottieView source={require('../assets/197-glow-loading.json')}
          autoPlay
  
          
            style={{width:'100%', height:300, alignSelf:'center', justifyContent:'center'}}
            />
            <StatusBar style="auto" />
          </View>
        )
      }
     useEffect(async () => {
         try {
             setLoading(true)
              const data = await getTravelDocument(user)
         console.log(data)
        setDisplayDocument(data.data().documents)
        setUploadedFileName(data.data().documentNames)
        setCustomFileNames(data.data().customDocumentNames)
        setTimeout(() => setLoading(false),3000)
        dispatch(setTravelHub(false))
         } catch (error) {
             console.log(error.message)
         }
        
    
      
         
     
     },[travel, deleteItem])
   
 
    
     console.log(displayDocument)
     console.log(uploadedFileName)
     console.log(customFileNames)
     final = displayDocument.map((doc,index) => (
         {
            custom:customFileNames[index] ,doc, name:uploadedFileName[index], id:[index]
         }
     ))
     const[refreshing, setRefreshing]= useState(false)
     const onRefresh = useCallback(() => {
         setRefreshing(true)
         wait(4000).then(() => setRefreshing(false))
     })

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
              const deletedFileURL = displayDocument[id]
              const deletedFileName = uploadedFileName[id]
           
              try {
                 
                await deleteTravelDoc(user, {deletedFileURL, deletedFileName})
                console.log('Successfuly deleted item')
                setDeleteItem(true)
            } catch (error) {
                  
              }
          }}>
              <Ionicons name='trash-outline' size={24} style={{}}/>
          </TouchableHighlight>
          </View>
        );
      };
    return(
        
  <SafeAreaView style={{flex:1, flexDirection:'column', justifyContent:'center',backgroundColor:'white'}}>
      {loading ? <SimpleLottie /> : (
          <>
           {displayDocument.length === 0 && (
    <View style={{flex:1,justifyContent:'space-between'}}>

<TouchableOpacity onPress={() => nav.navigate('Travel Hub')} style={{ borderWidth:1, padding:20, justifyContent:'center', marginHorizontal:15, marginTop:50}}>
  <Text style={{fontSize:20, fontWeight:'500', justifyContent:'center'}}>Click to upload your documents to travel hub !</Text>  
</TouchableOpacity>



</View>
)}        
    <ScrollView
           refreshControl={
            <RefreshControl
            enabled={true}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
        }
    >
{displayDocument !== null ?
( 
    final.map((i,index) => 
<Swipeable
 renderRightActions={(progress,id) =>
    renderRightActions(progress, i.id)
  }
>
        <Text style={{padding:20,marginHorizontal:5, fontSize:26, fontWeight:'600',textDecorationLine:'underline'}}>{i.custom}</Text>
     <TouchableOpacity  onPress={() => OpenAnything.Pdf(i.doc)} style={{padding:20, justifyContent:'center',borderWidth:1, borderColor:'lightgrey', marginHorizontal:25, marginTop:20}}>
         <Text>{i.name}</Text>
     </TouchableOpacity>
    
</Swipeable>
 )
 ) : (
     <ActivityIndicator size='large' />
 )

}
</ScrollView>
          </>
      )}
       


</SafeAreaView>
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
        marginHorizontal:20,
        marginVertical:15,
        borderWidth: 1,
        width:'90%',
      
    },
    pending:{
        alignSelf:'flex-end',
        borderWidth:1,
        padding:10,
        borderRadius:15,


    },
    delete:{
        backgroundColor:'red',
   height:70,
      
        width:'100%',
        padding:20,
        alignSelf:'center',
        justifyContent:'flex-end',
        top:50,
 
    },
    text:{
        fontSize:24,
        padding:10,
    }
})
