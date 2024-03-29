import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, history }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(productId)
  // const location = useLocation()
  const { search } = useLocation();
  const [searchParms] = useSearchParams();
  const productID = id
  const qty = search ? Number(search.split('=')[1]) : 1
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart.cartItems)
  const cartItems = cart
  console.log(cartItems)
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  }, [dispatch, productID, qty])
  const removeFromCartHandler = (id) => {
    // console.log('Remove')
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }
  return (
    <><Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {console.log(cartItems.length)}
        {/* {cartItems = cartItems.keys(cartItems)} */}
        {cartItems.length === 0 ? <div class="alert alert-primary" role="alert">
          Cart is empty <b><Link to='/' className='text-success'><u>Go back</u></Link></b>
        </div> : <ListGroup variant='flush'>
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>
                  ${item.price}
                </Col>
                <Col md={2}>
                  <Form.Control as='select' value={item.qty} onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))}>
                    {
                      [...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))
                    }
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash' ></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to CheckOut</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row >
    </>
  )
}


export default CartScreen 