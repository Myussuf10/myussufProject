import RNDateTimePicker from '@react-native-community/datetimepicker'
import { Button, Header } from '@rneui/themed'
import { fonts } from '@rneui/themed/dist/config'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
import Input from './Forms/Input'
import { AuthContext } from './store/AuthContext'
import { getKeyByValue } from './util/helperFunctions'
import { fetchSubjects, setClass } from './util/http'

const SetUpClasses = ({ navigation }) => {
  const [date, setDate] = useState(new Date())
  const [openDate, setOpenDate] = useState(false)
  const [openTime, setOpenTime] = useState(false)
  const [time, setTime] = useState(new Date())
  const [subjects, setSubjects] = useState({})
  const [chosenSub, setChosenSub] = useState({})
  const [topic, setTopic] = useState()
  const list = [];
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function getSubjects(token) {
      const subject = await fetchSubjects(token).catch((err)=>{console.log(err)});
      setSubjects(subject)
    }
    getSubjects(authCtx.token);
    console.log(subjects);

  }, [])
  for (const i in subjects) {
    list.push(subjects[i])
  }

  function addDays(date, days) {
    var result = new Date(date);
    const weeks = days * 7;
    result.setDate(result.getDate() + weeks);
    return result;
  }

  const ShowPicker1 = () => {
    setOpenDate(openDate => !openDate)
  }
  const ShowPicker2 = () => {
    setOpenTime(openTime => !openTime)
  }
  const Confirm = () => {
    const data = {}
    data["dow"] = date.toISOString().split('T')[0]
    data["time"] = time.toLocaleTimeString('en-us', {hour12: false,hour:'numeric', minute:'numeric'})
    data["topic"] = topic
    setClass(chosenSub, data, authCtx.token)
    navigation.pop()    
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Header.HEIGHT} // adjust the value here if you need more padding
      style={{ flex: 1, backgroundColor: '#B4B4B4', alignItems: 'center' }}
      behavior="padding" >


      <Text style={styles.header}> Set up Classes</Text>
      <View style={{ marginTop: 50 }}>
        <SelectDropdown style={styles.box} data={list} defaultButtonText={"Select Subject"} onSelect={(x) => { setChosenSub(getKeyByValue(subjects, x))}} search={true} />

        {openDate && (<RNDateTimePicker value={date} onChange={(x, y) => { ShowPicker1(), setDate(y) }} date={date} />)}
        {openTime && (<RNDateTimePicker value={time} onChange={(x, y) => { ShowPicker2(), setTime(y) }} mode="time" />)}

        <View style={{ marginBottom: 100 }}>
          <TouchableOpacity
            title="Admin"
            onPress={() => { ShowPicker1() }}
            style={styles.button}>
            <Text style={styles.txt}> Select Start Date </Text>
          </TouchableOpacity>
          <Text style={styles.text}>{date.toLocaleDateString()}</Text>
          <TouchableOpacity
            title="Admin"
            onPress={() => { ShowPicker2() }}
            style={styles.button}>
            <Text style={styles.txt}> Select Start Time </Text>
          </TouchableOpacity>
          <Text style={styles.text}>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</Text>
          <TextInput style={styles.input} onChangeText={(x) => { setTopic(x) }} />
          <TouchableOpacity
            title="Confirm"
            onPress={() => { Confirm() }}
            style={styles.confirm}>
            <Text style={styles.txt}> Confirm </Text>
          </TouchableOpacity>
        </View>


      </View>

    </KeyboardAvoidingView>
  )
}

export default SetUpClasses

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 8
  },
  txt: {
    textAlign: 'center',
    fontSize: 20,

  },
  text: {
    marginTop: 15,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    color: 'black'

  },
  input: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 5

  },
  confirm: {
    backgroundColor: '#608d56',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 207,
  },
  button: {
    backgroundColor: '#608d56',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 207,
  },
  box: {
    padding: 60,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 250,
    marginBottom: 200

  },
})