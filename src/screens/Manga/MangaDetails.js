import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    ImageBackground,
    Clipboard,
    ToastAndroid,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Provider, Appbar } from "react-native-paper";
import Colors from "../../theming/colors";
import MangaGeneral from "./MangaGeneral";

export default function Details({ route, navigation }) {
    const item = route.params;

    const [isLoading, setLoading] = useState(true);
    const [title, setTitle] = useState();

    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/manga/${item.mal_id}`)
            .then((response) => response.json())
            .then((json) => setTitle(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [item]);

    const copyTitle = () => {
        Clipboard.setString(`${title.title}`);
        ToastAndroid.show(
            `Copied to clipboard: ${title.title}`,
            ToastAndroid.SHORT
        );
    };

    return (
        <Provider>
            <Appbar.Header style={{ backgroundColor: Colors.detailsHeader }}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                    color={Colors.detailsHeaderText}
                    size={26}
                    style={{ marginRight: 0 }}
                />
                <Appbar.Content
                    title={route.params.title}
                    titleStyle={{ color: Colors.detailsHeaderText }}
                />
            </Appbar.Header>
            <View style={styles.container}>
                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                ) : (
                    <ScrollView>
                        <ImageBackground
                            source={{
                                uri: item.image_url,
                            }}
                            style={styles.background}
                        >
                            <LinearGradient
                                colors={["transparent", "white"]}
                                style={styles.linearGradient}
                            >
                                <View style={styles.detailsContainer}>
                                    <Image
                                        source={{
                                            uri: item.image_url,
                                        }}
                                        style={styles.logo}
                                    />
                                    <View style={styles.nameContainer}>
                                        <Text
                                            onLongPress={copyTitle}
                                            numberOfLines={4}
                                            style={styles.head}
                                        >
                                            {title.title}
                                        </Text>
                                        {title.authors && (
                                            <Text style={styles.studio}>
                                                {title.authors.map(
                                                    (item) => item.name
                                                )}
                                            </Text>
                                        )}
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.desc}>
                                                {title.type}
                                            </Text>
                                            {title.published.string && (
                                                <Text style={styles.desc}>
                                                    {title.published.string}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                        <MangaGeneral title={title} />
                    </ScrollView>
                )}
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    background: {
        height: 240,
    },
    linearGradient: {
        height: "100%",
        backgroundColor: "rgba(256, 256, 256, 0.5)",
    },
    detailsContainer: {
        flex: 1,
        flexDirection: "row",
        margin: 17,
    },
    logo: {
        height: 180,
        width: 120,
        margin: 3.2,
        borderRadius: 6,
    },
    nameContainer: {
        flex: 1,
        width: "100%",
        marginHorizontal: 15,
    },
    head: {
        fontWeight: "bold",
        fontSize: 20,
    },
    desc: {
        color: "#424242",
        marginVertical: 3,
        fontSize: 16,
    },
    studio: {
        color: "#212121",
        marginVertical: 3,
        fontSize: 16,
    },
});
