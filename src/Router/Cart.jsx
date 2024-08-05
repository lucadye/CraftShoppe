import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCart } from '../api/cart';
import { formatNumber, formatMoney } from '../helpers';

import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Card from '../Components/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Counter({amount, setAmount, productData: p}) {
  function changeAmount(value) {
    value = formatNumber(value);
    if (value === '') return setAmount('');
    value = value < 1 ? 1 : value;
    value = value > 999 ? 999 : value;
    setAmount(value);
    updateCart({
      id: Number(p.id),
      option_index: Number(p.option.id),
      count: value,
    });
  }
  return (
    <ButtonGroup aria-label="Product Amount">
  
      <Button
        variant="outline-secondary"
        onClick={e => {
          e.preventDefault();
          changeAmount(amount - 1);
        }}
        >-
      </Button>
  
      <Button variant="outline-secondary">
        <Form.Control
          defaultValue="1"
          aria-label="Product Amount"
          onChange={e => {
            e.preventDefault();
            changeAmount(e.target.value);
          }}
          style={{width: `calc(2rem + ${String(amount).length}ch)`}}
          value={amount}
        />
      </Button>
  
      <Button
        variant="outline-secondary"
        onClick={e => {
          e.preventDefault();
          changeAmount(amount + 1);
        }}
        >+
      </Button>
  
    </ButtonGroup>
  );
}

function CartItem({data: p, setCart, forceReload, key}) {
  const [amount, setAmount] = useState(p.count);
  const Btn = () => (<Container fluid className="d-flex justify-content-between" style={{padding: '0'}}>
    <Counter amount={amount} setAmount={n=>{setAmount(n); forceReload()}} productData={p}/>
    <Button
      variant="outline-secondary"
      onClick={e => {
        e.preventDefault();
        updateCart({
          id: Number(p.id),
          option_index: Number(p.option.id),
          count: 0,
        }).then(() => {
          getCart().then(c => {
            setCart(c);
          });
        });
      }}
      >x
    </Button>
  </Container>);
  return (
    <Card
      key={key}
      title={`${p.name} (${p.option.name})`}
      src={p.image}
      button={Btn}
    >
      <Link to={'/products/' + p.id}>View product details</Link>
      <br/>
      Price: {formatMoney(p.price + p.option.price_mod)}
      <br/>
      Subtotal: {formatMoney((Number(p.price) + Number(p.option.price_mod)) * Number(amount))}
    </Card>
  );
}

function Cart() {
  const [reloadValue, setReloadValue] = useState(0);
  const forceReload = () => setReloadValue(reloadValue + 1);

  const [cart, setCart] = useState(undefined);
  useEffect(() => {
    getCart().then(c => {
      setCart(c);
    });
  }, [reloadValue]);

  if (cart === null) {
    return (
      <Container fluid className="d-flex flex-column align-items-center" style={{paddingTop: '8rem', margin: '0'}}>
        <p className="x-lg">
          Your cart is empty!
        </p>
        <p className="lg">
          If you add a product, it will show up here.
        </p>
        <Link to="/products"><Button size="lg">View all products</Button></Link>
      </Container>
    );
  }

  if (cart === undefined) {
    return (
      <Container fluid>
        <h2>Cart</h2>
        <Spinner
          variant="secondary"
          animation="border"
          role="status"
          ><span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  let totalPrice = 0;
  let totalCount = 0;

  return (
    <Container fluid>
      <h2>Cart</h2>
      <Container fluid className="d-flex justify-content-evenly gap-4 flex-wrap">
          {cart.map((p, i) => {
            totalPrice += (Number(p.price) + Number(p.option.price_mod)) * Number(p.count);
            totalCount += p.count;
            return <CartItem key={i} data={p} setCart={setCart} forceReload={forceReload}/>
          })}
          <Card
            style={{height: 'fit-content', alignSelf: 'end'}}
            title="Total"
            button={()=>(
              <Link to="/checkout"><Button>
                Proceed to checkout
              </Button></Link>
            )}
          ><p>
            Price: {formatMoney(totalPrice)}
            <br/>
            Item Count: {totalCount}
          </p>
          </Card>
      </Container>
    </Container>
  );
}

export default Cart;
