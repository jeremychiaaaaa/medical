

import React, {useState, useEffect} from 'react'
import { StyleSheet, ActivityIndicator, Keyboard, Button, TextInput, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Modal, FlatList     } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryPicker from 'react-native-country-picker-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { StackRouter } from 'react-navigation';
import CosmeticSurgery from './CosmeticSurgery';
import HerniaRepair from './HerniaRepair';
import SportSurgery from './SportSurgery';
function ElectiveSurgery() {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
   const [fakeData, setFakeData] = useState()

   useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/jeremychiaaaaa/Elective/options"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);
    return(
       <SafeAreaView>
          

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
          />
        
      )}
  
 </SafeAreaView>
    )}
const Stack = createStackNavigator()
export default function ElectiveSurgeryStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Elective Surgery Stack' component={ElectiveSurgery} />
            <Stack.Screen name='Cosmetic Surgery' component={CosmeticSurgery} />
            <Stack.Screen name='Hernia Repair' component={HerniaRepair} />
            <Stack.Screen name='Sport-Related Surgery' component={SportSurgery} />

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
                 color="black"
                 style={{ marginLeft: 1 }}
                
                
                />
                <TextInput 
                style={styles.input}
                placeholder='Search for Elective Surgery'
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

const Item = ({title,description}) => {
    return(
        <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{description}</Text>
    </View>
    )
    
}
const Filter = (props) => {
    const nav = useNavigation()
    const renderItem = ({item}) => {
       if(props.searchPhrase === ''){
           return(
               <TouchableOpacity onPress={() => nav.navigate(`${item.title}`)}>
              <Item title={item.title} description={item.description} /> 
           </TouchableOpacity>
              )
       }
       // filter of the name
    if (item.title.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return( 
        <TouchableOpacity onPress={() => nav.navigate(`${item.title}`)}>
        <Item title={item.title} description={item.description} />
     </TouchableOpacity>
        )}
      // filter of the description
      if (item.description.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return( 
            <TouchableOpacity onPress={() => nav.navigate(`${item.title}`)}>
            <Item title={item.title} description={item.description} />
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
        
      },
      notClicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
      clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
      
      },

      list__container: {
        margin: 10,
        height: "85%",
        width: "100%",
      },
      item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
       
      },


})
