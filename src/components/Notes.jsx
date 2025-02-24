import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Notes = () => {
    const [tags, setTags] = useState([]);
    const [showTags, setShowTags] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [quickFiltered, setQuickFiltered] = useState([]);
    const [advancedFiltered, setAdvancedFiltered] = useState([]);

    useEffect(() => {
        loadTags();
        loadNotes();
    }, [selectedTag]); 

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
            let quickNotes = await AsyncStorage.getItem("quickNotes");
            let advancedNotes = await AsyncStorage.getItem("advancedNotes");
    
            quickNotes = quickNotes ? JSON.parse(quickNotes) : [];
            advancedNotes = advancedNotes ? JSON.parse(advancedNotes) : [];
    
            if (selectedTag) {
                quickNotes = quickNotes.filter(note => note.tag?.name === selectedTag.name);
                advancedNotes = advancedNotes.filter(note => note.tag?.name === selectedTag.name);
            }
    
            quickNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
            advancedNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    
            setQuickFiltered(quickNotes);
            setAdvancedFiltered(advancedNotes);
        } catch (error) {
            console.error("Failed to load notes:", error);
        }
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

            <ScrollView style={{width: '100%'}}>

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Quick notes</Text>
                    </View>
                    <TouchableOpacity style={[styles.settingsBtn, tags.length === 0 && {opacity: 0.5}]} onPress={handleShowTags} disabled={tags.length === 0}>
                        <Icons type={'filter'} />
                    </TouchableOpacity>
                </View>

                {
                    quickFiltered.length > 0 && (
                        <View>
                            {
                                quickFiltered.map((note, index) => (
                                    <View key={index} style={{width: '100%', marginBottom: 20, alignSelf: 'center', overflow: 'hidden', borderRadius: 16, backgroundColor: '#fff' }}>
                                        <View style={[styles.noteUpperContainer, {backgroundColor: '#fdac03', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                                            <Text style={[styles.noteTitle, {color: '#000'}]}>{note.title}</Text>
                                            <Text style={[styles.noteTitle, {color: '#000'}]}>{note.tag?.name}</Text>
                                        </View>
                                        <View style={{width: '100%', padding: 10}}>
                                            <Text style={[styles.noteText, {color: '#000', textAlign: 'left'}]}>{note.note}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    )
                }

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20}}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Advanced notes</Text>
                    </View>
                    <TouchableOpacity style={[styles.settingsBtn, tags.length === 0 && {opacity: 0.5}]} onPress={handleShowTags} disabled={tags.length === 0}>
                        <Icons type={'filter'} />
                    </TouchableOpacity>
                </View>

                {
                    advancedFiltered.length > 0 && (
                        <View>
                            {
                                advancedFiltered.map((note, index) => (
                                    <View key={index} style={{width: '100%', marginBottom: 20, alignSelf: 'center', overflow: 'hidden', borderRadius: 16, backgroundColor: '#fff' }}>
                                        <View style={[styles.noteUpperContainer, {backgroundColor: '#fdac03', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                                            <Text style={[styles.noteTitle, {color: '#000'}]}>{note.title}</Text>
                                            <Text style={[styles.noteTitle, {color: '#000'}]}>{note.tag?.name}</Text>
                                        </View>
                                        <View style={{width: '100%', padding: 10}}>
                                            <Text style={[styles.noteText, {color: '#000', textAlign: 'left'}]}>{note.note}</Text>
                                            {note.image && <Image source={{uri: note.image}} style={styles.noteImage} />}
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    )
                }

                <View style={{height: 100}} />

            </ScrollView>
                
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

    titleContainer: {
        width: '80%',
        padding: 18,
        backgroundColor: '#0d3046',
        borderColor: '#4b6392',
        borderWidth: 1,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19.4,
        color: '#fff'
    },

    settingsBtn: {
        width: 54,
        height: 54,
        padding: 14,
        borderRadius: 14,
        borderColor: '#4b6392',
        borderWidth: 1,
        backgroundColor: '#0d3046',
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

    noteImage: {
        width: '50%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 16,
        marginTop: 20
    }

})

export default Notes;