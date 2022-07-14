import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import {Avatar} from '@rneui/themed';
import { ListItem } from '@rneui/base';
import { useEffect } from 'react';
import { fetchParents } from './util/http';
import SelectDropdown from 'react-native-select-dropdown';
import Dropdown from './Forms/Dropdown';


const Parent = () => {
  const [state, setState] = useState([]);

  const x = state;


  useEffect(()=>{
    async function getParents(){
     const parents = await fetchParents();
      setState(parents)
    }
    getParents();
    console.log(x);
  }, [])


  return (
    // <ListItem>
    // <Avatar rounded 
    // source={{
    //     uri: 
    //     "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",}}/>
    // </ListItem>
    // Invoking get method to perform a GET request

    <View style={{paddingRight:5}}>
    <Dropdown props = {state} label= "Parent"/>

    </View>
  );
};

export default Parent;

const styles = StyleSheet.create({
  txt:{
    color:'black'
  },

  
});