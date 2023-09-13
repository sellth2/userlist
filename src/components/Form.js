
import React, { useState, useEffect, useRef } from "react";
import { Button} from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Checkbox } from 'primereact/checkbox';

const Form = ({

  addFormData,
  handleAddFormChange,
  handleAddFormSubmit
}) => {
  
  const isMounted = useRef(false); // Ref to track mount state
  //console.log(isAdmin);
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.checked);
  };
  //console.log("in From state is ",checked);
  const usenavigate = useNavigate();
  const isAdmin = sessionStorage.getItem('isAdmin');
  //console.log("in Form ",isAdmin);
  sessionStorage.setItem('isAdminChecked', checked);
  useEffect(() => {
    let username = sessionStorage.getItem('username');
    const isAdmin = sessionStorage.getItem('isAdmin');
    //console.log(isAdmin); // Use the isAdmin value as needed
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
    if (isAdmin === 'false') {
      toast.warning("You are not authorized for viewing this page.");
      usenavigate('/table');
    }
  }, [usenavigate]);
  
 
  return (
    <div>
     
      <h2>Add User</h2>
      <form className="form__group field" onSubmit={handleAddFormSubmit}>
        <div className="form-input-material">
          <input
            type="text"
            className="form__field"
            name="userName"
            required="required"
            placeholder="Username"
            autoComplete="off"
            onChange={handleAddFormChange}
            value={addFormData.userName}
          />
          <label className="form__label">Username</label>
        </div>
        <div className="form-input-material">
          <input
            type="text"
            className="form__field"
            name="name"
            required="required"
            placeholder="Name"
            autoComplete="off"
            onChange={handleAddFormChange}
            value={addFormData.name}
          />
          <label className="form__label">Name</label>
        </div>
        <div className="form-input-material">
          <input
            type="text"
            className="form__field"
            name="lastName"
            required="required"
            placeholder="Lastname"
            autoComplete="off"
            onChange={handleAddFormChange}
            value={addFormData.lastName}
          />
          <label className="form__label">Lastname</label>
        </div>
        <div className="form-input-material">
          <input
            type="email"
            className="form__field"
            name="eMail"
            required="required"
            placeholder="E-Mail"
            autoComplete="off"
            onChange={handleAddFormChange}
            value={addFormData.eMail}
          />
          <label className="form__label">E-Mail</label>
        </div>
        <div className="form-input-material">
          <input
            type="password"
            className="form__field"
            name="password"
            required="required"
            placeholder="Password"
            onChange={handleAddFormChange}
            value={addFormData.password}
          />
          <label className="form__label">Password</label>
        </div>
        <div className="form-input-material">
          <Checkbox className="form__check" inputId="binary"onChange={handleCheckboxChange}
            checked={checked}/>
          <label className="form__check_label" htmlFor="binary">Admin</label>
        </div>
        <Button className="btn-add" type="submit" label="Add" icon="pi pi-check" ></Button>
      </form>
    </div>

  );
}; 

export default Form;