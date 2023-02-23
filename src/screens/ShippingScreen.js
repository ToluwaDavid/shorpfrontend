import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormHolder from '../components/FormHolder'
// import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutStep from '../components/CheckoutStep'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address || ' ')
    const [city, setCity] = useState(shippingAddress.city || ' ')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || ' ')
    const [country, setCountry] = useState(shippingAddress.country || ' ')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }
    return (
        <FormHolder>
            <CheckoutStep step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' required placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' required placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' required placeholder='Enter Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' required placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <br />
                <Button type="Submit" variant="primary">Continue</Button>
            </Form>
        </FormHolder>

    )
}

export default ShippingScreen