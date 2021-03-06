import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TextInput,
    ImageBackground,
} from "react-native";
import { Appbar, TouchableRipple } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../theming/colors";
import AnimeCard from "./Components/AnimeCard";

const AnimeSearch = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [titles, setTitles] = useState([]);
    const [searchText, setSearchText] = useState("");

    const getTitles = (searchText) => {
        setLoading(true);
        fetch(`https://api.jikan.moe/v3/search/anime?q=${searchText}`)
            .then((response) => response.json())
            .then((json) => setTitles(json.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Appbar.Header style={{ backgroundColor: Colors.headerColor }}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                        setTitles([]);
                    }}
                    color={Colors.headerIcon}
                    size={26}
                />
                <TextInput
                    placeholder="Search Anime Titles..."
                    defaultValue={searchText}
                    style={{ fontSize: 17, flex: 1, color: Colors.headerText }}
                    placeholderTextColor="#e0e0e0"
                    blurOnSubmit={true}
                    onChangeText={async (text) => {
                        await setSearchText(text);
                        getTitles(searchText);
                    }}
                />
                {searchText !== "" && (
                    <Appbar.Action
                        icon="close"
                        onPress={() => {
                            setSearchText("");
                        }}
                        color={Colors.headerIcon}
                    />
                )}
            </Appbar.Header>
            <View style={styles.container}>
                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                ) : (
                    <FlatList
                        contentContainerStyle={styles.list}
                        numColumns={3}
                        data={titles}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.mal_id.toString()}
                        renderItem={({ item }) => (
                            <TouchableRipple
                                borderless
                                centered
                                rippleColor="rgba(256,256,256,0.3)"
                                style={styles.opac}
                                onPress={() =>
                                    navigation.navigate("Details", item)
                                }
                            >
                                <AnimeCard item={item} />
                            </TouchableRipple>
                        )}
                    />
                )}
            </View>
        </>
    );
};

export default AnimeSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 3,
        backgroundColor: Colors.backgroundColor,
    },
    textInput: {
        alignItems: "center",
        backgroundColor: "#E6E8E9",
        borderRadius: 10,
        color: "#8E8E93",
        flexDirection: "row",
        fontSize: 17,
        height: 43,
        margin: 8,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    opac: {
        height: 190,
        flex: 1 / 3,
        margin: 3.2,
    },
    logo: {
        height: "100%",
        borderRadius: 6,
    },
    titleContainer: {
        zIndex: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        borderRadius: 6,
    },
    title: {
        fontFamily: "pt-sans-bold",
        fontSize: 15,
        color: "white",
        padding: 5,
        width: "100%",
    },
    linearGradient: {
        borderRadius: 6,
    },
});
