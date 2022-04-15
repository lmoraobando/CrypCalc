import  { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Input } from 'react-native-elements'
import isNumber from '../utils/isNumber'
import CheckBox from 'react-native-check-box'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Home = () => {
    const [investmentAmount, setInvestmentAmount] = useState('')
    const [initialCoinPrice, setInitialCoinPrice] = useState('')
    const [lastCoinValue, setLastCoinValue] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [initialFeePercentage, setInitialFeePercentage] = useState('')
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const countries = ['Egypt', 'Canada', 'Australia', 'Ireland']

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
        const profitLossPercentage = profitLoss ===0 && numInvestment === 0 ? 0 : roundFloat(((profitLoss/numInvestment)*100))

        const sign = profitLoss > 0 ? '+' : '-'
        let resultString = `${sign} $ ${abs(profitLoss)}   (${sign + abs(profitLossPercentage ?? 0)} %)`


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
            <Card containerStyle={styles.cardTotal}>
                <Text style={styles.titleText}>
                    Profit:
                </Text>
                <Text style={styles.descriptionText}>
                    {totalAmount.toString()}
                </Text>
            </Card>
            <Card containerStyle={styles.card}>
            <SelectDropdown
                    data={countries}
                    // defaultValueByIndex={1}
                    // defaultValue={'England'}
                    onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    }}
                    defaultButtonText={'Select Coin'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                    return item
                    }}
                    buttonStyle={styles.dropdown2BtnStyle}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                 />
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
              <CheckBox
                    style={{paddingRight: 50, marginLeft:10}}
                    onClick={()=>{
                        setToggleCheckBox(!toggleCheckBox)
                    }}
                    isChecked={toggleCheckBox}
                    leftText={'Enter manually amount'}
                />  
                 <Input
                    placeholder='Selling Coin Price'
                    leftIcon={{ type: 'font-awesome', name: 'bitcoin' }}
                    onChangeText={newText => handleSetLastCoinValue(newText)}
                    keyboardType="numeric"
                />

                {/*
                


                <Input
                    placeholder='Selling Coin Price'
                    leftIcon={{ type: 'font-awesome', name: 'bitcoin' }}
                    onChangeText={newText => handleSetLastCoinValue(newText)}
                    keyboardType="numeric"
                />*/}
                <Input
                    placeholder='Investment fee'
                    leftIcon={{ type: 'font-awesome', name: 'percent' }}
                    keyboardType="numeric"
                    onChangeText={newText => handleInvestFeeChange(newText)}
                    value={initialFeePercentage.toString()}
                />
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
    titleText: {
        fontSize: 15,
        fontWeight:'bold'
    },
    descriptionText: {
        fontSize: 20,
        fontWeight:'bold'
    },
    card: {
        backgroundColor: '#e4b258',
        padding: 20,
        height: 450,
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
    shadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
      },

      dropdown2BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#e4b258',
        borderRadius: 8,
      },
      dropdown2BtnTxtStyle: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      dropdown2DropdownStyle: {
        backgroundColor: '#444',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      },
      dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
      dropdown2RowTxtStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
      },
    
      dropdownRowImage: {width: 45, height: 45, color:'#000', resizeMode: 'cover'},
      
})