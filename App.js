import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import WelcomePage from './Pages/WelcomePage';
import HomePage from './Pages/HomePage';
import PostOne from './Pages/PostOne';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { HomeLandingPage } from './Pages/HomePage';
import { HomeStack } from './Pages/HomePage';
import Location from './Pages/Location';
import CreateAccount from './Pages/CreateAccount';
import Birthday from './Pages/Birthday';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Gender from './Pages/Gender';
export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={Store}>
    <NavigationContainer >
    <Stack.Navigator> 

        <Stack.Screen options={{headerShown:false}} name='Welcome Page' component={WelcomePage} />

    
        <Stack.Screen name='Create Account' options={{headerShown:false}} component={CreateAccount} />
                 <Stack.Screen name='Step 1 of 3' options={{  
      
      headerBackTitleVisible:false,
         headerBackImage: () => <Ionicons name='arrow-back-outline' size={32} color={'black'} style={{marginLeft:10}}/>,
       
        headerStyle:{
  
           backgroundColor:'white',
         borderBottomColor:'transparent'
         },
       }}  component={Birthday} />
         <Stack.Screen name='Step 2 of 3' options={{  
      
       headerBackTitleVisible:false,
          headerBackImage: () => <Ionicons name='arrow-back-outline' size={32} color={'black'} style={{marginLeft:10}}/>,
        
         headerStyle:{
   
            backgroundColor:'white',
          borderBottomColor:'transparent'
          },
        }} 
         
          component={Location} />
     <Stack.Screen name='Step 3 of 3' options={{  
      
      headerBackTitleVisible:false,
         headerBackImage: () => <Ionicons name='arrow-back-outline' size={32} color={'black'} style={{marginLeft:10}}/>,
       
        headerStyle:{
  
           backgroundColor:'white',
         borderBottomColor:'transparent'
         },
       }}  component={Gender} />
        <Stack.Screen name='Log In' options={{headerShown:false}} component={LogIn} />
        <Stack.Screen options={{headerShown:false}} name='HomePage' component={HomePage} />
     
   
    </Stack.Navigator>
</NavigationContainer>
</Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
   
  },
});
