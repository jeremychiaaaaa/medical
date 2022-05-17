import React, {useState, useEffect} from 'react'
import { StyleSheet, ActivityIndicator, Keyboard, Button, TextInput, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, TouchableOpacity,TouchableWithoutFeedback, Dimensions, ScrollView, Modal, FlatList , Image ,   } from 'react-native'
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryPicker from 'react-native-country-picker-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { StackRouter } from 'react-navigation';
import BotoxStack from './Botox';
import Facial from './Facial';
import PlasticSurgery from './PlasticSurgery';
import Chat from '../Chat'
import { useFonts } from 'expo-font';
import ProgressBar from "react-native-animated-progress";
import DysportDoctor from './Botox/DysportDoctor';
import Myobloc from './Botox/Myobloc';
import Xeomin from './Botox/Xeomin';
import { BotoxDoctorStack } from './Botox/BotoxDoctor';
import GestureRecognizer from 'react-native-swipe-gestures';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function Aesthetic() {
  const nav = useNavigation()
  const[modalVisible, setModalVisible] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
   const [fakeData, setFakeData] = useState()
   const [loaded] = useFonts({
    Tapestry: require('../../assets/fonts/Tapestry-Regular.ttf'),
    Abel: require('../../assets/fonts/Abel-Regular.ttf'),
    Roboto: require('../../assets/fonts/Roboto-Medium.ttf')
})

   useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/jeremychiaaaaa/aesthetic8/options"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);
    return(
       <SafeAreaView style={{backgroundColor:'white', }}>
           <ProgressBar progress={70} height={7} backgroundColor="rgb(72,209,204)" animated={false} trackColor='rgba(220,220,220,0.3)' />
   
<SearchBar
  searchPhrase={searchPhrase}
  setSearchPhrase={setSearchPhrase}
  clicked={clicked}
  setClicked={setClicked}
/>
{!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
        <GestureRecognizer 
      
        onSwipeDown={() => setModalVisible(false)}
        >
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
          <View style={{width:'100%', height:HEIGHT*0.35,zIndex:10,  transform:[{translateY: 10}] }}>
            <Ionicons name='close-circle-outline' size={40} onPress={() => setModalVisible(false)} style={{top:40,zIndex:20, position:'absolute', left:20, color:'grey'}}/>
            <Image source={{uri:'https://www.justinboey.com/wp-content/uploads/2019/12/botox-for-the-jawline-explore-the-risks-and-downtime.jpg'}} style={{width:'100%', height:'100%'}}/>
          </View>
        <View style={styles.modalView}>
          <TouchableOpacity style={{width:'45%', alignSelf:'center', marginHorizontal:20, height:5, borderRadius:15, backgroundColor:'rgba(220,220,220,0.5)' , borderColor:'transparent', bottom:30}}>
          
          </TouchableOpacity>
         
          <Text style={{fontSize:22, fontWeight:'600',alignSelf:'flex-start'}}>Botox Options</Text>
       

       <TouchableOpacity style={styles.button} onPress={() => {
         setModalVisible(false)
         nav.navigate('Botox Doctors')}}>
           <View style={{flexDirection:'row', alignContent:'space-between'}}>
           <Text style={styles.name}>BOTOX</Text>
            <Ionicons name='chevron-forward' size={32}  style={{right:0, color:'rgb(72,209,204)', position:'absolute', alignSelf:'center', }}/>
      </View>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Dysport Doctors')}>
     
       <View style={{flexDirection:'row', alignContent:'space-between'}}>
           <Text style={styles.name}>DYSPORT</Text>
            <Ionicons name='chevron-forward' size={32}  style={{right:0, color:'rgb(72,209,204)', position:'absolute', alignSelf:'center', }}/>
      </View>
       </TouchableOpacity >
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Xeomin Doctors')}>
       <View style={{flexDirection:'row', alignContent:'space-between'}}>
           <Text style={styles.name}>XEOMIN</Text>
            <Ionicons name='chevron-forward' size={32}  style={{right:0, color:'rgb(72,209,204)', position:'absolute', alignSelf:'center', }}/>
      </View>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate('Myobloc Doctors')}>
       <View style={{flexDirection:'row', alignContent:'space-between'}}>
           <Text style={styles.name}>MYOBLOC</Text>

            <Ionicons name='chevron-forward' size={32}  style={{right:0, color:'rgb(72,209,204)', position:'absolute', alignSelf:'center', }}/>
      </View>
       </TouchableOpacity>
   </View>
        </View>
      </Modal>
         
          </GestureRecognizer>
            <Filter
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
            setModalVisible={setModalVisible}
          />
        
           
     
        </>
      )}
    {fakeData && (
      <Ionicons name='chatbox-ellipses' size={32} style={{ alignSelf:'center', color:'rgb(72,209,204)', }}/>
    )}   
          

 </SafeAreaView>
    )}
const Stack = createStackNavigator()
export default function AestheticStack({navigation}){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Aesthetic Options'
           options={({navigation}) => ({
      
        title:'Aesthetic Treatment',
        headerStyle:{
          backgroundColor:'white',
          height:100,
        
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
          })}
            component={Aesthetic}  />
            <Stack.Screen name='Botox Options' options={{headerShown:false}} component={BotoxStack} />
            <Stack.Screen name='Facial Options' component={Facial} />
            <Stack.Screen name='Plastic Surgery Options' component={PlasticSurgery} />
            <Stack.Screen name='Chat' component={Chat} />
            <Stack.Screen name='Botox Doctors' options={{headerShown:false}} component={BotoxDoctorStack} />
        <Stack.Screen name='Dysport Doctors'  component={DysportDoctor} />
        <Stack.Screen name='Myobloc Doctors'  component={Myobloc} />
        <Stack.Screen name='Xeomin Doctors'  component={Xeomin} />
        </Stack.Navigator>
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
                placeholder='Search for Aesthetic treatments'
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

const Item = ({title,description,backgroundColor,image,sub}) => {
    return(
    
        <View style={styles.item}>
      
        <Image source={{uri: image}} style={{width:100, height:150, marginTop:20,  justifyContent:'flex-start', borderRadius:10,marginBottom:20,  }}/>
        <View style={{  width:'75%',justifyContent:'space-between', paddingLeft:20}}>
       <Text style={styles.title}>{title}</Text>
        <Text style={{fontWeight:'600', alignSelf:'flex-start',marginTop:10,color:'rgb(72,209,204)', fontSize:18}}>{sub}</Text>
        <Text style={{width:'90%',marginTop:10,paddingBottom:20}}>{description}</Text>

    </View>
 
    </View>

    )
    
}
const Filter = (props) => {
    const nav = useNavigation()
    const renderItem = ({item}) => {
       if(props.searchPhrase === ''){
           return(
               <TouchableOpacity onPress={() => props.setModalVisible(true)}>
              <Item title={item.title} image={item.image} sub={item.sub} description={item.description} backgroundColor={item.backgroundColor} /> 
           </TouchableOpacity>
              )
       }
       // filter of the name
    if (item.title.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return( 
        <TouchableOpacity onPress={() => nav.navigate(`${item.title} Options`)}>
        <Item title={item.title} description={item.description} backgroundColor={item.backgroundColor}/>
     </TouchableOpacity>
        )}
      // filter of the description
      if (item.description.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return( 
            <TouchableOpacity onPress={() => nav.navigate(`${item.title} Options`)}>
            <Item title={item.title} description={item.description} backgroundColor={item.backgroundColor}/>
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
     
        height: "100%",
        width: "100%",
      },
      item: {
 
          flex:1,
     flexGrow:1,
 alignItems:'center',
 
        flexDirection:'row',
        borderBottomWidth:1, borderBottomColor:'rgba(220,220,220,0.3)',
        marginHorizontal:20
      },
      title: {
        fontSize: 21,
        fontWeight: "700",

        alignSelf:'flex-start',
        

     justifyContent:'center',
     textTransform:'uppercase',
  paddingTop:20
      },
      chat: {
      width:80, height:80,
      borderWidth:3,
    
      
        borderRadius:40,
  
      
    
 
 backgroundColor:'white', 
borderColor:'rgba(72,209,204,0.5)',
justifyContent:'center'
    },
    details:{
      marginTop:10,
      alignSelf:'center',
    fontSize:16,
    lineHeight:24,
    marginHorizontal:10
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",

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
      width:'100%',

      height:HEIGHT*0.65,
      transform:[{translateY: -10}]
    },
    button:{
      
      marginVertical:20,
      borderWidth:1,

      marginHorizontal:15,

      width:'100%',
      paddingVertical:15,
      borderRadius:10,
      backgroundColor:'#fff',
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
borderColor:'transparent'

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
    },
    name:{
      padding:10,
      fontWeight:'500',
    
      fontSize:18
  },


})
