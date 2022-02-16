import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Card, Input } from "react-native-elements"
import isNumber from "../utils/isNumber";


const Home = () => {
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [initialCoinPrice, setInitialCoinPrice] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [initialFeePercentage, setInitialFeePercentage] = useState('');


    useEffect(() => {

        // let totalAmount = 0
        //let investment = pInvestment ?? 0;
        //initialFeePercentage = initialFeePercentage ?? 0;
        //var initialCoinValue = $('#coin_first').val() ?? 0;
        //var lastCoinValue = $('#coin_last').val() ?? 0;
        //totalAmount = investment

        var totalInvestmentFee = parseFloat(investmentAmount === '' ? '0' : investmentAmount) * parseFloat(initialFeePercentage === '' ? '0' : initialFeePercentage) / 100;

        setTotalAmount(totalInvestmentFee);
    }, [investmentAmount])

    const calcProfit = (pInvestment: number) => {
        let totalAmount = 0
        let investment = pInvestment ?? 0;
        //initialFeePercentage = initialFeePercentage ?? 0;
        //var initialCoinValue = $('#coin_first').val() ?? 0;
        //var lastCoinValue = $('#coin_last').val() ?? 0;
        totalAmount = investment

        // var totalInvestmentFee = investment * initialFeePercentage / 100;

        return totalAmount
    }

    const handleInvestFeeChange = (value: string) => {
        let text = value.replace(".", '');
        let total = 0
        let investmentValue = 0
        if (isNumber(text)) {
            // const numericVal = parseFloat(value)
            //investmentValue = numericVal
            setInitialFeePercentage(value);
        }
        else {
            setInitialFeePercentage('0');
        }

        total = calcProfit(investmentValue)
    }

    const handleInvestmentChange = (value: string) => {
        let text = value.replace(".", '');
        let total = 0
        let investmentValue = 0
        if (isNumber(text)) {
            const numericVal = Number(value)
            investmentValue = numericVal
            setInvestmentAmount(numericVal);
        }
        else {
            setInvestmentAmount(0);
        }

    }

    const handleInitialPriceChange = (value: string) => {
        let text = value.replace(".", '');
        let total = 0
        let investmentValue = 0
        if (isNumber(text)) {
            const numericVal = Number(value)
            investmentValue = numericVal
            setInvestmentAmount(numericVal);
        }
        else {
            setInvestmentAmount(0);
        }


    }



    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Input
                    placeholder='Investment'
                    leftIcon={{ type: 'font-awesome', name: 'dollar' }}
                    keyboardType="numeric"
                    onChangeText={newText => handleInvestmentChange(newText)}
                    value={investmentAmount.toString()}
                />

                <Input
                    placeholder='Initial Coin Price'
                    leftIcon={{ type: 'font-awesome', name: 'bitcoin' }}
                    keyboardType="numeric"
                    onChangeText={newText => handleInitialPriceChange(newText)}
                    value={initialCoinPrice.toString()}
                />

                <Input
                    placeholder='Selling Coin Price'
                    leftIcon={{ type: 'font-awesome', name: 'bitcoin' }}
                    keyboardType="numeric"
                />
                <Input
                    placeholder='Investment fee'
                    leftIcon={{ type: 'font-awesome', name: 'percent' }}
                    keyboardType="numeric"
                    onChangeText={newText => handleInvestFeeChange(newText)}
                    value={initialFeePercentage.toString()}
                />
            </Card>

            <Card containerStyle={styles.cardTotal}>
                <Text>
                    {totalAmount.toString()}
                </Text>
            </Card>
        </View>
    )

}

export default Home


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    card: {
        backgroundColor: '#e4b258',
        padding: 20,
        height: 350,
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
    cardTotal: {
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
});