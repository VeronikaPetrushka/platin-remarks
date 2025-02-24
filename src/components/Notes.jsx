import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Notes = () => {
    const [quickTags, setQuickTags] = useState([]);
    const [advancedTags, setAdvancedTags] = useState([]);
    const [showQuickTags, setShowQuickTags] = useState(false);
    const [showAdvancedTags, setShowAdvancedTags] = useState(false);
    const [quickTag, setQuickTag] = useState('All');
    const [advancedTag, setAdvancedTag] = useState('All');
    const [quickFiltered, setQuickFiltered] = useState([]);
    const [advancedFiltered, setAdvancedFiltered] = useState([]);

    useEffect(() => {
        loadNotes();
    }, []);

    useEffect(() => {
        loadNotes();
    }, [quickTag, advancedTag]); 

    const loadNotes = async () => {
        try {
            let quickNotes = await AsyncStorage.getItem("quickNotes");
            let advancedNotes = await AsyncStorage.getItem("advancedNotes");
    
            quickNotes = quickNotes ? JSON.parse(quickNotes) : [];
            advancedNotes = advancedNotes ? JSON.parse(advancedNotes) : [];
    
            const quickTagsSet = new Set(quickNotes.map(note => note.tag?.name).filter(Boolean));
            const advancedTagsSet = new Set(advancedNotes.map(note => note.tag?.name).filter(Boolean));
    
            setQuickTags(["All", ...quickTagsSet]); 
            setAdvancedTags(["All", ...advancedTagsSet]);
    
            if (quickTag !== "All") {
                quickNotes = quickNotes.filter(note => note.tag?.name === quickTag);
            }
            if (advancedTag !== "All") {
                advancedNotes = advancedNotes.filter(note => note.tag?.name === advancedTag);
            }
    
            quickNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
            advancedNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    
            setQuickFiltered(quickNotes);
            setAdvancedFiltered(advancedNotes);
        } catch (error) {
            console.error("Failed to load notes:", error);
        }
    };

    const deleteNote = async (type, noteToDelete) => {
        try {
            let notes = await AsyncStorage.getItem(type);
            notes = notes ? JSON.parse(notes) : [];
            const updatedNotes = notes.filter(note => note.note !== noteToDelete.note);

            await AsyncStorage.setItem(type, JSON.stringify(updatedNotes));
            loadNotes();
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };
        
    const handleQuickTags = () => {
        if(showQuickTags) {
            setShowQuickTags(false)
        } else {
            setShowQuickTags(true)
        }
    };

    const handleAdvancedTags = () => {
        if(showAdvancedTags) {
            setShowAdvancedTags(false)
        } else {
            setShowAdvancedTags(true)
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
                    <TouchableOpacity 
                        style={[styles.settingsBtn, quickTags.length === 0 && {opacity: 0.5}]} 
                        onPress={handleQuickTags} 
                        disabled={quickTags.length === 0}
                        >
                        <Icons type={'filter'} />
                    </TouchableOpacity>

                    {
                        showQuickTags && (
                            <View style={styles.tagsContainer}>
                                {quickTags.map((tag, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={[styles.tagBtn, quickTag === tag && styles.selectedTag,  index === quickTags.length - 1 && { borderBottomWidth: 0 }]} 
                                        onPress={() => setQuickTag(tag)}
                                    >
                                        <Text style={styles.tagBtnText}>{tag}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )
                    }

                </View>

                {
                    quickFiltered.length > 0 && (
                        <View style={{width: '100%'}}>
                            {
                                quickFiltered.map((note, index) => (
                                    <View key={index} style={{width: '100%', marginBottom: 20, alignSelf: 'center', overflow: 'hidden', borderRadius: 16, backgroundColor: '#fff' }}>
                                        <View style={[styles.noteUpperContainer, {backgroundColor: '#fdac03', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                                            <Text style={[styles.noteTitle, {color: '#000'}]}>{note.title}</Text>
                                            <Text style={[styles.noteTitle, {color: '#000'}]}>{note.tag?.name}</Text>
                                        </View>
                                        <View style={{width: '100%', padding: 10}}>
                                            <Text style={[styles.noteText, {color: '#000', textAlign: 'left'}]}>{note.note}</Text>

                                            <TouchableOpacity 
                                                style={styles.deleteBtn} 
                                                onPress={() => deleteNote('quickNotes', note)}
                                                >
                                                <Icons type={'trash'} />
                                            </TouchableOpacity>
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
                    <TouchableOpacity 
                        style={[styles.settingsBtn, advancedTags.length === 0 && {opacity: 0.5}]} 
                        onPress={handleAdvancedTags} 
                        disabled={advancedTags.length === 0}
                        >
                        <Icons type={'filter'} />
                    </TouchableOpacity>

                    {
                        showAdvancedTags && (
                            <View style={styles.tagsContainer}>
                                {advancedTags.map((tag, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={[styles.tagBtn, quickTag === tag && styles.selectedTag, index === advancedTags.length - 1 && { borderBottomWidth: 0 }]} 
                                        onPress={() => setAdvancedTag(tag)}
                                    >
                                        <Text style={styles.tagBtnText}>{tag}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )
                    }

                </View>

                {
                    advancedFiltered.length > 0 && (
                        <View style={{width: '100%'}}>
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

                                            <TouchableOpacity 
                                                style={styles.deleteBtn} 
                                                onPress={() => deleteNote('advancedNotes', note)}
                                                >
                                                <Icons type={'trash'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    )
                }

                <View style={{height: 150}} />

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
    },

    tagsContainer: {
        width: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        position: 'absolute',
        top: 70,
        right: 0,
        zIndex: 10
    },

    tagBtn: {
        paddingVertical: 10.5,
        paddingHorizontal: 16,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#808080'
    },

    deleteBtn: {
        width: 54,
        height: 54,
        padding: 14,
        borderRadius: 14,
        backgroundColor: '#ff3b30',
        marginTop: 20,
        alignSelf: 'flex-end'
    },

})

export default Notes;