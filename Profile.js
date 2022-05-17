import React, {useState} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity,SafeAreaView,Image, Dimensions } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { NavigationContainer, useNavigation,DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "firebase/auth"
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUID } from '../redux/actions';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'
const auth = getAuth()

export default function Profile() {
    const {name,uid, country, POR, username} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    return(
      <View style={styles.div}>
            <LinearGradient 

colors ={['#87CF8E', '#B8CF87']}
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
<Text style={styles.bodyHeader}>Hello {username}</Text>
</LinearGradient>
  <TouchableOpacity onPress={async() => {
      await signOut(auth)
      console.log('Successfull sign out')
      nav.navigate('Welcome Page')
  }}
  style={{ paddingHorizontal:30,  alignItems:'center',  height:70, flexDirection:'row',borderWidth:1, marginHorizontal:20, borderRadius:15,  width:'90%' }}
  
  >
      <Text style={{alignSelf:'center', marginLeft:'35%'}}>Sign Out</Text>
      <Ionicons name='log-out-outline' size={28} style={{marginLeft:20}}/>
  </TouchableOpacity>
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
  
    header:{
  
   alignContent:'center',
       textAlign:'center',
        width:'100%',
        height: 140,
        borderBottomColor:'#F5F5F5',
        borderBottomWidth:1,
        alignSelf:'center',
        justifyContent:'center'
    },
    body:{
        flex:1,
    
       

 
      
    },
    bodyHeader:{

       fontSize:24,
       alignSelf:'center',
       justifyContent:'center',
        alignItems:'center',
       paddingVertical:70
    },
categoryContainer:{
    flex:1,
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    marginTop:125,
 
},
categoryIcon:{
    borderWidth:0,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    width:70,
    height:70,
    backgroundColor:'#fdeae7',
    borderRadius:50
},
CategoryBtn:{
    flex:1,
    width:'30%',
    marginHorizontal:0,
    alignItems:'center'
},
btnText:{
    marginTop:5,
    color:'#de4f35',
    alignSelf:'center'
},
doctor:{
    flex:1,
    width:'90%',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'60%',
    left:'5%'

},
doctorBtn:{
    borderWidth:1,
    width:'100%',
    height:80,
    borderRadius:15,
    flexDirection:'row',
    shadowColor:'#999',
    shadowOffset:{width:0, height:1},
    shadowOpacity:0.8,
    shadowRadius:2,
    elevation:5,
    marginVertical:10,
  alignContent:'center'
}

})

export const ProfileStack = ({navigation}) => {
    const {name,uid, country, POR, username} = useSelector(state => state.userReducer)
    const nav = useNavigation()
    return(
        <View style={styles.div}>
            <View style={{borderBottomWidth:1, borderBottomColor:'rgba(220,220,220,0.3)' , paddingBottom:30,marginLeft:20, marginRight:20 }}>
            <TouchableOpacity
            onPress={() => {
                      navigation.dispatch(DrawerActions.openDrawer());
                    }}
                    style={{ alignSelf:'flex-start', top:60 }}
                    
                    >
                    <Ionicons name='menu-outline' size={40} color={'black'} />
                  </TouchableOpacity>
                <Image source={{uri:'https://img.freepik.com/free-vector/medical-logo-vector_23987-193.jpg?w=826'}} style={{height:60, width:60, borderRadius:25, alignSelf:'center',top:10,marginLeft:10}} />
   
            </View>
            <View style={{flexDirection:'row', paddingVertical:30, marginHorizontal:20, alignItems:'center',borderBottomWidth:1, borderBottomColor:'rgba(220,220,220,0.3)'}}>
                
                <Image source={{uri:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}} style={{width:50, height:50, borderRadius:25}} />
                <View style={{marginLeft:20, justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'300', fontSize:16}}>Welcome</Text>
                
                    <Text style={{fontWeight:'700', fontSize:18}}>Jeremy</Text>
                </View>
                
                    <Ionicons name='log-out-outline' size={32} style={{position:'absolute', right:0,}} onPress={async () => {
                        await signOut(auth)
                        nav.navigate('Welcome Page')
                    }}/>
           
                </View>
           
              <View style={{paddingVertical:40, marginHorizontal:20, justifyContent:'space-around'}}>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:50}}>
                      <Feather name='user' size={24} />
                      <Text style={{marginLeft:20, fontSize:20, fontWeight:'600'}}>Profile</Text>
                      <Ionicons name='chevron-forward-outline'size={24}  style={{position:'absolute', right:40,}} color={'grey'} />
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:50}}>
                    <Ionicons name='card-outline' size={24}/>
                      <Text style={{marginLeft:20, fontSize:20, fontWeight:'600'}}>Payment Gateway</Text>
                      <Ionicons name='chevron-forward-outline'size={24}  style={{position:'absolute', right:40,}} color={'grey'} />
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:50}}>
                  <Ionicons name='wifi' size={23}/>
                      <Text style={{marginLeft:20, fontSize:20, fontWeight:'600'}}>Test Connection</Text>
                      <Ionicons name='chevron-forward-outline'size={24}  style={{position:'absolute', right:40,}} color={'grey'} />
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:50}}>
                  <Ionicons name='settings-outline' size={24}/>
                      <Text style={{marginLeft:20, fontSize:20, fontWeight:'600'}}>Settings</Text>
                      <Ionicons name='chevron-forward-outline'size={24}  style={{position:'absolute', right:40,}} color={'grey'} />
                  </View>
                  <TouchableOpacity style={{borderWidth:1,padding:30, backgroundColor:'rgba(67,179,174,0.1)', borderRadius:20, borderColor:'transparent'}}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Ionicons name='headset' size={36} color={'rgba(67,179,174,1)'}/>
                      <Text style={{marginLeft:25, fontWeight:'600',fontSize:20, color:'rgb(0,73,83)'}}>How can we help you?</Text>
                 
                </View>
                  </TouchableOpacity>


              </View>
                    <View style={{marginHorizontal:20, flexDirection:'row', alignItems:'center', alignContent:'center', }}>
                        <View style={{flexDirection:'row', alignItems:'center', marginRight:30}}>
                            <Text style={{fontSize:14, fontWeight:'600'}}>Privacy Policy</Text>
                            <Ionicons name='chevron-forward-outline'size={20}  style={{marginLeft:5}} color={'grey'} />
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center',marginRight:30}}>
                            <Text style={{fontSize:14, fontWeight:'600'}}>Imprint</Text>
                            <Ionicons name='chevron-forward-outline'size={20}  style={{marginLeft:5}} color={'grey'} />
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center',marginRight:20}}>
                            <Text style={{fontSize:14, fontWeight:'600'}}>English</Text>
                            <Ionicons name='chevron-forward-outline'size={20}  style={{marginLeft:5}} color={'grey'} />
                        </View>
                    </View>
        </View>
    )
}
//set gender and username after welcome