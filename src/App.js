import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
//import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Form from "./components/Form";
import Table from "./components/Table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "primeflex/primeflex.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter } from "react-router-dom";


const App = () => {
  var isAdmin = sessionStorage.getItem('isAdmin');
  //console.log("in App.js ",isAdmin);
  const [showAdminIndicator, setShowAdminIndicator] = useState(false);




  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const username = sessionStorage.getItem('username');
        const response = await fetch(`http://localhost:3004/users?userName=${username}`);
        const data = await response.json();

        if (data.length > 0) {
          const user = data[0];
          setShowAdminIndicator(user.isAdmin);

        }
      } catch (error) {
        toast.error('Error fetching user role');
        console.error(error);
      }
    };

    fetchUserRole();
  }, []);
  const [contacts, setContacts] = useState([]);
  const [checked, setChecked] = useState(false);
  const fetchUserData = () => {
    fetch("http://localhost:3004/users")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setContacts(data)
      })
  }
  useEffect(() => {
    fetchUserData()
  }, [])
  //const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    userName: "",
    name: "",
    lastName: "",
    eMail: "",
    password: "",
  });

  const [editFormData, setEditFormData] = useState({
    userName: "",
    name: "",
    lastName: "",
    eMail: "",
    password: "",
  });
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFromChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    if (fieldName === 'isAdmin') {
      setChecked(event.target.checked);
      newFormData[fieldName] = event.target.checked ? 'true' : 'false';
      //console.log(fieldName);
    }

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    var checkboxValue = sessionStorage.getItem('isAdminChecked');
    if (checkboxValue === 'true') {
      checkboxValue = true;
    } else if (checkboxValue === 'false') {
      checkboxValue = false;
    }
    //console.log("in App state is, ",checkboxValue);
    const newContact = {
      id: nanoid(),
      userName: addFormData.userName,
      name: addFormData.name,
      lastName: addFormData.lastName,

      eMail: addFormData.eMail,
      password: addFormData.password,
      isAdmin: checkboxValue, // Set isAdmin based on the checkbox value
    };

    // Check if the username is already taken
    const isUsernameTaken = contacts.some(
      (contact) => contact.userName === newContact.userName
    );
    //console.log("in App state is, ",isAdmin);
    if (isUsernameTaken) {
      toast.warning("Username is already taken. Please choose another one.");
      return;
    }

    fetch("http://localhost:3004/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        const newContacts = [...contacts, data];
        setContacts(newContacts);

        // Reset the form fields
        setAddFormData({
          userName: "",
          name: "",
          lastName: "",
          eMail: "",
          password: "",

        });
        setChecked(false); // Reset the checkbox
        toast.success("User added successfully");
      })
      .catch((error) => {
        toast.error("Error adding user:", error);
      });
  };


  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    var editCheckboxValue = sessionStorage.getItem('isAdminChecked');
    if (editCheckboxValue === 'true') {
      editCheckboxValue = true;
    } else if (editCheckboxValue === 'false') {
      editCheckboxValue = false;
    }
    //console.log("in App state is, ",editCheckboxValue);
    const editedContact = {
      userName: editFormData.userName,
      name: editFormData.name,
      lastName: editFormData.lastName,
      eMail: editFormData.eMail,
      password: editFormData.password,
      isAdmin: editCheckboxValue, // Update isAdmin based on the checkbox value
    };

    // Check if the edited username is already taken
    const isUsernameTaken = contacts.some(
      (contact) =>
        contact.id !== editContactId && contact.userName === editedContact.userName
    );

    if (isUsernameTaken) {
      toast.warning("Username is already taken. Please choose another one.");
      return;
    }

    fetch(`http://localhost:3004/users/${editContactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedContact),
    })
      .then((response) => response.json())
      .then((data) => {
        const newContacts = [...contacts];
        const index = newContacts.findIndex(
          (contact) => contact.id === editContactId
        );
        newContacts[index] = { id: editContactId, ...data };

        setContacts(newContacts);
        setEditContactId(null);
        toast.success("User updated successfully");
      })
      .catch((error) => {
        toast.error("Error updating user:", error);
      });
  };


  const handleEditClick = (contact) => {
    isAdmin = sessionStorage.getItem('isAdmin');
    //console.log("in Handle Edit Click ",isAdmin);
    if (isAdmin === 'false') {
      toast.error("You are not authorized to edit users.");
      return;
    }

    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      userName: contact.userName,
      name: contact.name,
      lastName: contact.lastName,
      eMail: contact.eMail,
      password: contact.password,
    };

    setEditFormData(formValues);
    setChecked(contact.isAdmin === 'true');
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin === 'false') {
      toast.error("You are not authorized to edit users.");
      return;
    }
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      fetch(`http://localhost:3004/users/${contactId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Remove the deleted contact from the contacts array
            const newContacts = contacts.filter((contact) => contact.id !== contactId);
            setContacts(newContacts);
            toast.success("User deleted successfully");
          } else {
            toast.error("Failed to delete user.");
          }
        })
        .catch((error) => {
          toast.error("Error deleting user:", error);
        });
    }
  };

  return (
    <div>
      <ToastContainer theme='colored' position='top-center'></ToastContainer>

      <BrowserRouter>

        <Header />
        <Navbar />
        <div className="container">


          <Routes>

            <Route exact path="/" element={<Login />} />
            <Route exact path="/form" element={
              <>
                <Form

                  addFormData={addFormData}
                  handleAddFormChange={handleAddFromChange}
                  handleAddFormSubmit={handleAddFormSubmit}
                />
              </>} />
            <Route exact path="/table" element={
           
                <Table

                  contacts={contacts}
                  editContactId={editContactId}
                  editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleEditFormSubmit={handleEditFormSubmit}
                  handleCancelClick={handleCancelClick}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  ReadOnlyRow={ReadOnlyRow}
                  EditableRow={EditableRow}
                  showAdminIndicator={showAdminIndicator}

                />
            } />

            <Route exact path="/about" element={<h2>About</h2>} />

          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
