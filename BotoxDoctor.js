import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, ActivityIndicator, Keyboard, Button, TextInput, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Modal, FlatList,Image     } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryPicker from 'react-native-country-picker-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import DRPage from './DRPage.js';
import PhysicalAppointment from './PhysicalAppointment.js';
import { AppointmentStack } from '../../Appointments.js';
import TeleConsult from './TeleConsultation.js';
import { FullAppointment } from './TeleConsultation.js';
import ProgressBar from "react-native-animated-progress";
import Appointments from '../../Appointments.js'
export const DoctorContext = React.createContext()
 function BotoxDoctor() {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const {doctor, setDoctor, fakeData, setFakeData, images, setImages} = useContext(DoctorContext)
   useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/jeremychiaaaaa/medapp1/options"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);
    return(
       <SafeAreaView style={{backgroundColor:'white', flex:1,}}>
          
          <ProgressBar progress={95} height={7} backgroundColor="rgb(72,209,204)" animated={false} trackColor='rgba(220,220,220,0.3)' />
<SearchBar
  searchPhrase={searchPhrase}
  setSearchPhrase={setSearchPhrase}
  clicked={clicked}
  setClicked={setClicked}
/>
{!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
      
          <Filter
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
            setDoctor={setDoctor}
            setImages={setImages}
            images={images}
          />
        
      )}
  
 </SafeAreaView>
    )}

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
                    placeholder='Search for Botox Doctor'
                    value={props.searchPhrase}
                    onChangeText={props.setSearchPhrase}
                    onFocus={() => {
                        props.setClicked(true)
                    }}
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
    
    const Item = ({title, YOE, image, hospital}) => {
        return(
            <View style={styles.item}>
            <Image style={styles.image} source={{uri: image}}/>
            <View style={{marginLeft:10, justifyContent:'center'}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={{color: 'rgb(72,209,204)', fontWeight:'800',fontSize:20}}>Years of experience: {YOE}</Text>
            <Text style={{fontWeight:'200',fontSize:16,}}>Currently working at: {hospital} hospital</Text>
        
       </View>
        </View>
        )
        
    }
    const Filter = (props) => {
        const nav = useNavigation()
        const renderItem = ({item}) => {
           if(props.searchPhrase === ''){
               return(
                   <TouchableOpacity onPress={async() => {
                 
                   await props.setDoctor(`${item.title}`)
                    nav.navigate(`${item.title} page`)
                 props.setImages(item.image)
                     }}
                     style={{    
              
                      borderWidth:1,
                      borderColor:'rgba(244,240,236,1)',
                     borderRadius:10,
                     shadowColor: "#000",
                     shadowOffset: {
                       width: 0,
                       height: 4,
                     },
                     shadowOpacity: 0.30,
                     shadowRadius: 4.65,
                     
                     elevation: 8,
                     backgroundColor: "#FFF",
                     marginVertical:20,
                     marginHorizontal:15,
                     width:'88%'
                    }}
                     >
                  <Item title={item.title} description={item.description} YOE={item.YOE} image={item.image} hospital={item.hospital}/> 
               </TouchableOpacity>
                  )
           }
           // filter of the name
        if (item.title.includes(props.searchPhrase.trim())) {
            return( 
            <TouchableOpacity onPress={async() => {
           
            await props.setDoctor(`${item.title}`)
                nav.navigate(`${item.title} page`)
              
              }}
           
              >
           <Item title={item.title} description={item.description} YOE={item.YOE} image={item.image} hospital={item.hospital}/> 
         </TouchableOpacity>
            )}
          // filter of the description
          if (item.description.includes(props.searchPhrase.trim())) {
            return( 
                <TouchableOpacity onPress={async() => {
               
               await props.setDoctor(`${item.title}`)
                    nav.navigate(`${item.title} page`)
                  
                  }} >
              <Item title={item.title} description={item.description} YOE={item.YOE} image={item.image} hospital={item.hospital} /> 
             </TouchableOpacity>
                )
          }
        };
        return(
            <SafeAreaView style={styles.list__container}>
            <View
              onStartShouldSetResponder={() => {
                props.setClicked(false);
              }}
            >
                
              <FlatList
              
                data={props.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
             
            </View>
          </SafeAreaView>
        )
    }

export const BotoxDoctorStack = () => {
const Stack = createStackNavigator()
const nav = useNavigation()
const [doctor,setDoctor] = useState()
const [fakeData, setFakeData] = useState()
const[images, setImages] = useState([])
const[type, setType] = useState('')
const[calendarDate,setCalendarDate] = useState(null)
const[clicked,setClicked] = useState()
const[viewAppointment, setViewAppointment] = useState(false)
const[pressDate,setPressDate] = useState(false)
const[pressDate1,setPressDate1] = useState(false)
const[pressDate2,setPressDate2] = useState(false)
const[pressDate3,setPressDate3] = useState(false)
const dateChange = () => {
  setPressDate(true)
  if(!clicked){

      
 setDate(startingDate + '/' + startingMonth + '/' + startingYear)
       console.log(date)
  }else if(clicked === true){
     setCalendarDate(calendarDate.toString().slice(3,15))
   setDate(calendarDate)
  }


  
}
  return(
       <DoctorContext.Provider value={{doctor, setDoctor, fakeData, setFakeData, images, setImages, type, setType, calendarDate, setCalendarDate, clicked, setClicked, pressDate, setPressDate, pressDate1, setPressDate1, pressDate2, setPressDate2, pressDate3, setPressDate3, viewAppointment, setViewAppointment}} >
    <Stack.Navigator>
   
      <Stack.Screen name='Botox Doctor'
         options={({navigation}) => ({
      
          title:'Botox Doctors',
          headerStyle:{
            backgroundColor:'white',
            height:100,
          
          },
               headerBackTitleVisible:false,
              headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'} style={{marginLeft:2}}/>,
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
      
      component={BotoxDoctor}/>
      <Stack.Screen name={`${doctor} page`} 
      
      options={({navigation}) => ({
      
        headerShown:false,
        headerStyle:{
          backgroundColor:'white',
          height:100,
        
        },
             headerBackTitleVisible:false,
            headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'} style={{marginLeft:2}}/>,
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
      
      component={DRPage} />
      <Stack.Screen name='Physical Appointment' component={PhysicalAppointment} />
      <Stack.Screen name= 'TeleConsult'
       options={({navigation}) => ({
      headerShown:false,
     
        headerStyle:{
          backgroundColor:'white',
          height:100,
        
        },
             headerBackTitleVisible:false,
            headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'} style={{marginLeft:2}}/>,
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
      
      
      component={TeleConsult} />
     <Stack.Screen name= 'Full Appointment'
       options={({navigation}) => ({
      headerShown:false,
     
        headerStyle:{
          backgroundColor:'white',
          height:100,
        
        },
             headerBackTitleVisible:false,
            headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'} style={{marginLeft:2}}/>,
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
      
      
      component={FullAppointment} />
      <Stack.Screen name='Appointment Main' options={{headerShown:true}} component={Appointments} />
    </Stack.Navigator>
   </DoctorContext.Provider>
  )
}




const styles = StyleSheet.create({
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
            backgroundColor: "rgba(220,220,220,0.2)",
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
    
          list__container: {
            margin: 10,
            height: "85%",
            width: "100%",
          },
          item: {
          marginVertical:15,
          marginHorizontal:15,
          width:'100%',
           flex:1,
           flexDirection:'row',
       overflow:'hidden'
     
          },
          title: {
            fontSize: 20,
            fontWeight: "bold",
     
            marginLeft:1
           
          },
          image: {
              width:80,
              height:80,
             borderRadius:40,
            marginTop:10,
            marginRight:10
          },
          details:{
            alignSelf:'center',
            marginTop:10
          }
    
    
    })
    