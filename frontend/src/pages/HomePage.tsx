import React, { useEffect, useState } from 'react'
import { useStore } from 'zustand'
import inventoriesStore from '../services/inventories'
import { Table, Button, Pagination } from 'react-bootstrap'
import Header from '../components/Header'

const HomePage: React.FC = () => {
  const {
    getInventories,
    inventories,
    deleteInventory,
    currentPage,
    totalPages,
  } = useStore(inventoriesStore)

  const [page, setPage] = useState(1)

  useEffect(() => {
    getInventories(page)
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

        <Pagination>
          <Pagination.First onClick={() => getInventories(1)} />
          <Pagination.Prev
            onClick={() => getInventories(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => getInventories(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => getInventories(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => getInventories(totalPages)} />
        </Pagination>
      </div>
    </>
  )
}

export default HomePage
