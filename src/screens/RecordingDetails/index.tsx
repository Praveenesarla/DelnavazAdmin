/* eslint-disable prettier/prettier */
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppIcon from '../../assets/splash/AppIcon';
import Notification from '../../assets/icons/Notification';
import {s, vs} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import ImagePicker from '../../assets/icons/ImagePicker';
import AppButton from '../../components/AppButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const data = [
  {label: 'History', value: 'History'},
  {label: 'Comedy', value: 'Comedy'},
  {label: 'Literature', value: 'Literature'},
  {label: 'Biography', value: 'Biography'},
  {label: 'Mysticismا', value: 'Mysticismا'},
  {label: 'English', value: 'English'},
  {label: 'Children', value: 'Children'},
  {label: 'Interview', value: 'Interview'},
];

const RecordingDetails = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          {value ? value : 'Select Category'}
        </Text>
      );
    }
    return null;
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const submitRecording = () => {
    navigation.navigate('recording', {
      name: name,
      description: description,
      category: value,
      image: selectedImage,
    });
  };

  console.log(
    'name',
    name,
    'description',
    description,
    'image',
    selectedImage,
    'value',
    value,
  );

  return (
    <KeyboardAvoidingView style={{paddingHorizontal: 15, flex: 1}}>
      <View style={styles.container}>
        <AppIcon width={48} height={48} />
        <Notification />
      </View>
      <View style={{alignItems: 'center', flex: 1}}>
        <View>
          <Text style={styles.startRecordingText}>Start Recording</Text>
          <View>
            <Text style={styles.firstLabel}>Name of the recording</Text>
            <TextInput
              placeholder="Name of the recording"
              style={styles.firstInput}
              onChangeText={setName}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.firstLabel}>Description</Text>
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Name of the recording"
              style={styles.secondInput}
              onChangeText={setDescription}
            />
          </View>
        </View>
        <View style={styles.thirdInput}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus && 'Select Category'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={styles.firstLabel}>Banner Image</Text>
          <Pressable style={styles.fourthInput} onPress={openImagePicker}>
            <Text style={{fontFamily: 'Inter-Regular', color: '#C6C6C6'}}>
              Upload Image
            </Text>
            <ImagePicker />
          </Pressable>
        </View>
        <View style={{marginTop: 'auto', marginBottom: 10}}>
          <AppButton
            text="Start Recording"
            backgroundColor="#FF0642"
            onPress={submitRecording}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RecordingDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: s(20),
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 382,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  startRecordingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#251605',
  },
  firstLabel: {
    color: '#424242',
    fontFamily: 'Inter-Regular',
    marginVertical: 10,
  },
  firstInput: {
    width: 382,
    borderColor: '#C6C6C6',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  secondInput: {
    width: 382,
    borderColor: '#C6C6C6',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    minHeight: 150,
    textAlign: 'left',
    borderRadius: 5,
  },
  thirdInput: {
    marginTop: 15,
  },
  fourthInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 382,
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderColor: '#C6C6C6',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
