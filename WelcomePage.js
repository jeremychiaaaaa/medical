import React, {useState, useEffect} from 'react'
import { Dimensions, StyleSheet, Button, TextInput, Text, View, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, PixelRatio,Image } from 'react-native'
import Emoji from 'a11y-react-emoji'
import { SliderBox } from 'react-native-image-slider-box';
import { SvgUri } from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
const WelcomePage = (props) => {
    const[slider,setSlider] = useState({currentPage: 0})
 const {width, height} = Dimensions.get('window')

 const setSliderPage = (e) => {
     const {currentPage} = slider
     const {x} = e.nativeEvent.contentOffset
    const index = Math.round(x / width)

    if(index != currentPage){
        setSlider(
            {
                ...slider, currentPage:index
            }
        )
    }
 }
 const nav = useNavigation()
 const pageIndex = slider.currentPage
 console.log(pageIndex)
    return(
     <>
     <StatusBar barStyle='dark-content'/>
     <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {setSliderPage(event)}}
        >
            <LinearGradient
            style={{width,height}}
            colors={['#fff']}
            start={{
                x: 0,
                y: 0
              }}
              end={{
                x: 1,
                y: 1
              }}
            >   
               

            <View style={{width:width, height:height}}>
   
              <Image source={{uri:'https://media.istockphoto.com/vectors/multicultural-people-standing-together-vector-id1251668450?k=20&m=1251668450&s=612x612&w=0&h=a9oV9mH8IW2zMiLOXY9wd_BP0h1KxYnORuPzRdjEY0E='}} style={{width:'100%',  height: height*0.7,resizeMode:'contain',backgroundColor:'white'}} />
            <Text style={{padding:20, marginHorizontal:20, fontSize:20, fontWeight:'600', bottom:50,width:width*0.5}}>Hey There 👋 !</Text>
            <Text style={{padding:20, marginHorizontal:20, fontSize:14, fontWeight:'200', bottom:50,width:width*0.8}}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. </Text>
            </View>
      
        </LinearGradient>
        <LinearGradient
            style={{width,height}}
            colors={['#fff']}
            start={{
                x: 0,
                y: 0
              }}
              end={{
                x: 1,
                y: 1
              }}
            >   
               

            <View style={{width:width, height:height}}>
   
              <Image source={{uri:'https://img.freepik.com/free-vector/online-doctor-concept-with-male-doctor-character-laptop-screen_7547-692.jpg?w=1380'}} style={{width:'100%',  height: height*0.7,resizeMode:'contain'}} />
            <Text style={{padding:20, marginHorizontal:20, fontSize:20, fontWeight:'600', bottom:50,width:width*0.8}}>TeleConsultation from the comfort of your homes</Text>
            <Text style={{padding:20, marginHorizontal:20, fontSize:14, fontWeight:'200', bottom:50,width:width*0.8}}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. </Text>
            </View>
      
        </LinearGradient>
        <LinearGradient
            style={{width,height}}
            colors={['#fff']}
            start={{
                x: 0,
                y: 0
              }}
              end={{
                x: 1,
                y: 1
              }}
            >   
               

            <View style={{width:width, height:height}}>
   
              <Image source={{uri:'https://img.freepik.com/free-vector/family-hiking-location-app-father-mother-children-walking-outdoors-carrying-backpacks-picnic-basket-vector-illustration-camping-adventure-travel-active-hikers-topics_74855-8355.jpg?t=st=1651569717~exp=1651570317~hmac=ec832b4780fec0e5c18b189d73e2acca8ba6d13a097ae5a371a24928812746b9&w=1480'}} style={{width:'100%',  height: height*0.7,resizeMode:'contain'}} />
            <Text style={{padding:20, marginHorizontal:20, fontSize:20, fontWeight:'600', bottom:50,width:width*0.8}}>Travel Hub for all your travel needs</Text>
            <Text style={{padding:20, marginHorizontal:20, fontSize:14, fontWeight:'200', bottom:50,width:width*0.8}}>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. </Text>
            </View>
      
        </LinearGradient>
     
            </ScrollView>
            <View style={styles.paginationWrapper}>
               {Array.from(Array(3).keys()).map((i,index) => 
                   <View style={[styles.paginationDots, {opacity: pageIndex === index ? 1 : 0.2}]} key={index} />
               )}
               <TouchableOpacity style={{position:'absolute', right:20,bottom:-20, marginRight:20,backgroundColor:'rgb(72,209,204)',shadowColor: "#000",width:58,height:58, borderRadius:29,
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,
justifyContent:'center'
}}
onPress={() => nav.navigate('Create Account')}
>
                <Ionicons name='arrow-forward' size={40} color={'white'} style={{color:'white',justifyContent:'center',alignSelf:'center'
}}/>
</TouchableOpacity>
          </View>
        
      </View>

     </>
    )
}
const styles = StyleSheet.create({
    imageStyle: {
      height: PixelRatio.getPixelSizeForLayoutSize(135),
      width: '100%',
    },
    wrapper: {
  

    },
    header: {
      fontSize: 30,
      fontWeight: '800',
      marginBottom: 20,

    },
    paragraph: {
      fontSize: 18,
      marginHorizontal:10
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
     marginLeft:40,
        alignItems: 'center',
        flexDirection: 'row',
        alignContent:'space-between',

      },
      paginationDots: {
        height: 8,
        width: 8,
        borderRadius: 8 / 2,
        backgroundColor: '#0898A0',
        marginLeft: 10,
      },
      registration:{
        flex:1,
    
        alignItems:'center'
      },
      registertext:{
          fontSize:24,
          fontWeight:'600',
          backgroundColor:'white',
          paddingVertical:20,
          paddingHorizontal:80,
        borderWidth:1,
      opacity:0.7
      },
      logintext:{ color:'black',
    marginTop:15,
    padding:15,
    fontWeight:'500',
    fontSize:20
    }
     
  });

export default WelcomePage