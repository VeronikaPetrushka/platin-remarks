import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, Alert, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Add = ({ type }) => {
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [title, setTitle] = useState(null);
    const [note, setNote] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const loadTags = async () => {
            try {
                const storedTags = await AsyncStorage.getItem("tags");
                if (storedTags) {
                    setTags(JSON.parse(storedTags));
                }
            } catch (error) {
                console.error("Failed to load tags:", error);
            }
        };
        loadTags();
    }, []);

    const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;

    const showDatePicker = () => {
        if(showPicker) {
            setShowPicker(false)
        } else {
            setShowPicker(true)
        }
    };

    const onChange = (event, selectedDate) => {
        setShowPicker(Platform.OS === "ios");
        if (selectedDate) setDate(selectedDate);
    };

    const uploadImage = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: "photo", quality: 0.8 }, ({ assets, errorMessage }) => {
                    if (errorMessage) reject(errorMessage);
                    else resolve(assets?.[0]?.uri || null);
                });
            });
    
            if (result) setImage(result);
        } catch (error) {
            Alert.alert("Error", "Failed to select image.");
        }
    };      

    const handleAddNote = async () => {
        if (!title || !note) return;
    
        const noteData = {
            title,
            note,
            tag: selectedTag,
            date,
        };
    
        if (type === "Advanced note" && image) {
            noteData.image = image;
        }
    
        const storageKey = type === "Quick note" ? "quickNotes" : "advancedNotes";
    
        try {
            const existingNotes = await AsyncStorage.getItem(storageKey);
            const notesArray = existingNotes ? JSON.parse(existingNotes) : [];
    
            notesArray.push(noteData);
            await AsyncStorage.setItem(storageKey, JSON.stringify(notesArray));

            console.log(notesArray)

            Alert.alert("Success", "Note saved successfully!");
    
            setTitle(null);
            setNote(null);
            setSelectedTag(null);
            setImage(null);

        } catch (error) {
            Alert.alert("Error", "Failed to save note. Please try again.");
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.upperContainer}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Text style={styles.upperText}>PLATIN REMARKS</Text>
            </View>

            <TouchableOpacity style={styles.titleContainer} onPress={showDatePicker}>
                <Text style={styles.title}>{type}: {formattedDate}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker 
                    value={date} 
                    mode="date" 
                    display="spinner" 
                    themeVariant="dark"
                    onChange={onChange} 
                />
            )}

            <Text style={[styles.title, {marginBottom: 12}]}>Tags:</Text>

            <ScrollView horizontal style={{ maxHeight: 60, marginBottom: 20 }}>
                {tags.map((tag, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[styles.tagBtn, { backgroundColor: tag.color }, selectedTag === tag && {borderWidth: 3, borderColor: '#fdac03'}]} 
                        onPress={() => setSelectedTag(tag)}
                        >
                        <Text style={styles.tagText}>{tag.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView style={{width: '100%'}}>
                <View style={styles.noteContainer}>
                    <View style={styles.noteUpperContainer}>
                        <TextInput
                            style={[styles.input, {fontWeight: '700'}]}
                            value={title}
                            onChangeText={setTitle}
                            autoFocus
                            placeholder="Title..."
                            placeholderTextColor="#fff"
                        />
                    </View>
                    <View style={{padding: 12}}>
                        <TextInput
                            style={styles.input}
                            value={note}
                            onChangeText={setNote}
                            multiline
                            placeholder="Enter note"
                            placeholderTextColor="#fff"
                        />
                        {type === 'Advanced note' && (
                            <TouchableOpacity style={[styles.attachBtn, !image && {backgroundColor: '#394f7a'}]} onPress={uploadImage}>
                                <Icons type={'attach'} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.noteBtn, {backgroundColor: '#4b6392', marginBottom: 12}]}
                    onPress={handleAddNote}
                    >
                    <Text style={styles.noteBtnText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A2231',
        paddingHorizontal: 31
    },

    upperContainer: {
        width: '100%',
        paddingTop: height * 0.07,
        paddingHorizontal: 42,
        paddingBottom: 23,
        backgroundColor: '#0d3046',
        borderWidth: 1,
        borderBottomColor: '#4b6392',
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    logo: {
        width: 45,
        height: 43,
        resizeMode: 'contain'
    },

    upperText: {
        fontSize: 22,
        fontWeight: '900',
        fontStyle: 'italic',
        lineHeight: 26.23,
        color: '#fff'
    },

    titleContainer: {
        width: '100%',
        padding: 18,
        backgroundColor: '#0d3046',
        borderColor: '#4b6392',
        borderWidth: 1,
        borderRadius: 22,
        marginBottom: 21,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
        color: '#fff'
    },

    input: {
        width: '100%',
        color: '#fff',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19.4
    },

    settingsBtn: {
        width: 54,
        height: 54,
        padding: 14,
        borderRadius: 14,
        borderColor: '#4b6392',
        borderWidth: 1
    },

    tagBtn: {
        height: 52,
        paddingVertical: 15,
        paddingHorizontal: 36,
        borderRadius: 22,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tagText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
        color: '#000'
    },

    noteContainer: {
        width: '100%',
        backgroundColor: '#0d3046',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 12
    },

    noteUpperContainer: {
        width: '100%',
        backgroundColor: '#4b6392',
        paddingVertical: 16,
        paddingHorizontal: 10,
    },

    noteTitle: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
        color: '#fff'
    },

    noteText: {
        fontSize: 16,
        fontWeight: '300',
        lineHeight: 19.4,
        color: '#fff',
        textAlign: 'center',
        width: '85%',
        alignSelf: 'center'
    },

    noteBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 19,
        borderRadius: 22
    },

    noteBtnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
        color: '#fff'
    },

    attachBtn: {
        width: 54,
        height: 54,
        padding: 14,
        borderRadius: 14,
        backgroundColor: '#4788ff',
        marginTop: 20,
    }

})

export default Add;