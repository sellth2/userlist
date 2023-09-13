import React, { useState } from 'react';
import { Button } from 'primereact/button';
import ReactDOM from 'react-dom';
import { Checkbox } from 'primereact/checkbox';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit,

}) => {

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.checked);
  };
  sessionStorage.setItem('isAdminChecked', checked);
  return ReactDOM.createPortal(
    <div className="portal-overlay">

      <div className="portal-container">
        <form className="form-edit" onSubmit={handleEditFormSubmit}>
          
          <table className="form-table">
            <tbody>
              <tr>
                <td>Username:</td>
                <td>
                  <input
                    type="text"
                    required="required"
                    placeholder="Enter a username..."
                    name="userName"
                    value={editFormData.userName}
                    onChange={handleEditFormChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>
                  <input
                    type="text"
                    required="required"
                    placeholder="Enter a name..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Lastname:</td>
                <td>
                  <input
                    type="text"
                    required="required"
                    placeholder="Enter a lastname..."
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  <input
                    type="email"
                    required="required"
                    placeholder="Enter an email..."
                    name="eMail"
                    value={editFormData.eMail}
                    onChange={handleEditFormChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  <input
                    type="password"
                    required="required"
                    placeholder="Enter new password..."
                    name="password"
                    value={editFormData.password}
                    onChange={handleEditFormChange}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2" className="form-buttons">
                  <Button
                    type="submit"
                    icon="pi pi-check"
                    rounded
                    text
                    severity="warning"
                    style={{ color: "black" }}
                    aria-label="Filter"
                  />
                  <Button
                    type="button"
                    icon="pi pi-times"
                    rounded
                    text
                    severity="warning"
                    style={{ color: "black" }}
                    aria-label="Cancel"
                    onClick={handleCancelClick}
                  />
                </td>
              </tr>
            </tbody>

          </table>
        </form>
        <div className='div_editadmin'>

            <Checkbox className="form__check" inputId="binary" value={checked} onChange={handleCheckboxChange}
            checked={checked} />
            <label className="form__check_label" htmlFor="binary">Admin</label>

          </div>
      </div>
    </div>,
    document.getElementById('portal-root') // Replace 'portal-root' with the ID of your portal container
  );
};

export default EditableRow;
