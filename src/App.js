import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function App() {
  const [data, setData] = useState([]);      

  const getData = () => {
    Axios({
      method: 'get',
      url: 'http://localhost:7777/product',
    })
      .then(function (response) {
        setData(response.data.data)
      });
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
                <img src={item.image} alt="Cardfight Vanguard"></img>
              </td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td><ButtonGroup aria-label="Action">
                <Button size="sm" variant="primary">Edit</Button>
                <Button size="sm" variant="danger">Delete</Button>
              </ButtonGroup></td>
            </tr>
          })}
          <tr>
            <td colSpan={6}><Button id="bt-success" size="sm" variant="success">Add Product</Button></td>
          </tr>
        </tbody>
      </Table>       
    </>
  );
}

export default App;
