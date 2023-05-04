import React, { useEffect } from 'react'
import { useStore } from 'zustand'
import inventoriesStore from '../services/inventories'
import { Table, Button } from 'react-bootstrap'
import Header from '../components/Header'

const HomePage: React.FC = () => {
  const { getInventories, inventories, deleteInventory } =
    useStore(inventoriesStore)

  useEffect(() => {
    getInventories()
  }, [])

  return (
    <>
      <Header />
      <div style={{ width: '50%', margin: 'auto', marginTop: '100px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory) => (
              <tr>
                <td>{inventory.name}</td>
                <td>{inventory.price}</td>
                <td>{inventory.location}</td>
                <td>
                  <Button
                    style={{ width: '100%' }}
                    variant='danger'
                    onClick={() => {
                      deleteInventory(inventory.id)
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default HomePage
