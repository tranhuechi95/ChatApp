import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native';
import Header from './Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionSheet, Root } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

const ContactsAddModal = (props) => {
    const { visible, doneAddButton, cancel } = props;
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [relationship, setRelationship] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');

    const setFirstNameHandler = (input) => {
        setFirstname(input);
    };
    const setLastNameHandler = (input) => {
        setLastname(input);
    };
    const setRelationshipHandler = (input) => {
        setRelationship(input);
    };
    const setTelHandler = (input) => {
        setTel(input);
    };
    const setEmailHandler = (input) => {
        setEmail(input);
    };

    let contactPhoto;
    if (photo != '') {
        contactPhoto = <Image source={photo.url} style={styles.contactPhotoContainer}/>                         
    } else {
        contactPhoto = <Ionicons name='ios-contact' size={80} color='#8c8c8c'/>
    }

    /** FOR ADD CONTACT PHOTO HERE */

    const onSelectedImage = (image) => {
        const source = {url: image.path};
        let item = {
            id: Date.now(),
            url: source,
            content: image.data
        }
        setPhoto(item);
    };

    const takePhotoHandler = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
          }).then(image => {
              onSelectedImage(image);
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
          }).then(image => {
              onSelectedImage(image);
        });
    };

    const addPhotoHandler = () => {
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
        console.log("Add photo!")
    };

    /** END OF CODE FOR ADD CONTACT PHOTO */

    const cancelAddButtonHandler = () => {
        setPhoto('');
        cancel();
    };

    const doneAddButtonHandler = () => {
        // console.log('ContactInput ' + contactInput.firstName);
        if (contactInput.firstname.length > 0 && contactInput.lastname.length > 0 && contactInput.relationship.length > 0 && contactInput.tel.length > 0 && contactInput.email.length > 0) {
            doneAddButton(contactInput);
            setFirstname('');
            setLastname('');
            setRelationship('');
            setTel('');
            setEmail('');
            setPhoto('');
        } else {
            Alert.alert('Missing contact!', 'You did not key in the contact\'s details', [{text: 'Edit contact', style: 'cancel'}]);
            return;
        }
    };
    
    const contactInput = {contactPhoto: photo,isEditing: false, firstname: firstname, lastname: lastname, relationship: relationship, tel: tel, email: email};
    return (
        <Modal visible={visible} animationType='fade'>
            <Root>
                <View style={styles.mainScreen}>
                    <Header header='New Contact'/>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.screen}>
                            <View style={styles.photoNameContainer}>
                                <View style={styles.photoContainer}>
                                    <TouchableOpacity onPress={addPhotoHandler}>
                                        {contactPhoto}
                                        <Text style={styles.photoText}>Add photo</Text>
                                    </TouchableOpacity>   
                                </View>
                                <View style={styles.nameContainer}>
                                    <TextInput placeholder='First name' style={styles.nameTextContainer} onChangeText={setFirstNameHandler}/>
                                    <TextInput placeholder='Last name' style={styles.nameTextContainer} onChangeText={setLastNameHandler}/>
                                    <TextInput placeholder='Relationship' style={styles.nameTextContainer} onChangeText={setRelationshipHandler}/>
                                </View>
                            </View>
                            <View style={styles.contactDetailsContainer}>
                                <View style={styles.singleContactContainer}>
                                    <FontAwesome name='phone' size={30} color='green'/>
                                    <TextInput style={styles.contactTextContainer} placeholder='Add Mobile' keyboardType='phone-pad' onChangeText={setTelHandler}/>
                                </View>
                                <View style={styles.singleContactContainer}>
                                    <MaterialCommunityIcons name='email' size={30} color='green'/>
                                    <TextInput style={styles.contactTextContainer} placeholder='Add Email' keyboardType='email-address' onChangeText={setEmailHandler}/>
                                </View>
                            </View> 
                            <View style={styles.buttonContainer}>
                                <Button title='Done' onPress={doneAddButtonHandler}/>
                                <Button title='Cancel' color='red' onPress={cancelAddButtonHandler}/>
                            </View>   
                        </View>
                    </TouchableWithoutFeedback>  
                </View> 
            </Root>                
        </Modal>
    );
};
const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: 'pink',
    },
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    photoNameContainer: {
        flexDirection: 'row',
        marginVertical: 30,
        marginHorizontal: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
    },
    photoContainer: {
        paddingHorizontal: 10,
    },
    contactPhotoContainer: {
        height: 70,
        width: 70,
        marginVertical: 10,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    photoText: {
        color: '#147EFB',
        textAlign: 'center',
    },  
    nameContainer: {
        padding: 10,
    },
    nameTextContainer: {
        fontSize: 20,
        paddingVertical: 10,
        width: 250,
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1,
    },
    contactDetailsContainer: {
        marginBottom: 30,
        marginHorizontal: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        shadowOpacity: 0.5,
    },
    singleContactContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1,
    },
    contactTextContainer: {
        fontSize: 20,
        padding: 10,
        width: 250,       
    },
    descriptionContainer: {

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

export default ContactsAddModal;