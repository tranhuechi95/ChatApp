import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

function ProfileScreen({ route, navigation }) {
    const db = firestore().collection('testNewProfile');
    const [profileContent, setProfileContent] = useState({profileAvatar: '', name: "Edit name", age: "edit age", tel: "add phone number", email: "add your email", description: "Something interesting about U!"});
    const profileId = route?.params?.profileId ? route.params.profileId : ''; // receive from ProfileEdit screen
  
    useEffect(() => { // get from database
      if (profileId != '') {
        db.doc(profileId).onSnapshot((snapshot) => {
          const snapshotData = snapshot.data()
          if (!(snapshotData.profileAvatar.url == profileContent.profileAvatar.url
            && snapshotData.name === profileContent.name
            && snapshotData.age === profileContent.age
            && snapshotData.tel === profileContent.tel
            && snapshotData.email === profileContent.email
            && snapshotData.description === profileContent.description))
          {
            console.log("Old data: " + JSON.stringify(profileContent));
            console.log("New data: " + JSON.stringify(snapshotData));
            setProfileContent(snapshotData);
          }
        })
      }
    }, [profileContent, profileId]);
    
    const editButtonHandler = () => {
      navigation.navigate('ProfileEdit', { profileId : profileId, content : profileContent}); // pass to the ProfileEdit screen
    };
    
    let ProfileAvatar;
    if (profileContent.profileAvatar != '') {
      ProfileAvatar = <Image style={styles.imageContainer} source={profileContent.profileAvatar.url} />
    } else {
      ProfileAvatar = <Image style={styles.imageContainer} source={require('../Static/Images/profileTemplate3.png')} />
    }
    const name = profileContent.name;
    const age = profileContent.age;
    const tel = profileContent.tel;
    const email = profileContent.email;
    const description = profileContent.description;
    console.log("profileId in ProfileScreen is " + profileId);
    
    return (
      <View style={styles.mainScreen}>
        <View style={styles.photoContainer}>
          {ProfileAvatar}
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.nameAgeEditContainer}>
            <View style={styles.nameAgeContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.age}>{age}</Text>
            </View>
            <TouchableHighlight style={styles.editIconContainer}>
              <MaterialCommunityIcons name="account-edit" size={30} color='#595959' onPress={editButtonHandler}/>
            </TouchableHighlight>
          </View>
          <View style={styles.infoContainer}> 
          {/* for phone and email*/}
            <View style={styles.contactsContainer}>
              <MaterialCommunityIcons name="cellphone-iphone" size={25} style={styles.iconContainter}/>
              <Text style={styles.infoText}>{tel}</Text>
            </View>
            <View style={styles.contactsContainer}>
              <MaterialCommunityIcons name="email" size={25} style={styles.iconContainter}/>
              <Text style={styles.infoText}>{email}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{description}</Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  mainScreen: {
      flex: 1, 
      backgroundColor: 'lightblue',
  },
  photoContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 430,
    height: 350,
    resizeMode: 'cover'
  },
  nameAgeEditContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  nameAgeContainer: {
    width: 330,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'baseline',
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
  editIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  iconContainter: {
    color: 'blue',
    marginRight: 5,
  },
  infoContainer: {
    padding: 15,
  },
  infoText: {
    fontSize: 20,
    color: 'gray',
    paddingLeft: 10,
  },
  descriptionContainer: {
    flex: 3, 
    backgroundColor: 'white',
    padding: 5,  
  },
  container: {
    flex: 0.5, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;

// the edit screen will be a Modal that appears and edit the content!