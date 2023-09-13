import React from 'react';

//import { Button } from 'primereact/button';

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick, showAdminIndicator }) => {
  //console.log("tableis admin, ",showAdminIndicator);
  return (
    <tr>

      <td>{contact.userName}</td>
      <td>{contact.name}</td>
      <td>{contact.lastName}</td>
      <td>{contact.eMail}</td>
      <td>{contact.isAdmin && showAdminIndicator && <span style={{ fontSize: "10px",color:'black'  }}><i className="pi pi-check" style={{ fontSize: '1rem' }}></i></span>}</td>
      
      <td>

        <img type="button" alt="For editing if you are an admin" src={require('./editbold.png')} style={{ width: 20, cursor: 'pointer' }} onClick={() => handleEditClick(contact)}>

        </img>
        <img type="button" alt="For deleting if you are an admin" src={require('./trash-can.png')} style={{ width: 20, marginLeft: 15, cursor: 'pointer' }} onClick={() => handleDeleteClick(contact.id)}>

        </img>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
