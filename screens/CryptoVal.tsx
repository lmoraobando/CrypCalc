import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { getCurrencieList } from '../utils/apiCall'
import { AdMobRewarded } from 'expo-ads-admob'
import { Platform } from 'react-native'

const CryptoVal = () => {
    const [isLoading, setLoading] = useState(true)
    const [currencyData, setCurrencyData] = useState<any[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const fetchData = async () => {
        const data = await getCurrencieList()
        setCurrencyData(data)
        setLoading(false)
    }

    let adUnitId = Platform.select({
        'android':'ca-app-pub-2262491382687400/1689791893'
      })
    
    let loadAd = async () =>{
        await AdMobRewarded.setAdUnitID(adUnitId)
        await AdMobRewarded.requestAdAsync()
    }

    

    const callAds = useCallback(()=>{
        loadAd().then(()=>(
            AdMobRewarded.showAdAsync()
        ))
    },[])

    

    useEffect(() => {
        if(loadAd)
        callAds()

        fetchData() // <-- (2) invoke on mount
        const dataInterval = setInterval(() => fetchData(), 5 * 1000)
        return () => clearInterval(dataInterval)
    }, [])
    
    return (
        <View style={styles.container}>

            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <FlatList
                    refreshing={refreshing}
                    onRefresh={async () => {
                        setRefreshing(true)
                        await fetchData()
                        setRefreshing(false)
                    }}
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
                                    <Text style={[styles.name, { fontWeight: 'bold' }]}>{item.name}</Text>
                                    <Text style={styles.subtitle}>{item.symbol}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>

                                    <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{'$ ' + parseFloat(item.current_price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                </View>

                            </View>





                        </Card>
                    )
                    }
                />
            )}
        </View >
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
        shadowColor: '#7F5DF0',
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
        marginBottom: 0,
    },
    name: {
        marginTop: 2,
    },
    image: {
        marginRight: 10,
        width: 37,
        height: 37
    },
    cryptoValue: {
        marginLeft: 100,
        textAlign: 'right'

    }
})