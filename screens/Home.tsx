import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Input } from 'react-native-elements'
import isNumber from '../utils/isNumber'


const Home = () => {
    const [investmentAmount, setInvestmentAmount] = useState('')
    const [initialCoinPrice, setInitialCoinPrice] = useState('')
    const [lastCoinValue, setLastCoinValue] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [initialFeePercentage, setInitialFeePercentage] = useState('')


    useEffect(() => {
       const numInvestment = parseFloat(investmentAmount === '' ? '0' : investmentAmount)

        const totalInvestmentFee = numInvestment * parseFloat(initialFeePercentage === '' ? '0' : initialFeePercentage) / 100
        const investmentAfterFees = (numInvestment - totalInvestmentFee)
        const totalCoinValue = investmentAfterFees / parseFloat(initialCoinPrice === '' ? '1' : initialCoinPrice) 
        let totalReturn = totalCoinValue * parseFloat(lastCoinValue === '' ? '1' : lastCoinValue) 

        
        const totalExitFee = totalReturn * 0 / 100

        totalReturn = totalReturn - totalExitFee
        
        totalReturn = roundFloat(totalReturn)

        const profitLoss = roundFloat((totalReturn - numInvestment))
        const profitLossPercentage = roundFloat(((profitLoss/numInvestment)*100))

        const sign = profitLoss > 0 ? '+' : '-'
        let resultString = `${sign} $ ${abs(profitLoss)}   (${sign + abs(profitLossPercentage)} %)`


        setTotalAmount(resultString)
    }, [investmentAmount, initialFeePercentage,lastCoinValue])

    const roundFloat= (float:number, digits?:number) =>{
        if (!digits) {
            digits = 2
        }
        const round = Math.pow(10, digits)
        return Math.round((float + Number.EPSILON) * round) / round
    }

    function abs(value:number) {
        return Math.abs(value)
    }

    const calcProfit = (pInvestment: number) => {
        let totalAmount = 0
        let investment = pInvestment ?? 0
        totalAmount = investment

        return totalAmount
    }

    const handleInvestFeeChange = (value: string) => {
        let text = value.replace('.', '')
        if (isNumber(text)) {
            setInitialFeePercentage(value)
        }
        else {
            setInitialFeePercentage('0')
        }
    }

    const handleInvestmentChange = (value: string) => {
        let text = value.replace('.', '')
        let total = 0
        let investmentValue = 0
        if (isNumber(text)) {
            const numericVal = Number(value)
            investmentValue = numericVal
            setInvestmentAmount(numericVal.toString())
        }
        else {
            setInvestmentAmount('0')
        }

    }

    const handleInitialPriceChange = (value: string) => {
        let text = value.replace('.', '')
        let total = 0
        let investmentValue = 0
        if (isNumber(text)) {
            const numericVal = Number(value)
            investmentValue = numericVal
            setInitialCoinPrice(numericVal.toString())
        }
        else {
            setInitialCoinPrice('0')
        }


    }

    const handleSetLastCoinValue = (value: string) => {
        let text = value.replace('.', '')
        let total = 0
        let investmentValue = 0
        if (isNumber(text)) {
            const numericVal = Number(value)
            investmentValue = numericVal
            setLastCoinValue(numericVal.toString())
        }
        else {
            setLastCoinValue('0')
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
                    onChangeText={newText => handleSetLastCoinValue(newText)}
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
        shadowColor: '#7F5DF0',
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
        shadowColor: '#7F5DF0',
        shadowOpacity: 1.25,
        shadowRadius: 5,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 10
        },
    },
})