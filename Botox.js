import React, {useState, useEffect} from 'react'
import { StyleSheet, ActivityIndicator, Keyboard, Button, TextInput, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Modal, FlatList     } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryPicker from 'react-native-country-picker-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import BotoxDoctor from './Botox/BotoxDoctor';
import DysportDoctor from './Botox/DysportDoctor';
import Myobloc from './Botox/Myobloc';
import Xeomin from './Botox/Xeomin';
import ProgressBar from "react-native-animated-progress";
const Stack= createStackNavigator()
import { BotoxDoctorStack } from './Botox/BotoxDoctor';
import DRPage from './Botox/DRPage';
function Botox() {
    const nav = useNavigation()
    return(
           <View style={styles.container}>
            <ProgressBar progress={80} height={7} backgroundColor="rgb(72,209,204)" animated={false} trackColor='rgba(220,220,220,0.3)'/>
   <ScrollView>
   <View style={styles.content}>
       <TouchableOpacity style={styles.button} onPress={() => {
     
           nav.navigate('Botox Doctors')
           }}>
           <Text style={styles.name}>BOTOX</Text>
           <Text style={styles.description}>Botox injections block certain chemical signals from nerves, mostly signals that cause muscles to contract. The most common use of these injections is to temporarily relax the facial muscles that cause wrinkles in the forehead and around the eyes.</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Dysport Doctors')}>
       <Text style={styles.name}>DYSPORT</Text>
           <Text style={styles.description}>Dysport temporarily treats moderate to severe frown lines between the eyebrows by reducing specific muscle activity. Wrinkles are caused by repeated movements and muscle contractions. One injection into each of the 5 points between and above the eyebrows temporarily prevents muscle contractions that cause frown lines.</Text>
       </TouchableOpacity >
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Xeomin Doctors')}>
       <Text style={styles.name}>XEOMIN</Text>
           <Text style={styles.description}>Xeomin is a prescription medicine that is injected into muscles and used to improve the look of moderate to severe frown lines between the eyebrows (glabellar lines) in adults for a short period of time (temporary).</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Myobloc Doctors')}>
       <Text style={styles.name}>MYOBLOC</Text>
           <Text style={styles.description}>Myobloc is a prescription medicine used in adults that is injected into: muscles and used to treat the abnormal head position and neck pain that happens with cervical dystonia (CD).</Text>
       </TouchableOpacity>
   </View>
    </ScrollView>
    </View>
    )
 
}
export default function BotoxStack() {
    return(
    <Stack.Navigator>
        <Stack.Screen name='Botox Options' 
            options={({navigation}) => ({
      
                title:'Treatments',
                headerStyle:{
                  backgroundColor:'white',
                  height:100,
                
                },
                     headerBackTitleVisible:false,
                    headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'}/>,
          headerTitleStyle:{
            fontSize:21,
            
          },
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
                  })}
        component={Botox} />
        <Stack.Screen name='Botox Doctors' options={{headerShown:false}} component={BotoxDoctorStack} />
        <Stack.Screen name='Dysport Doctors'  component={DysportDoctor} />
        <Stack.Screen name='Myobloc Doctors'  component={Myobloc} />
        <Stack.Screen name='Xeomin Doctors'  component={Xeomin} />
        
    </Stack.Navigator>
    
    )
    
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'white'
    },

    headerText:{
        fontSize:20,
        fontWeight:'bold',
        top:10,
      alignSelf:'center',
     
    },
    button:{
        marginVertical:20,
        borderWidth:1,
        borderRadius:15,
        marginHorizontal:15,
        borderColor:'rgb(72,209,204)'
    },
    content:{
        flex:1,
        justifyContent:'center',
        margin:5
    },
    name:{
        padding:10,
        fontWeight:'bold',
        alignSelf:'center',
        fontSize:20
    },
    description:{
        padding:10
    }
})