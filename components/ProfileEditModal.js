import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Image, TouchableWithoutFeedback, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { ActionSheet, Root } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileEditModal = ({ route, navigation }) => {
  const db = firestore().collection('testNewProfile');
  // receive from ProfileScreen
  const { content, profileId } = route.params;
  const [ thisProfileId, setThisProfileId ] = useState(profileId);
  const [ profilePhoto, setProfilePhoto ] = useState(content.profileAvatar);
  const [ username, setUsername ] = useState(content.name);
  const [ userAge, setUserAge ] = useState(content.age);
  const [ userTel, setUserTel ] = useState(content.tel);
  const [ userEmail, setUserEmail ] = useState(content.email);
  const [ userDescription, setUserDescription ] = useState(content.description);

  const nameChangeHandler = (input) => {
    setUsername(input);
  };
  const ageChangeHandler = (input) => {
    setUserAge(input);
  };
  const telChangeHandler = (input) => {
    setUserTel(input);
  };
  const emailChangeHandler = (input) => {
    setUserEmail(input);
  };
  const descriptionChangeHandler = (input) => {
    setUserDescription(input);
  };

  /** Funtions to select image  */
  const onSelectedImage = (image) => {
    const source = {url: image.path};
    let item = {
        id: Date.now(),
        url: source,
        content: image.data
    }
    setProfilePhoto(item);
  };
  const takePhotoHandler = () => {
      ImagePicker.openCamera({
          width: 430,
          height: 350,
          cropping: true,
        }).then(image => {
            onSelectedImage(image);
          console.log(image);
      });
  };

  const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
          width: 430,
          height: 350,
          cropping: true
        }).then(image => {
            onSelectedImage(image);
          console.log(image);
      });
  };

  const setProfilePhotoHandler = () =>{
      const BUTTONS = ['Take Photo', 'Choose from Photo Library', 'Cancel'];
      ActionSheet.show(
          {options: BUTTONS, cancelButtonIndex: 2, title: 'Select a photo'},
          (buttonIndex) => {
              switch (buttonIndex) {
                  case 0: 
                      takePhotoHandler();
                      break;   
                  case 1: 
                      choosePhotoFromLibrary();
                      break;    
                  default: break
              }
          })
  };
  
  /** End functions to select images */
  // console.log("ProfileId in ProfileEdit is " + thisProfileId);

  let ProfileAvatar;
    if (profilePhoto != '') {
      ProfileAvatar = 
      <TouchableOpacity onPress={setProfilePhotoHandler}>
        <Image style={styles.imageContainer} source={profilePhoto.url} />
      </TouchableOpacity>
    } else {
      ProfileAvatar = 
      <TouchableOpacity onPress={setProfilePhotoHandler}>
        <Image style={styles.imageContainer} source={require('../Static/Images/profileTemplate3.png')} />
      </TouchableOpacity>
    }

  const userEditContent = {profileAvatar: profilePhoto, name: username, age: userAge, tel: userTel, email: userEmail, description: userDescription};

  const doneEditHandler = () => {
    if (thisProfileId == '') {
      db
        .add(userEditContent)
        .then(function(docRef) {
          setThisProfileId(docRef.id)
          // console.log('my id from db is ' + docRef.id)
          navigation.navigate('Profile', { profileId: docRef.id }); // navigate back
        })
    } else {
      db
        .doc(thisProfileId)
        .update(userEditContent)
        navigation.navigate('Profile', { profileId: thisProfileId }); // navigate back
    }
  };
  
  return (
    <Root>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainScreen}>
          <View style={styles.photoContainer}>
              {ProfileAvatar}
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.nameAgeContainer}>
                  <TextInput placeholder={content.name} style={styles.name} onChangeText={nameChangeHandler} value={username}/>
                  <TextInput placeholder={content.age} style={styles.age} keyboardType='number-pad' onChangeText={ageChangeHandler} value={userAge} />
            </View>
            <View style={styles.infoContainer}> 
            {/* for phone and email*/}
                <View style={styles.contactsContainer}>
                  <MaterialCommunityIcons name="cellphone-iphone" size={25} style={styles.iconContainter}/>
                  <TextInput placeholder={content.tel} style={styles.infoText} keyboardType='phone-pad' onChangeText={telChangeHandler} value={userTel}/>
                </View>
                <View style={styles.contactsContainer}>
                  <MaterialCommunityIcons name="email" size={25} style={styles.iconContainter}/>
                  <TextInput placeholder={content.email} style={styles.infoText} keyboardType='email-address' onChangeText={emailChangeHandler} value={userEmail}/>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <TextInput placeholder={content.description} multiline style={styles.infoText} onChangeText={descriptionChangeHandler} enablesReturnKeyAutomatically maxLength={150} value={userDescription}/>
            </View>
          </View>
          <View style={styles.container}>
              <Button title='Done' onPress={doneEditHandler}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Root>  
  );
};

const styles = StyleSheet.create({
    keyboardAware: {
      flex: 1,
    },
    mainScreen: {
        flex: 1, 
    },
    photoContainer: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      width: 430,
      height: 350,
      resizeMode: 'cover',
    },
    nameAgeContainer: {
      flexDirection: 'row',
      padding: 20,
      alignItems: 'baseline',
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      marginRight: 10,
    },
    age: {
      fontSize: 20,
      color: 'gray',
    },
    contactsContainer: {
      flexDirection: 'row',
      margin: 5,
    },
    iconContainter: {
      color: 'blue',
    },
    infoContainer: {
      padding: 15,
    },
    infoText: {
      fontSize: 20,
      color: 'gray',
      paddingLeft: 10,
      width: 370,
    },
    descriptionContainer: {
      // flex: 3, 
      height: 320,
      backgroundColor: 'white',
      padding: 5,
    },
    container: {
      // flex: 0.5, 
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 10,
    },
});

export default ProfileEditModal; 