import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SinglePhotoScreen = ({ route }) => {
    const photo = route.params.photo;
    return (
        <View style={styles.mainscreen}>
            <Image source={photo.url} style={styles.photoContainer}/>
        </View>
    )
};

const styles = StyleSheet.create({
    mainscreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoContainer: {
        height: 500,
        width: 500,
        borderRadius: 8,
        resizeMode: 'contain',
    }
});

export default SinglePhotoScreen;