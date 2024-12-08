import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useToast } from '../components/ui/use-toast';
import { Toast } from '../components/ui/toast';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser , setNewUser ] = useState({ username: '', email: '', role: 'customer' });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage the open/close dialog box
  const {toast, showToast} = useToast(); 


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser ({ ...newUser , [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/users/', newUser );
      fetchUsers();
      setNewUser ({ username: '', email: '', role: 'customer' });
      setIsDialogOpen(false); // Close the dialog after adding user
      showToast({
        title: "User Added"
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
      fetchUsers();
      showToast({
        title: "User Deleted",
        variant:"destructive"
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User  Management</h2>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-4 py-2 transition duration-300 ease-in-out">
            Add New User
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="username"
              value={newUser .username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
            <Input
              type="email"
              name="email"
              value={newUser .email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <select
              name="role"
              value={newUser .role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md px-4 py-2 transition duration-300 ease-in-out">
              Add User
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
 <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button 
                  className="bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md px-4 py-2" 
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toast toast={toast} />

    </div>
  );
}

export default UserManagement;