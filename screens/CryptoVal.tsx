import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import { Card } from "react-native-elements";
import { getCurrencies } from "../utils/apiCall"


const CryptoVal = () => {
    const [isLoading, setLoading] = useState(true);
    const [currencyData, setCurrencyData] = useState<any[]>([])

    const fetchData = async () => {
        const data = await getCurrencies();
        setCurrencyData(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>

            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <FlatList
                    data={currencyData}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <Card containerStyle={styles.card}>

                            <View style={styles.cardDetail}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: `https://cryptoicon-api.vercel.app/api/icon/${item.symbol.toLowerCase()}` }}

                                />
                                <View>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.subtitle}>{item.symbol}</Text>
                                </View>

                            </View>

                        </Card>
                    )}
                />
            )}
        </View>
    )

}

export default CryptoVal


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    card: {
        backgroundColor: '#e4b258',
        padding: 20,
        height: 80,
        width: 300,
        borderRadius: 10,
        justifyContent: 'center',
        shadowColor: "#7F5DF0",
        shadowOpacity: 1.25,
        shadowRadius: 5,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 10
        },
    },
    subtitle: {
        fontSize: 10
    },
    cardDetail: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    name: {
        marginTop: 2,
    },
    image: {
        marginRight: 10,
        width: 37,
        height: 37
    }
});