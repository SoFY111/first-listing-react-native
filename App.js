import React, {useEffect, useState} from 'react';
import {
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Linking,
    TouchableWithoutFeedback,
    View
} from 'react-native';

export default function App() {

    useEffect(() => {
        fetch(`https://prototurk.com/rest/discover?limit=10`)
            .then(res => res.json())
            .then(data => setLinks(data.data))
    }, [])
    const [refreshing, setRefreshing] = useState(false)
    const [links, setLinks] = useState(null)

    const onRefresh = () => {
        setRefreshing(true)
        fetch(`https://prototurk.com/rest/discover?limit=10`)
            .then(res => res.json())
            .then(data => {
                setLinks(data.data)
                setRefreshing(false)
            })
    }

    const openLink = (url) => {
        Linking.openURL(url)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>hakanDincturk</Text>
            </View>
            <ScrollView contentContainerStyle={{paddingHorizontal: 10}} refreshControl={
                <RefreshControl
                    tintColor={'#fff'}
                    title={'Yükleniyor..'}
                    titleColor={'#fff'}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {links && links.map(link => (
                    <TouchableWithoutFeedback onPress={() => openLink(link.url)}>
                        <View style={styles.link}>
                            <View style={styles.author}>
                                <Image style={styles.avatar} source={{uri: link.user.avatar}}/>
                                <Text style={styles.user}>{link.user.name}</Text>
                                <Text style={styles.date}>{link.date}</Text>
                            </View>
                            <View style={styles.linkContent}>
                                <Text style={styles.linkTitle}> {link.title ?? link.url} </Text>
                                <Text style={styles.linkDescription}> {link.description ?? link.url} </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    },
    header: {
        paddingVertical: 15,
        alignItems: 'center'
    },
    link: {
        backgroundColor: '#222',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 25,
        marginRight: 10,
    },
    linkContent: {
        backgroundColor: '#4caf501a',
        borderColor: '#333',
        marginTop: 15,
        padding: 15
    },
    linkTitle: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 5,
        color: '#30b0f1'
    },
    linkDescription: {
        color: '#fff',
        fontSize: 13,
        lineHeight: 18,
    },
    user: {
        color: '#FFFFFFCC'
    },
    date: {
        marginLeft: 'auto',
        color: '#FFFFFF4C'
    },
    logo: {
        color: '#fff',
        fontSize: 18,
    }
});
