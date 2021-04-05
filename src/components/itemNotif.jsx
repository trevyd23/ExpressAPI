/* eslint-disable react/prop-types */
import React from 'react'

const ItemNotif = ({ cartItems = [] }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center', height: 15, width: 15, borderRadius: 10, backgroundColor: 'red', position: 'relative', left: 28, margin: -9, zIndex: 3,
  }}
  >
    <span style={{ fontSize: 10, color: 'white' }}>{cartItems.length}</span>
  </div>
)

export default ItemNotif
