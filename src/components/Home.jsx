import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [latestNote, setLatestNote] = useState(null);

    useEffect(() => {
        loadTags();
        loadNotes();
    }, [date, selectedTag]); 

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

    const loadNotes = async () => {
        try {
            const quickNotes = await AsyncStorage.getItem("quickNotes");
            const advancedNotes = await AsyncStorage.getItem("advancedNotes");

            let allNotes = [
                ...(quickNotes ? JSON.parse(quickNotes) : []),
                ...(advancedNotes ? JSON.parse(advancedNotes) : [])
            ];

            const formattedSelectedDate = date.toISOString().split("T")[0];

            allNotes = allNotes.filter(note => {
                const noteDate = new Date(note.date).toISOString().split("T")[0];
                return noteDate === formattedSelectedDate;
            });

            if (selectedTag) {
                allNotes = allNotes.filter(note => note.tag?.name === selectedTag.name);
            }

            allNotes.sort((a, b) => new Date(b.date) - new Date(a.date));

            setLatestNote(allNotes.length > 0 ? allNotes[0] : null);
        } catch (error) {
            console.error("Failed to load notes:", error);
        }
    };

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

    const handleShowTags = () => {
        if(showTags) {
            setShowTags(false)
        } else {
            setShowTags(true)
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.upperContainer}>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Text style={styles.upperText}>PLATIN REMARKS</Text>
            </View>

            <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20}}>
                <TouchableOpacity style={[styles.settingsBtn, tags.length === 0 && {opacity: 0.5}]} onPress={handleShowTags} disabled={tags.length === 0}>
                    <Icons type={'settings'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateBtn} onPress={showDatePicker}>
                    <Text style={styles.dateBtnText}>{formattedDate}</Text>
                </TouchableOpacity>
                <View style={styles.starBtn}>
                    <Icons type={'star'} />
                </View>
            </View>

            {showTags && (
                <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12}}>
                    {tags.map((tag, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.tagBtn, { backgroundColor: tag.color }, selectedTag.name === tag.name && {borderWidth: 3, borderColor: '#fdac03'}]} 
                            onPress={() => setSelectedTag(tag)}
                            >
                            <Text style={styles.tagText}>{tag.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {showPicker && (
                <DateTimePicker 
                    value={date} 
                    mode="date" 
                    display="spinner" 
                    themeVariant="dark"
                    onChange={onChange} 
                />
            )}

            <View style={styles.noteContainer}>
                <View style={styles.noteUpperContainer}>
                    <Text style={styles.noteTitle}>Last note</Text>
                </View>
                {
                    latestNote ? (
                        <View style={{width: '80%', marginVertical: 20, alignSelf: 'center', overflow: 'hidden', borderRadius: 16, backgroundColor: '#fff' }}>
                            <View style={[styles.noteUpperContainer, {backgroundColor: '#fdac03', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                                <Text style={[styles.noteTitle, {color: '#000'}]}>{latestNote.title}</Text>
                                <Text style={[styles.noteTitle, {color: '#000'}]}>{latestNote.tag?.name}</Text>
                            </View>
                            <View style={{width: '100%', padding: 10}}>
                                <Text style={[styles.noteText, {color: '#000', textAlign: 'left'}]}>{latestNote.note}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={{width: '100%', padding: 30 }}>
                            <View style={{width: 32, height: 32, marginBottom: 12, alignSelf: 'center'}}>
                                <Icons type={'plus'} />
                            </View>
                            <Text style={styles.noteText}>There is no notes yet, you can add a new one</Text>
                        </View>
                    )
                }
            </View>

            <TouchableOpacity 
                style={[styles.noteBtn, {backgroundColor: '#4b6392', marginBottom: 12}]}
                onPress={() => navigation.navigate('AddScreen', { type: 'Quick note' })}
                >
                <Text style={styles.noteBtnText}>Quick note</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.noteBtn, {backgroundColor: '#fdac03'}]}
                onPress={() => navigation.navigate('AddScreen', { type: 'Advanced note' })}
                >
                <Text style={styles.noteBtnText}>Advanced note</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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

    settingsBtn: {
        width: 54,
        height: 54,
        padding: 14,
        borderRadius: 14,
        borderColor: '#4b6392',
        borderWidth: 1
    },

    dateBtn: {
        width: 192,
        height: 54,
        padding: 14,
        borderRadius: 14,
        borderColor: '#4b6392',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dateBtnText: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
        color: '#fff'
    },

    starBtn: {
        width: 54,
        height: 54,
        padding: 14,
        borderRadius: 14,
        backgroundColor: '#fdac03',
    },

    tagBtn: {
        paddingVertical: 17,
        paddingHorizontal: 36,
        borderRadius: 22,
        margin: 5
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
    }

})

export default Home;