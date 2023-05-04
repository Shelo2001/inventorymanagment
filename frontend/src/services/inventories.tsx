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
  getInventories: () => Promise<void>
  deleteInventory: (id: number) => Promise<void>
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
}))

export default inventoriesStore
