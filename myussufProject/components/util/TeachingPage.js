import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Icon } from "@rneui/themed";
import { State, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from '@rneui/base'
import { useEffect } from 'react';
import { fetchStudentsWithSubject, Login } from './http';
import { useState } from 'react';
import Dialog from 'react-native-dialog'
import Attendance from './Attendance';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import Comments from '../Forms/Comments';


const TeachingPage = ({ navigation }) => {
    const [students, setStudents] = useState([])
    const [visible, setVisible] = useState(false)
    const [comments, setComment] = useState({ studentid: "", comments: "" })
    const authCtx = useContext(AuthContext)


    useEffect(() => {
        console.log(authCtx.role)
        async function getStudents() {
            const response = await fetchStudentsWithSubject();
            setStudents(response)
        }
        getStudents().catch(err => { console.log(err) })
        
    }, [])

    
    const showDialog = (x) => {
        setComment((currentinput) => {
            return {
                ...currentinput,
                ["studentid"]: x
            }
        })
        setVisible(true)
        console.log(comments)
    }
    const handleCancel = () => {
        setVisible(false)
    }
    async function sentComment() {
        //setVisible(false)
        const x = await Login("myussuf1988@yahoo.com", "54hnr")
        console.log(x);
    }

    if(visible){return (<Comments props={students} visible={handleCancel}/>)
            
            }
    return (
        <KeyboardAvoidingView behavior='height'
            style={{ backgroundColor: '#B4B4B4', flex: 1 }}>
            <View style={{ alignContent: "center", justifyContent: "center", marginLeft: 175, marginTop: 5, padding: 5 }}>
                <Avatar rounded
                    source={{
                        uri:
                            "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
                    }} />
                <Text style={{ fontSize: 18 }}>{ }</Text>
                {/* ()=>{navigation.navigate(Attendance)} */}
                <TouchableOpacity onPress={()=>{sentComment()}} style={{
                    backgroundColor: '#608d56',
                            borderRadius: 2, padding: 4, width: 130, margin: 2
                }}>
                    <Text style={{textAlign:'center'}}>Attendance</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Full Name</Text>
                <Text style={styles.title}>School</Text>
                <Text style={styles.title}>Behavior</Text>
            </View>

            {students.map(student => {
                return (
                    <View key={student.id} style={styles.items}>
                        <Text style={styles.text}>{student.name}</Text>
                        <Text style={styles.text}>{student.school}</Text>
                        <TouchableOpacity onPress={()=>showDialog(student.id)} style={{
                            backgroundColor: '#608d56',
                            borderRadius: 2, padding: 4, width: 130, margin: 2
                        }}>
                            <Text style={{ textAlign: 'center' }}>Leave Comment</Text>
                        </TouchableOpacity>
                    </View>
                )

            })}
           
            




        </KeyboardAvoidingView>

    )
}

export default TeachingPage

const styles = StyleSheet.create({
    box: {
        marginLeft: 60
    },
    text: {
        padding: 7,
        flex: 1
    },
    items: {
        flexDirection: "row"

    },

    background: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5

    },
    title: {
        fontSize: 22,
        padding: 15,
        flex: 1
    }, button: {
        backgroundColor: '#608d56',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        width: 220
    },
    button: {
        backgroundColor: '#608d56',
        borderRadius: 5,
        padding: 10,
        width: 200,
        margin: 5
    },
    

});