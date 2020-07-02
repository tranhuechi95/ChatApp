import ImagePicker from 'react-native-image-crop-picker';

const onSelectedImageHelper = (image) => {
    const source = {url: image.path};
    let item = {
        id: Date.now(),
        url: source,
        content: image.data
    }
    return item;
};

const takePhotoHelper = () => {
    ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
          return image;
        //   onSelectedImage(image);
    });
};

const choosePhotoFromLibraryHelper = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true
      }).then(image => {
          return image;
        //   onSelectedImage(image);
    });
};

export { onSelectedImageHelper, takePhotoHelper, choosePhotoFromLibraryHelper };