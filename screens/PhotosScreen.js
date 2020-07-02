import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { ActionSheet, Root } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

// const width = Dimensions.get('window').width;
const PhotoScreen = ({ navigation }) => {
    const [photoList, setPhotoList] = useState([]);
    // each group will consist of 3 photos.
    const [photoGroups, setPhotoGroups] = useState([]);

    // useEffect(() => {
    //     console.log("Current photo list " + photoList.length);
    //     if (photoList.length > 0 && addingPhoto) {
    //         const currentPhotoGroups = [];
    //         for (var i = photoList.length - 1; i >= 0; i -= 3) {
    //             const singlePhotoGroup = [];
    //             if (i >= 2) {
    //                 for (var j = 0; j < 3; j++) {
    //                     singlePhotoGroup.push(photoList[i - j]);
    //                 }   
    //             } else {
    //                 if (i == 1) {
    //                     singlePhotoGroup.push(photoList[i]);
    //                     singlePhotoGroup.push(photoList[i - 1]);
    //                     singlePhotoGroup.push({url: ''});
    //                 } else if (i == 0) {
    //                     singlePhotoGroup.push(photoList[i]);
    //                     singlePhotoGroup.push({url: ''});
    //                     singlePhotoGroup.push({url: ''});
    //                 }
    //             }
    //             currentPhotoGroups.push(singlePhotoGroup);
    //             console.log("Single photo group " + singlePhotoGroup.length);
    //         }
    //         console.log("Current photo groups " + currentPhotoGroups.length);
    //         setPhotoGroups(currentPhotoGroups);
    //         console.log("Photo group " + photoGroups.length);
    //         setAddingPhoto(false);
    //     }   
    // }, [photoList, addingPhoto, photoGroups]);

    const breakIntoGroup = (currPhotoList) => {
        if (currPhotoList.length > 0) {
            const currentPhotoGroups = [];
            for (var i = currPhotoList.length - 1; i >= 0; i -= 3) {
                const singlePhotoGroup = [];
                if (i >= 2) {
                    for (var j = 0; j < 3; j++) {
                        singlePhotoGroup.push(currPhotoList[i - j]);
                    }   
                } else {
                    if (i == 1) {
                        singlePhotoGroup.push(currPhotoList[i]);
                        singlePhotoGroup.push(currPhotoList[i - 1]);
                        singlePhotoGroup.push({url: ''});
                    } else if (i == 0) {
                        singlePhotoGroup.push(currPhotoList[i]);
                        singlePhotoGroup.push({url: ''});
                        singlePhotoGroup.push({url: ''});
                    }
                }
                currentPhotoGroups.push(singlePhotoGroup);
                console.log("Single photo group " + singlePhotoGroup.length);
            }
            console.log("Current photo groups " + currentPhotoGroups.length);
            setPhotoGroups(currentPhotoGroups);
            console.log("Photo group " + photoGroups.length);
        }
    };

    const onSelectedImage = (image) => {
        const source = {url: image.path};
        let item = {
            id: Date.now(),
            url: source,
            content: image.data
        }
        const currPhotoList = [...photoList, item];
        console.log("Lenght of currPhotoList: " + currPhotoList.length);
        setPhotoList(currentList => [...currentList, item]);
        breakIntoGroup(currPhotoList);
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

    const selectPhotoHandler = () =>{
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

    /** To delete photo functions */

    const deletePhotoHandler = (id) => {
        setPhotoList(photoList.filter(photo => photo.id != id));
    };

    const photoPressHandler = (id) => {
        Alert.alert('Delete', 'I want to delete the photo', 
        [{text: "Delete", onPress: () => deletePhotoHandler(id), style: 'destructive'}, {text: "Cancel"}]);
    };

    /** end delete photo functions */

    /** View the photo function */
    const viewPhotoHandler = (id) => {
        const thisPhoto = photoList.filter(photo => photo.id == id)[0]; // filter from photoList return an array
        navigation.navigate('Photo', { photo : thisPhoto});
    }

    /** end view photo function */

    const renderItem = ({item, index}) => {
        // each item is a group of 3 photos
        // loop through each photo to display the photo
        const photoGroup = item.map((photo) => {
            <Text>photo is here</Text>
        });
        return (
            <View style={styles.photoGroup}>
                {photoGroup}
            </View>
            // <TouchableOpacity onLongPress={photoPressHandler.bind(this, item.id)} onPress={viewPhotoHandler.bind(this, item.id)}>
            //             <View style={styles.imageViewContainer}>
            //                 {photo != '' ? 
            //                 <Image source={photo.url} style={styles.imageContainer}/> : 
            //                 <Text>Nothing</Text>}    
            //             </View>
            //         </TouchableOpacity> 



            // <TouchableOpacity onLongPress={photoPressHandler.bind(this, item.id)} onPress={viewPhotoHandler.bind(this, item.id)}>
            // <View style={styles.imageViewContainer}>
            //     <Image source={item.url} style={styles.imageContainer}/>
            // </View>
            // </TouchableOpacity> 
              
        )
    };

    let PhotoDisplay; 
    if (photoList.length > 0) {
        PhotoDisplay = 
            <FlatList style={styles.photoContainer}
                data={photoGroups}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />   
    } else {
        PhotoDisplay =
            <View style={styles.emptyPhotoContainer}>
                <Icon name="photo" size={60} color='gray'/>
                <Text style={styles.emptyPhotoText}>No photos yet!</Text>
            </View>
    }
    
    return (
        <Root>
            <View style={styles.mainScreen}>
                {PhotoDisplay}
                <Button title='Select a photo' onPress={selectPhotoHandler}/>
            </View>
        </Root>
        
    )
};

const styles = StyleSheet.create({
    mainScreen: {
        backgroundColor: 'pink',
        flex: 1,
    },
    emptyPhotoContainer: {
        flex: 9,
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyPhotoText: {
        fontSize: 20,
        padding: 10,
        color: 'gray',
    },
    photoGroup: {
        flexDirection: 'row',
    },
    photoContainer: {
        flex: 9,
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    imageViewContainer: {
        borderRadius: 8,
        padding: 5,
    },
    imageContainer: {
        height: 100,
        width: 100,
        borderRadius: 8,
        resizeMode: 'cover',
    }
});

export default PhotoScreen;
