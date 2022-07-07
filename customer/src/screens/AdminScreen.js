import React from 'react'
import Map from '../components/Map'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const AdminScreen = () => {
  const {state} = useLocation()
  const [OD, setOD] = useState(state.x); const [SD, setSD] = useState(state.y)

  return (
    <>
    <Map ownerData={OD} storeData={SD} />
    
    </>
  )
}

export default AdminScreen