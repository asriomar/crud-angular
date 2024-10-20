import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // Import ReactiveFormsModule, FormGroup, FormControl, Validators
import { NgFor, NgIf } from '@angular/common'; // Import NgFor for *ngFor directive

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-data',
  standalone: true,
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  imports: [ReactiveFormsModule, NgFor, NgIf]  // Ensure ReactiveFormsModule and NgFor are added here
})
export class UserDataComponent {
  users: User[] = [];  // List of users
  isEditMode = false;  // Flag to track whether it's edit mode
  currentUserId: number | null = null;  // Store the ID of the user being edited

  // Define the form using FormGroup and FormControl
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),  // Name field with required validation
    email: new FormControl('', [Validators.required, Validators.email])  // Email field with required and email validation
  });

  // Handle form submission
  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.isEditMode && this.currentUserId !== null) {
        this.updateUser(this.currentUserId, userData);
      } else {
        this.addUser(userData);
      }

      this.resetForm();  // Reset form after adding or updating
    }
  }

  // Add a new user to the users array
  addUser(userData: any) {
    const newUser: User = {
      id: this.users.length + 1,
      name: userData.name,
      email: userData.email,
    };
    this.users.push(newUser);  // Add the new user to the users list
  }

  // Edit the existing user by setting the form data to the selected user
  editUser(userId: number) {
    const userToEdit = this.users.find(user => user.id === userId);
    if (userToEdit) {
      this.isEditMode = true;
      this.currentUserId = userToEdit.id;
      this.userForm.patchValue({
        name: userToEdit.name,
        email: userToEdit.email,
      });
    }
  }

  // Update the user information in the users array
  updateUser(userId: number, userData: any) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].name = userData.name;
      this.users[userIndex].email = userData.email;
    }
    this.isEditMode = false;
    this.currentUserId = null;
  }

  // Delete a user from the users array
  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  // Reset the form and exit edit mode
  resetForm() {
    this.userForm.reset();
    this.isEditMode = false;
    this.currentUserId = null;
  }
}
