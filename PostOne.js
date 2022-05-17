import React, {useState} from 'react'
import { StyleSheet, Button, TextInput, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Modal, FlatList     } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryPicker from 'react-native-country-picker-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Aesthetic from './Aesthetic/Aesthetic';

import ElectiveSurgery from './ElectiveSurgery/ElectiveSurgery';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import ProgressBar from "react-native-animated-progress";
import { useFonts } from 'expo-font';
export default function PostOne() {
    const nav = useNavigation()
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [loaded] = useFonts({
        Tapestry: require('../assets/fonts/Tapestry-Regular.ttf'),
        Abel: require('../assets/fonts/Abel-Regular.ttf')
    })
    if(!loaded){
        return null
    }
    return(
        <SafeAreaView style={styles.div}>

  <View>
  <ProgressBar progress={50} height={7} backgroundColor="rgb(72,209,204)" trackColor='rgba(220,220,220,0.3)'/>
          <Text style={{fontSize:28, marginHorizontal:25,marginTop:20}}>How can we assist you today?</Text>
        
 
          <SearchBar
  searchPhrase={searchPhrase}
  setSearchPhrase={setSearchPhrase}
  clicked={clicked}
  setClicked={setClicked}
/>
 </View>     
<Filter
            searchPhrase={searchPhrase}
            data={titles}
            setClicked={setClicked}
          />
          
        </SafeAreaView>
    )
}
const SearchBar = (props) => {
    return(
        <View style={styles.container}>
            <View
            style={!props.clicked ? styles.notClicked : styles.clicked}
            >
                <Feather
                 name="search"
                 size={20}
                 color="rgb(72,209,204)"
                 style={{ marginLeft: 1 }}
                
                
                />
                <TextInput 
                style={styles.input}
                placeholder='Search for Medical treatments'
                value={props.searchPhrase}
                onChangeText={props.setSearchPhrase}
                onFocus={() => {
                    props.setClicked(true)
                }}
                placeholderTextColor='lightgrey'
                />
                {props.clicked && (
                    <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                             props.setSearchPhrase("")
                             }}/>
                )}  
            </View>
            {props.clicked && (
                <View>
                    <Button
                    title='Cancel'
                    color={'rgb(72,209,204)'}
                    onPress={() => {
                        props.setClicked(false)
                        Keyboard.dismiss()
                    }}
                    >

                    </Button>
                    </View>
            )}
        </View>
    )
}

const titles = [
    { 
        id:1,
        name:'Aesthetic'
    },
    { 
        id:2,
        name:'Elective Surgery'
    },
    { 
        id:3,
        name:'Critical Illness'
    }
]
const Filter = (props) => {
    const nav = useNavigation()
    const renderItem = ({item}) => {
        if(props.searchPhrase === ''){
            return(
                <TouchableOpacity onPress={() => nav.navigate(`${item.name} Options`)} style={styles.button} >
                  <Text style={styles.bodyText}>{item.name}</Text>
            </TouchableOpacity>
               )
        }
        // filter of the name
     if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
         return( 
            <TouchableOpacity onPress={() => nav.navigate(`${item.name} Options`)} style={styles.button} >
            <Text style={styles.bodyText}>{item.name}</Text>
      </TouchableOpacity>
         )}
       // filter of the description
      
     };
     return(
         <SafeAreaView style={{flex:1, justifyContent:'space-between'}}>
         <View
           onStartShouldSetResponder={() => {
             props.setClicked(false);
           }}
           style={{justifyContent:'space-between'}}
         >
             
           <FlatList
           
             data={props.data}
             renderItem={renderItem}
             keyExtractor={(item) => item.id}
             style={{marginVertical:20,}}
           />
          
         </View>
       </SafeAreaView>
     )
 
}
const styles = StyleSheet.create({
    div:{
        flex:1,
  height:'100%',
        justifyContent:'space-evenly',
backgroundColor:'white'
    },
    header:{
        fontSize:25,
        fontWeight:'bold',
        marginTop:30,
        textDecorationLine:'underline'
    },
   content:{
    flex:1,
   justifyContent:'space-evenly',
   height:'100%'
}
   ,
    button:{
        
height:120,
      marginHorizontal:20,

    borderWidth:1,
            borderColor:'transparent',
        
       borderRadius:10,
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       
       elevation: 5,
       backgroundColor: '#fff',
       marginVertical:20
       
    },
    bodyText: {
      
      fontFamily:'Abel',
        fontSize:30,
          alignSelf:'center',
  marginTop:40,
       
    },
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
        backgroundColor:'white'
      },
      notClicked: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "rgba(220,220,220,0.2)",
        borderRadius: 15,
        alignItems: "center",
      },
      clicked: {
        padding: 10,
        flexDirection: "row",
        width: "90%",
        backgroundColor:  "rgba(220,220,220,0.2)",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
        paddingVertical:10,
     
    
    },
})