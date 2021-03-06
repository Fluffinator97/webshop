import React, { useContext } from 'react'
import { CartContext } from '../context/cartContext'
import { Box } from 'grommet/components/Box'
import { Grommet } from 'grommet/components/Grommet'
import { List, Text, Button, Paragraph, Image } from 'grommet'
import { AddCircle, SubtractCircle, LinkNext } from 'grommet-icons'
import { Link } from 'react-router-dom'
import { theme } from '../index'
import products from '../allProducts'

export default function CheckoutCart() {
    const [cartItems, setCart] = useContext(CartContext)
    const addToCart = (data: number) => {
        let itemInCart = cartItems.find((element: { id: number }) => element.id === data)
        itemInCart.quantity += 1
        setCart((currentState: any) => [...currentState])
        console.log(itemInCart)
    }
    const arrayRemove = (arr: any[], value: any) => {
        return arr.filter(function (ele: any) {
            return ele !== value
        })
    }
    const removeFromCart = (data: number) => {
        let itemInCart = cartItems.find((element: { id: number }) => element.id === data)
        if (itemInCart.quantity > 1) {
            itemInCart.quantity -= 1
            setCart((currentState: any) => [...currentState])
            console.log(itemInCart)
        }
        else {
            setCart(arrayRemove(cartItems, itemInCart))
        }
    }

    const getNameandImage = (data: number) => {
        let itemInCartValues = products.find((element: { id: number }) => element.id === data)
        if (itemInCartValues) { return [itemInCartValues.name, itemInCartValues.img[0]] }
        else {
            return ['']
        }
    }

    return (
        <Grommet theme={theme}>
            <Box pad="large" wrap={true} direction='row-responsive' justify='between'>
                <List
                    data={cartItems}
                    primaryKey={item => (
                        <Box direction='row-responsive' wrap={true} gap='small' justify='center' align='center'>
                            <Text size="large" weight="bold">
                                {getNameandImage(item.id)[0]}
                            </Text>
                            <Box height='xsmall' width='small'>
                                <Image fit='contain' src={getNameandImage(item.id)[1]}></Image>

                            </Box>
                            <Box direction='row' wrap={true} gap='small' justify='center' align='center'>
                                <Text size="medium" weight="bold">
                                    Quantity : {item.quantity}
                                </Text>
                                <Box direction='row'>
                                    <Button
                                        hoverIndicator
                                        style={{ borderRadius: '50%' }}
                                        size="small"
                                        icon={<AddCircle size='medium' color='dark-1' />}
                                        onClick={() => { addToCart(item.id) }}
                                    />
                                    <Button
                                        hoverIndicator
                                        size="small"
                                        style={{ borderRadius: '50%' }}
                                        icon={<SubtractCircle size='medium' color='dark-1' />}
                                        onClick={() => { removeFromCart(item.id) }}
                                    />
                                </Box>
                            </Box>

                        </Box>
                    )}
                    secondaryKey={item => (
                        <Box>
                            <Paragraph size="large">
                                {item.price}<Text size="small" color="dark-4"> SEK/piece</Text>
                            </Paragraph>
                        </Box>
                    )}
                />
                <Box align='end' gap='small'>
                    <Paragraph size="large">
                        Total = {totalPrice(cartItems).toFixed(2)}<Text size="small" color="dark-4"> SEK</Text>
                    </Paragraph>
                    <Box animation='pulse'>
                        <Link to='/Checkout' >
                            <Button
                                size="small"
                                primary
                                label='to checkout'
                                icon={<LinkNext />}
                            />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Grommet>
    )
}

export const totalPrice = (cartItems: any) => {
    let totalPrice = 0
    for (let item of cartItems) {
        totalPrice += item.quantity * item.price
    }
    return (totalPrice)
}