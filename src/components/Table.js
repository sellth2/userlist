import React, { Fragment, useEffect ,useRef, useState } from "react";
import { createPortal } from 'react-dom';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Table = ({

  contacts,
  editContactId,
  editFormData,
  handleEditFormChange,
  handleEditFormSubmit,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
  ReadOnlyRow,
  EditableRow,
  showAdminIndicator,
  

}) => {
  

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("portal-overlay")) {
        handleCancelClick();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleCancelClick]);
  const isMounted = useRef(false); // Ref to track mount state
  //console.log(isAdmin);
  const [checked, setChecked] = useState(false);
  const usenavigate = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem('username');

    if (!isMounted.current) {
      // Only execute the effect on mount
      isMounted.current = true;
    } else {
      // Effect should not run after the initial mount
      return;
    }

    if (username === '' || username === null) {
      toast.warning("You are not authorized for viewing this page. Please log in first.");
      usenavigate('/');
    }
  }, [usenavigate]);
  return (
    <div>
      
      <h2>User List</h2>
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>

              <th className="table-header">Username</th>
              <th className="table-header">Name</th>
              <th className="table-header">Lastname</th>
              <th className="table-header">E-mail</th>
              <th className="table-header">Admin</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment key={contact.id}>
                {editContactId === contact.id ? (
                  createPortal(
                    <EditableRow
                      contact={contact}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleEditFormSubmit={handleEditFormSubmit}
                      handleCancelClick={handleCancelClick}
                    />,
                    document.getElementById('portal-root')
                  )
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    showAdminIndicator={showAdminIndicator}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
