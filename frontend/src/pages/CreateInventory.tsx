import React, { useState } from 'react'
import Header from '../components/Header'
import { Form, Alert, Button } from 'react-bootstrap'
import inventoriesStore from '../services/inventories'
import { useStore } from 'zustand'

const CreateInventory: React.FC = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')

  const { createInventory, errorMessage } = useStore(inventoriesStore)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    let data = {
      name,
      price,
      location,
    }
    createInventory(data)
  }

  return (
    <div>
      <Header />
      <div
        style={{
          width: '30%',
          margin: 'auto',
          marginTop: '100px',
        }}
      >
        <Form
          style={{
            border: '1px solid #ced4da',
            boxShadow: '0 0 8px rgba(0,0,0,0.1)',
            padding: '16px',
            borderRadius: '10px',
          }}
          onSubmit={handleSubmit}
        >
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter product name'
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ marginTop: '30px' }} controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter product price'
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ marginTop: '30px' }} controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Select onChange={(e) => setLocation(e.target.value)}>
              <option>Select location</option>
              <option value='მთავარი ოფისი'>მთავარი ოფისი</option>
              <option value='კავეა გალერია'>კავეა გალერია</option>
              <option value='კავეა თბილისი მოლი'>კავეა თბილისი მოლი</option>
              <option value='კავეა ისთ ფოინთი'>კავეა ისთ ფოინთი</option>
              <option value='კავეა სითი მოლი'>კავეა სითი მოლი</option>
            </Form.Select>
          </Form.Group>

          <Button
            style={{ marginTop: '30px', width: '100%' }}
            variant='dark'
            type='submit'
          >
            Create
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default CreateInventory
