import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CurrencyFormat from 'react-currency-format';

function App() {
  const [data, setData] = useState([]);   
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');      
  const [add, setAdd] = useState(false);
  const addClose = () => setAdd(false);
  const addShow = () => setAdd(true);
  
  const [nameEdit, editName] = useState('');
  const [descEdit, editDesc] = useState('');
  const [imageEdit, editImage] = useState('');
  const [priceEdit, editPrice] = useState('');      
  const [edit, setEdit] = useState(false);
  const editClose = () => setEdit(false);
  const editShow = (id) => setEdit(id);

  const getData = () => {
    Axios({
      method: 'get',
      url: 'http://localhost:7777/product',
    })
      .then(function (response) {
        setData(response.data.data)
      });
  }

  const getIdData = (id) =>{
    let item = data.find(x => x.id === id);
    editShow(id);
    editName(item.name);
    editDesc(item.description);
    editImage(item.image);
    editPrice(item.price);
  }

  const makeID = (length) =>{
    let result = "";    
    let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charlength =char.length;    
    for ( let i = 0; i < length; i++ ) {
        result += char.charAt(Math.floor(Math.random() * charlength));
    }
    return result;
  }

  const handleAdd = (e) => {
    let ID = makeID(12);
    e.preventDefault()
    Axios({
      method: 'post',
      url: 'http://localhost:7777/product',
      data: {  
        id: ID,      
        name: name,
        description: desc,
        image: image,
        price: price,        
      }
    })
      .then(function (response) {        
        setName('')
        setDesc('')
        setImage('')
        setPrice('')
        getData()
      });
  }

  const handleEdit = () => {
    Axios({
      method: 'put',
      url: `http://localhost:7777/product/${edit}`,
      data: {
        name: nameEdit,
        description: descEdit,
        image: imageEdit,
        price: priceEdit
      }
    })
      .then(function (response) {
        addClose()
        setName('')
        setDesc('')
        setImage('')
        setPrice('')        
        getData()
      });
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ID ${id}?`)) {
      Axios({
        method: 'post',
        url: `http://localhost:7777/product/delete/${id}`,
      })
        .then(function (response) {
          getData()
        });
    }
  }
  
  useEffect(() => {
    getData()
  }, []);

  return (
    <>      
      <h1>FORM PRODUCT TABLE</h1>      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>image</th>
            <th>price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <img src={item.image} alt={item.name}></img>
              </td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td><ButtonGroup aria-label="Action">
              <Button size="sm" variant="primary" onClick={() => getIdData(item.id)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
              </ButtonGroup></td>
            </tr>
          })}
          <tr>
            <td colSpan={6}><Button id="bt-success" size="sm" variant="success" onClick={() => addShow()}>Add Product</Button></td>
          </tr>
        </tbody>
      </Table>
      <Modal show={add} onHide={addClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={image} name="image" type="text" onChange={(e) => setImage(e.target.value)} placeholder="Place Image URL" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Set Price</Form.Label><br></br>
              <CurrencyFormat value={price} name="price" thousandSeparator={true} prefix={'Rp. '} onChange={(e) => setPrice(e.target.value)} placeholder="Set Price in Rp. " />                      
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDesc">
              <Form.Label>Description</Form.Label>          
              <Form.Control rows="5" value={desc} name="desc" as="textarea" aria-label="With textarea" onChange={(e) => setDesc(e.target.value)} placeholder="Write Product Description Here"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={edit} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control value={nameEdit} type="text" onChange={(e) => editName(e.target.value)} placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={imageEdit} name="image" type="text" onChange={(e) => editImage(e.target.value)} placeholder="Place Image URL" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Set Price</Form.Label><br></br>        
              <CurrencyFormat value={priceEdit} name="price" thousandSeparator={true} prefix={'Rp. '} onChange={(e) => editPrice(e.target.value)} placeholder="Set Price in Rp. " />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDesc">
              <Form.Label>Description</Form.Label>          
              <Form.Control rows="5" value={descEdit} name="desc" as="textarea" aria-label="With textarea" onChange={(e) => editDesc(e.target.value)} placeholder="Write Product Description Here"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>       
    </>
  );
}

export default App;
