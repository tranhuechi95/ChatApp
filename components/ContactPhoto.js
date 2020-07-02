import React, { useState } from 'react';
import { View, Image, FlatList, StyleSheet, Button, Dimensions } from 'react-native';
import Header from './Header';
import { ActionSheet, Root } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('window').width;
const PhotoScreen = () => {
    
    const [photoList, setPhotoList] = useState([]);

    const onSelectedImage = (image) => {
        const source = {url: image.path};
        let item = {
            id: Date.now(),
            url: source,
            content: image.data
        }
        setPhotoList(currentList => [...currentList, item]);
    };
    const takePhotoHandler = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
              onSelectedImage(image);
            console.log(image);
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
              onSelectedImage(image);
            console.log(image);
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
    const renderItem = ({item, index}) => {
        return (
            <View style={styles.imageViewContainer}>
                <Image source={item.url} style={styles.imageContainer}/>
            </View>
        )    
    };
    return (
        <Root>
            <View style={styles.mainScreen}>
                <Header header='Photo Screen' style={styles.header}/>
                <FlatList style={styles.photoContainer}
                    data={photoList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Button title='Select a photo' onPress={selectPhotoHandler}/>
            </View>
        </Root>
        
    )
};

const styles = StyleSheet.create({
    mainScreen: {
        backgroundColor: 'pink',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageViewContainer: {
        borderRadius: 8,
        padding: 10,
    },
    imageContainer: {
        height: 250,
        width: width - 60,
        borderRadius: 8,
        borderWidth: 1,
        resizeMode: 'contain',
    }
});

export default PhotoScreen;
