import React, { useEffect, useState } from 'react'
import { useStore } from 'zustand'
import inventoriesStore from '../services/inventories'
import { Table, Button, Pagination, Form } from 'react-bootstrap'
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
  const [priceSort, setPriceSort] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    getInventories(page, priceSort, location)
  }, [priceSort, location])

  return (
    <>
      <Header />

      <div className='pagecontainer'>
        <Form.Select
          style={{ marginBottom: '50px', width: '50%' }}
          onChange={(e) => {
            setPriceSort(e.target.value)
            getInventories(currentPage, priceSort, location)
          }}
          aria-label='Default select example'
        >
          <option>Price sort</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </Form.Select>

        <Form.Select
          style={{ marginBottom: '50px', width: '50%' }}
          onChange={(e) => {
            setLocation(e.target.value)
            getInventories(currentPage, priceSort, location)
          }}
          aria-label='Default select example'
        >
          <option value=''>ყველა</option>
          <option value='მთავარი ოფისი'>მთავარი ოფისი</option>
          <option value='კავეა გალერია'>კავეა გალერია</option>
          <option value='კავეა თბილისი მოლი'>კავეა თბილისი მოლი</option>
          <option value='კავეა ისთ ფოინთი'>კავეა ისთ ფოინთი</option>
          <option value='კავეა სითი მოლი'>კავეა სითი მოლი</option>
        </Form.Select>

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
              <tr key={inventory.id}>
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
          <Pagination.First
            onClick={() => getInventories(1, priceSort, location)}
          />
          {currentPage != 1 && (
            <>
              <Pagination.Prev
                onClick={() =>
                  getInventories(currentPage - 1, priceSort, location)
                }
              />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis
                onClick={() =>
                  getInventories(currentPage - 5, priceSort, location)
                }
              />

              <Pagination.Item
                onClick={() =>
                  getInventories(currentPage - 1, priceSort, location)
                }
              >
                {currentPage - 1}
              </Pagination.Item>
            </>
          )}
          <Pagination.Item active>{currentPage}</Pagination.Item>
          {currentPage != totalPages && (
            <>
              {' '}
              <Pagination.Item
                onClick={() =>
                  getInventories(currentPage + 1, priceSort, location)
                }
              >
                {currentPage + 1}
              </Pagination.Item>
              <Pagination.Ellipsis
                onClick={() =>
                  getInventories(currentPage + 5, priceSort, location)
                }
              />
              <Pagination.Item>{totalPages}</Pagination.Item>
              <Pagination.Next
                onClick={() =>
                  getInventories(currentPage + 1, priceSort, location)
                }
              />
            </>
          )}
          <Pagination.Last
            onClick={() => getInventories(totalPages, priceSort, location)}
          />
        </Pagination>
      </div>
    </>
  )
}

export default HomePage
