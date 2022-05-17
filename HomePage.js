import React, {useState} from 'react'
import { StyleSheet, Button, TextInput, Text, View, Alert, KeyboardAvoidingView, TouchableOpacity,Image,ScrollView, SafeAreaView, StatusBar,Dimensions, FlatList, Keyboard } from 'react-native'
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
import { setUser, setUID, setCountry, setPOR, setUsername, setBookAppointment, setUserDoc} from '../redux/actions';
import { History } from './Appointments'
import TravelHub from './TravelHub'
import Entypo from 'react-native-vector-icons/Entypo'
import { TravelHubLandingPage } from './TravelHub'
import PaymentGateway from './PaymentGateway'
import { TravelStack } from './TravelHub'
import { useFonts } from 'expo-font';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Tab = createBottomTabNavigator()
const doctorImage = require('./doctor.png')
const Drawer = createDrawerNavigator()
import { ProfileStack } from './Profile'
export default function HomePage() {
 
    return(
        <>
       <Drawer.Navigator useLegacyImplementation={true} drawerContent={props => <CustomDrawer {...props} />}
       screenOptions={{headerShown:false, drawerLabelStyle:{marginLeft:-25, fontSize:15}, drawerActiveBackgroundColor:'rgba(67,179,174,1)', drawerActiveTintColor:'#fff', drawerInactiveTintColor:'#333'}}
       
       >
           <Drawer.Screen name='HomeScreen' screenOptions={{headerShown:false}} component={HomeStack} 
           options={{
               drawerIcon:({color}) => ( <Ionicons name='home-outline' size={22} color={color} />)
               
               
           }}
           />
           <Drawer.Screen name='Appointments' screenOptions={{headerShown:false}}  component={AppointmentStack} 
           options={{
            drawerIcon:({color}) => 
             <Ionicons name='calendar-outline' size={22} color={color} />
            
        }}
           />
           <Drawer.Screen name='Travel Hub' component={TravelStack}
           options={{
            drawerIcon:({color}) => 
             <Ionicons name='documents-outline' size={22} color={color} />
            
        }}
           />
           <Drawer.Screen name='Profile' component={ProfileStack} 
           options={{
            drawerIcon:({color}) => 
             <Ionicons name='person-outline' size={22} color={color} />
            
        }}/>
 
       </Drawer.Navigator>
      
       
       </>
    )
}
const Stack = createStackNavigator()
export const HomeStack = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Welcome' options={{headerShown:false,
             
            }} component={HomeScreen} />
            <Stack.Screen name='History' component={History} />
            <Stack.Screen name='Payment Gateway' component={PaymentGateway} />
         
            <Stack.Screen name='Find A Doctor'  options={({navigation}) => ({
        
   
      headerStyle:{
        height:120,
        backgroundColor:'white',
  
      },
           headerBackTitleVisible:false,
          headerBackImage: () => <Ionicons name='chevron-back-outline' size={32} color={'black'}/>,

        
        })} component={PostOne} />

            <Stack.Screen name='Aesthetic Options'  options={{headerShown:false}}  component={AestheticStack} />
            <Stack.Screen name='Elective Surgery Options' options={{headerShown:false}} component={ElectiveSurgeryStack} />
            <Stack.Screen name='Critical Illness Options' options={{headerShown:false}} component={CriticalIllnessStack} />
    
        </Stack.Navigator>
    )
}
const HomeScreen = () => {

    const nav = useNavigation()
    return( 
        <>
       
        
          <HomeTabs />
        </>
      
            
   )
}
const CustomTabBar = ({children,OnPress} ) => (
    <TouchableOpacity
    style={{
        justifyContent:'center',
        alignItems:'center'
    }}
    >
        <View
        style={{
            width:40,
            height:40,
            borderRadius:20
        }}
        >
            {children}
        </View>
    </TouchableOpacity>
)
const HomeTabs = () => {
    const nav= useNavigation()
    const{appt} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()

    return(
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle:{borderTopColor:'transparent'},
        
            tabBarActiveTintColor:'white',
            tabBarInactiveBackgroundColor:'white',
          
            
            
        }}
        
        >
        <Tab.Screen name='Home' options={{headerShown:false, tabBarIcon: ({color,size,focused}) => (
            <TouchableOpacity onPress={() => nav.navigate('Home')} style={{borderWidth:1, width:40, height:40, borderRadius:20, borderColor:'transparent',justifyContent:'center',alignItems:'center', backgroundColor:focused ? 'rgb(72,209,204)' : '#fff'}}>
                <Ionicons name='home' size={28} color={color} />
           </TouchableOpacity>
                ),
  
        }} component={HomeLandingPage} 
            
      />
        <Tab.Screen name='Appointment' options={{tabBarIcon: ({color,size,focused}) => (
               <TouchableOpacity onPress={() =>{ 
                   dispatch(setBookAppointment(true))
                   nav.navigate('Appointment')}} style={{borderWidth:1, width:40, height:40, borderRadius:20, borderColor:'transparent',justifyContent:'center',alignItems:'center', backgroundColor:focused ? 'rgb(72,209,204)' : '#fff'}}>
               <Ionicons name='calendar' size={28} color={color} style={{}}/>
          </TouchableOpacity>
            ),
        headerShown:false
        }} component={AppointmentStack} 
        
        />
       
        <Tab.Screen name='Travel' options={{tabBarIcon: ({color,size,focused}) => (
                 <TouchableOpacity onPress={() => {
                     dispatch(setUserDoc(true))
                     nav.navigate('Travel')}} style={{borderWidth:1, width:40, height:40, borderRadius:20, borderColor:'transparent',justifyContent:'center',alignItems:'center', backgroundColor:focused ? 'rgb(72,209,204)' : '#fff'}}>
                 <Ionicons name='documents' size={28} color={color} style={{}}/>
            </TouchableOpacity>
            ),
        headerShown:false
        }}  component={TravelStack
            } />
        <Tab.Screen name='trial' options={{tabBarIcon: ({color,size,focused}) => (
                <TouchableOpacity onPress={() => nav.navigate('trial')} style={{borderWidth:1, width:40, height:40, borderRadius:20, borderColor:'transparent',justifyContent:'center',alignItems:'center', backgroundColor:focused ? 'rgb(72,209,204)' : '#fff'}}>
              <Feather name='user' size={28} color={color} />
           </TouchableOpacity>
            ),
            headerShown:false
            }}  component={ProfileStack} />
    </Tab.Navigator>
    )
}
export const HomeLandingPage = () => {
    const nav = useNavigation()
    const {name,uid, country, POR, username} = useSelector(state => state.userReducer)
const dispatch = useDispatch()
const [searchPhrase, setSearchPhrase] = useState("");
const [clicked, setClicked] = useState(false);
const [loaded] = useFonts({
    Tapestry: require('../assets/fonts/Tapestry-Regular.ttf'),
    Abel: require('../assets/fonts/Abel-Regular.ttf'),
    Cursive: require('../assets/fonts/WaterBrush-Regular.ttf')
})
if(!loaded){
    return null
}

console.log(username)
    return(
        <View style={styles.div}> 
      
<LinearGradient 

colors ={['rgb(72,209,204)']}
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
     
     <View style={{flexDirection:'row', alignItems:'center',alignSelf:'center',justifyContent:'flex-end'}}>
<Text style={styles.bodyHeader}>Welcome, {username} </Text>

</View>
<View style={{position:'absolute', right:0,marginRight:30}}>
<Ionicons name='wallet-outline' size={28} style={{}}/>
<Text>$0.00</Text>


</View>

</LinearGradient>
<View style={{borderWidth:1, borderTopLeftRadius:60, borderTopRightRadius:60, borderColor:'transparent',backgroundColor:'white', height:'100%', transform:[{translateY: -40}]}}>
  <SearchBar
  searchPhrase={searchPhrase}
  setSearchPhrase={setSearchPhrase}
  clicked={clicked}
  setClicked={setClicked}
/>
  <View style={{padding:30,  width:'90%',justifyContent:'center', bottom:20}}>

      <View style={{flexDirection:'row', alignItems:'center',alignContent:'space-between', width:'100%'}}>
  <Text style={{fontSize:24, fontWeight:'700', width:'70%'}}>
      How can we help ?
  </Text>
  <TouchableOpacity style={{alignSelf:'flex-end', flexDirection:'row',alignItems:'center', position:'absolute', right:0,transform:[{translateX: 40}] }}>
      <Text style={{alignSelf:'flex-end', fontSize:16}}>See All </Text>
      <Ionicons name='arrow-forward-outline' size={20} color={'lightgrey'} style={{marginLeft:2}}/>
  </TouchableOpacity>
</View>
  <Text style={{marginTop:10, lineHeight:23, fontWeight:'300'}}>
      Feel free to choose from medical needs you might require to a one stop travel hub !
    </Text>



    
       
</View>
<Filter
            searchPhrase={searchPhrase}
            data={data}
            setClicked={setClicked}
          />
</View>
        </View>
    )
}
const styles = StyleSheet.create({
    div : {
        flex:1,
     
      
    },
    content: {
        marginVertical: 20,
        borderWidth:3,
        borderRadius:6,
        fontSize:18,
      
        padding:30,
      
        
    },
  
    header:{
      
      
       
   alignContent:'center',
       textAlign:'center',
        width:'100%',
        height: 220,
        borderBottomColor:'#F5F5F5',
        borderBottomWidth:1,
        alignSelf:'center',
        justifyContent:'center'
       
    },
    body:{
        flex:1,
    
       

 
      
    },
    bodyHeader:{
        
       fontSize:26,
    
       justifyContent:'flex-end',

        alignItems:'center',
        
        color:'white',
        fontWeight:'600',
alignSelf:'center',
marginRight:20,
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
},
container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    backgroundColor:'white',
   top:10
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

const data = [
    {
        id:1,
        name:'Find A Doctor',
        sub:'30 Specialists',
        img:'https://cdn-icons-png.flaticon.com/512/925/925927.png',
        backgroundColor1:'#F0F8FF',
        backgroundColor2:'rgba(176,224,230,0.4)'
    },
    {
        id:2,
        name:'Travel Hub',
        sub:'All your travel needs',
        img:'https://cdn-icons-png.flaticon.com/512/2937/2937003.png',
        backgroundColor1:'#e6e8fa',
        backgroundColor2:'rgba(209,159,232,0.5)'
    },
    {
        id:3,
        name:'Appointments',
        sub:'View appointments',
        img:'https://cdn-icons-png.flaticon.com/512/1636/1636025.png',
        backgroundColor1:'rgba(255,228,225,0.5)',
        backgroundColor2:'rgba(250,218,221,0.8)'
        //  backgroundColor2:'rgba(209,159,232,0.5)'
    },
      {
        id:4,
        name:'Hospitals',
        sub:'Nearby hospitals',
        img:'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
        backgroundColor1:'rgba(255,255,224,0.5)',
        backgroundColor2:'rgba(255,250,205,0.6)'
    }


]
const Filter = (props) => {
    const nav = useNavigation()
    const renderItem = ({item}) => {
        if(props.searchPhrase === ''){
            return(
                <TouchableOpacity onPress={() => nav.navigate(`${item.name}`)} style={{justifyContent:'center',  width: windowWidth * 0.4, alignItems:'center', paddingTop:20, borderWidth:1, borderRadius:15, height:210,backgroundColor:item.backgroundColor1, borderColor:'transparent', marginLeft:10, marginBottom:10}} >
                 <Image source={{uri : item.img}} style={{width:'100%', height:110, resizeMode:'contain',marginBottom:15,  }} />
    <View style={{ backgroundColor:item.backgroundColor2, borderWidth:1, width:'100%', fontSize:24, borderRadius:15, overflow:'hidden', borderColor:'transparent',  height:70,fontWeight:'500', alignItems:'center', justifyContent:'space-evenly'}}>
    <Text style={{fontSize:20, fontWeight:'500', }} >{item.name}</Text>
    <Text style={{bottom:8, fontWeight:'200'}}>{item.sub}</Text>
    </View>
            </TouchableOpacity>
               )
        }
        // filter of the name
     if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
         return( 
            <TouchableOpacity onPress={() => nav.navigate(`${item.name}`)} style={{justifyContent:'center',  width: windowWidth * 0.4, alignItems:'center', paddingTop:20, borderWidth:1, borderRadius:15, height:210,backgroundColor:item.backgroundColor1, borderColor:'transparent'}} >
            <Image source={{uri : item.img}} style={{width:'100%', height:110, resizeMode:'contain',marginBottom:15,  }} />
<View style={{ backgroundColor:item.backgroundColor2, borderWidth:1, width:'100%', fontSize:24, borderRadius:15, overflow:'hidden', borderColor:'transparent',  height:70,fontWeight:'500', alignItems:'center', justifyContent:'space-evenly'}}>
<Text style={{fontSize:20, fontWeight:'500', }} >{item.name}</Text>
<Text style={{bottom:8, fontWeight:'200'}}>{item.sub}</Text>
</View>
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
           style={{marginHorizontal:20, bottom:50}}
             numColumns={2}
           />
          
         </View>
       </SafeAreaView>
     )
 
}
const SearchBar = (props) => {
    return(
        <View style={styles.container}>
            <View
            style={!props.clicked ? styles.notClicked : styles.clicked}
            >
               
                <TextInput 
                style={styles.input}
                placeholder='Search for Medical treatments'
                value={props.searchPhrase}
                onChangeText={props.setSearchPhrase}
                onFocus={() => {
                    props.setClicked(true)
                }}
                placeholderTextColor='grey'
                />
                 <Feather
                 name="search"
                 size={24}
                 color="rgb(72,209,204)"
                 style={{ marginLeft: 1, opacity: props.clicked ? 0 : 1 }}
                
                
                />
                {props.clicked && (
                    <Entypo name="cross" size={24} color="rgb(72,209,204)" style={{ padding: 1 }} onPress={() => {
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