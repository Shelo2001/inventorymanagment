import { createStore } from 'zustand'
import axios, { AxiosResponse } from 'axios'

interface Inventory {
  id: number
  name: string
  price: number
  location: string
}

interface InventoriesStore {
  inventories: Inventory[]
  errorMessage: string | null
  getInventories: () => Promise<void>
  deleteInventory: (id: number) => Promise<void>
  createInventory: (data: object) => Promise<Inventory>
}

const inventoriesStore = createStore<InventoriesStore>((set) => ({
  inventories: [],
  async getInventories() {
    try {
      const response: AxiosResponse<Inventory[]> = await axios.get<Inventory[]>(
        '/inventories'
      )
      set({ inventories: response.data.products })
    } catch (error) {
      console.error(error)
    }
  },

  async deleteInventory(id: number) {
    try {
      const response: AxiosResponse<Inventory> = await axios.delete<Inventory>(
        `/inventories/${id}`
      )
      if (response.data) {
        window.location.href = '/'
      }
    } catch (error) {
      console.error(error)
    }
  },

  async createInventory(data: object) {
    try {
      const response: AxiosResponse<Inventory> = await axios.post<Inventory>(
        `/inventories`,
        data
      )
      if (response.data) {
        window.location.href = '/'
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ errorMessage: error.response.data.message })
        setTimeout(() => {
          set({ errorMessage: null })
        }, 3000)
      }
    }
  },
}))

export default inventoriesStore
