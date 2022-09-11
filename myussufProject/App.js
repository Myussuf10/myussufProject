import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {

  StyleSheet, Text,

} from 'react-native';
import Login from './components/Login.js';
import Comments from './components/Forms/Comments.js';
import ForgotPassword from './components/ForgotPassword.js';
import ParentsHome from './components/ParentsHome'
import Parent from './components/Parent.js';
import SignUp from './components/Forms/SignUp.js';
import AddParent from './components/AddParent.js';
import Admin from './components/Admin.js';
import AddTeacher from './components/AddTeacher.js';
import TeacherHome from './components/TeacherHome.js';
import SetUpClasses from './components/SetUpClasses.js';
import NewSubject from './components/NewSubject';
import Attendance from './components/util/Attendance.js';
import TeachingPage from './components/util/TeachingPage.js';
import Header from './components/Header.js';
import { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SubjectPage from './components/SubjectPage.js';
import { useEffect } from 'react';
import AuthProvider from './components/store/AuthContext.js';
import { AuthContext } from './components/store/AuthContext.js'
import LoadingOverlay from './components/util/LoadingSpinner.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Subject from './components/Subject.js';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#608d56' },
  HeaderTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

function ParentStack() {
  const authCtx = useContext(AuthContext)
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name="Parent's Home Page" component={ParentsHome} options={{
        headerRight: () => <Icon name='logout' size={30} onPress={authCtx.logout} />
      }} />
      <Stack.Screen name= "SubjectPage" component={SubjectPage}/>
      <Stack.Screen name="Subject" component={Subject}/>

    </Stack.Navigator>
  )

}

function AdminStack() {
  const authCtx = useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>

      <Stack.Screen name="Admin" component={Admin} options={{
        headerRight: () => <Icon name='logout' size={30} onPress={authCtx.logout} />
      }} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="AddParent" component={AddParent} />
      <Stack.Screen name="AddTeacher" component={AddTeacher} />
      <Stack.Screen name="Parent" component={Parent} />
      <Stack.Screen name="NewSubject" options={{ title: "New Subject" }} component={NewSubject} />
      <Stack.Screen name="SetUpClasses" options={{ title: "Classes" }} component={SetUpClasses} />
    </Stack.Navigator>
  )

}

function TeacherStack() {
  const authCtx = useContext(AuthContext)
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>


      <Stack.Screen name="Teacher's Home Page" component={TeacherHome} options={{
        headerRight: () => <Icon name='logout' size={30} onPress={authCtx.logout} />
      }} />
      <Stack.Screen name='Comments' component={Comments} />
      <Stack.Screen name="TeachingPage" component={TeachingPage} />
      <Stack.Screen name="Attendance" component={Attendance} />


    </Stack.Navigator>
  )
}


function Navigation() {
  const authCtx = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false)

  // useEffect(() => {
  //   let isMounted = true
  //   async function getuser() {
  //     try {
  //       const role = await AsyncStorage.getItem('role');
  //       if (isMounted) {
  //         setRole(role)
  //       }

  //     } catch (error) {

  //     }
  //   }
  //   getuser()
  //   return () => { isMounted = false }

  // }, [])

  // if (isMounted) {
  //   return <LoadingOverlay />
  // }
  const RoleViews = {
    ROLE_ADMIN: AdminStack,
    ROLE_TEACHER: TeacherStack,
    ROLE_PARENT: ParentStack,
    Auth: AuthStack
  }

  let role = authCtx.role
  const RoleSpecificView = (role === "ROLE_TEACHER") ? RoleViews["ROLE_TEACHER"]
    : (role === "ROLE_PARENT") ? RoleViews["ROLE_PARENT"] : RoleViews["ROLE_ADMIN"];

  //const RoleSpecificView = RoleViews["ROLE_TEACHER"] ?? <AuthStack/>

  return (

    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <RoleSpecificView />}
    </NavigationContainer>
  )
}
export default function App() {
  return (
    // <AuthContext>
    //   <NavigationContainer>
    //     <AuthStack />
    //     {/* <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName="Login">
    //     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    //   </Stack.Navigator> */}
    //   </NavigationContainer>
    // </AuthContext>
    <AuthProvider>
      <Navigation />
    </AuthProvider>

  );
};

const styles = StyleSheet.create({});

