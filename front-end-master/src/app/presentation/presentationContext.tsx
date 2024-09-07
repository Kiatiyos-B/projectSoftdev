import { useState, useContext, createContext, useCallback, useMemo, ReactNode } from "react"
import { createPresentRoom, updatePresentRoom, deletePresentRoom, getAllPresentRooms } from "./api";
import { PresentRoomBody, RoomInfo } from './typings';

const PresentationContext = createContext<any | undefined>(undefined)

export const PresentationProvider = ({ children }: { children: ReactNode }) => {
  const [presentRooms, setPresentRooms] = useState<RoomInfo[]>([])
  const [editModal, setEditModal] = useState(false)
  const [removeId, setRemoveId] = useState("")
  const [editData, setEditData] = useState<RoomInfo>()

  const openCreateModal = useCallback(() => {
    setEditModal(true)
  }, [])

  const openEditModal = useCallback((presentRoom: RoomInfo) => {
    setEditData(presentRoom)
    setEditModal(true)
  }, []);

  const closeModal = useCallback(() => {
    setRemoveId("")
    setEditData(undefined)
    setEditModal(false)
  }, []);

  const openRemoveModal = useCallback((id: string) => {
    setRemoveId(id)
  }, []);

  const closeRemoveModal = useCallback(() => {
    setRemoveId("")
  }, [])

  const fetchPresentRooms = useCallback(async () => {
    try {
      const res = await getAllPresentRooms()
      setPresentRooms(res.data)
    } catch (error) {
      throw error
    }
  }, [])

  const handleCreateRoom = useCallback(async (data: PresentRoomBody) => {
    try {
      await createPresentRoom(data)
      setTimeout(fetchPresentRooms, 1000)
    } catch (error) {
      throw error
    }
  }, [])

  const handleEditRoom = useCallback(async (data: PresentRoomBody) => {
    try {
      await updatePresentRoom(data)
      setTimeout(fetchPresentRooms, 1000)
    } catch (error) {
      throw error
    }
  }, [])

  const handleRemoveRoom = useCallback(async () => {
    try {
      await deletePresentRoom(removeId)
      setTimeout(fetchPresentRooms, 1000)
    } catch (error) {
      throw error
    } finally {
      closeModal()
    }
  }, [removeId])

  const value = useMemo(() => ({
    presentRooms,
    editModal,
    removeId,
    editData,
    openCreateModal,
    openEditModal,
    closeModal,
    openRemoveModal,
    closeRemoveModal,
    handleRemoveRoom,
    handleCreateRoom,
    handleEditRoom,
    fetchPresentRooms
  }), [presentRooms, editModal, removeId, editData])

  return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>
}

export const usePresentationContext = () => {
  const context = useContext(PresentationContext)
  if (!context) throw new Error("usePresentationContext must be use within a PresentationProvider")
  return context
}
