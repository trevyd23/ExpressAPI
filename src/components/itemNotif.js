import React, { Component } from 'react';

const ItemNotif = ({ cartItems = [] }) => {

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 15, width: 15, borderRadius: 10, backgroundColor: "red", position: "relative", left: 28, margin: -9, zIndex: 3, }}>
            <span style={{ fontSize: 10, color: 'white' }}>{cartItems.length}</span>
        </div>
    )
}

export default ItemNotif;