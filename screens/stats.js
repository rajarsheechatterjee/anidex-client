import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ImageBackground, Clipboard, ToastAndroid, ScrollView, Vibration } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


export default function General({title}) {
    return (
            <View style={styles.mainContainer}>
                {/* <View style={styles.genres}>
                    <Text style={styles.heading}>Genres</Text>
                    <Text style={styles.genre}>{title.genres.map((item) => (item.name)).join(', ')}</Text>
                </View> */}
                <View>
                    <Text style={styles.heading}>Statistics</Text>
                    <View style={styles.statsContainer}>
                        <Text style={styles.smHeading}>Score </Text>
                        <Text style={styles.stat1}>{title.score} (Scored by {title.scored_by} users)</Text>
                    </View>
                    <View style={styles.statsContainer2}>
                        <Text style={styles.smHeading}>Rank </Text>
                        <Text style={styles.stat1}>{title.rank}</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.smHeading}>Popularity  </Text>
                        <Text style={styles.stat1}>#{title.popularity}</Text>
                    </View>
                    <View style={styles.statsContainer2}>
                        <Text style={styles.smHeading}>Members </Text>
                        <Text style={styles.stat1}>{title.members}</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.smHeading}>Favorites </Text>
                        <Text style={styles.stat1}>{title.favorites}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.heading}>Opening Themes</Text>
                    {title.opening_themes &&
                        title.opening_themes.map((theme, index) => (
                            <Text numberOfLines={1} style={[styles.opening, index % 2 !== 0 && styles.bg]}>#{index+1} {theme}</Text>
                        ))
                    }
                </View>
                <View>
                    <Text style={styles.heading}>Ending Themes</Text>
                    {title.ending_themes &&
                        title.ending_themes.map((theme, index) => (
                            <Text numberOfLines={1} style={[styles.opening, index % 2 !== 0 && styles.bg]}>#{index+1} {theme}</Text>
                        ))
                    }
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 17,
        paddingVertical: 10,
    },
    heading: {
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: 16, 
        marginVertical: 7
    },
    genre: {
        borderRadius: 6,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 5,
        paddingVertical: 10,
        textAlign: 'center',
        lineHeight: 20,
    },
    opening: {
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    bg: {
        backgroundColor: '#f0f0f0'
    },
    statsContainer2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 7,
        paddingHorizontal: 15,
    },
    statsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
    },
    smHeading: {
        fontWeight: "bold",
        fontSize: 15,
    },
    stat1: {
        // paddingRight: 40,
    }
})