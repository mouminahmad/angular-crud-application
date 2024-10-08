import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../model/user';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [NgxPaginationModule , CommonModule, RouterModule ,FormsModule],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']  // corrected "styleUrl" to "styleUrls"
})
export class DisplayComponent implements OnInit {
  searchtext: string = '';
  userList: UserModel[] = [];
  filteredUserList: UserModel[] = [];
  p: any;

  // Model
  
  isEditMode: boolean = false;
  user: UserModel = {
    department: '',
    name: '',
    mobile: '',
    email: '',
    gender: '',
    doj: '',
    city: '',
    salary: 0,
    address: '',
    status: false,
  }

  constructor(private _userService: UserService, private _toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getUserList();
    this.getData();
  }

  // Get user data by ID for editing
  getUserById(id: string) {
    this._userService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }

  // Get user list
  getUserList() {
    this._userService.getUsers().subscribe((res) => {
      this.userList = res;
      this.filteredUserList = res; // Initialize filtered list
    });
  }

  // Edit
  onEdit(userdata: UserModel) {
    this.user = { ...userdata };  // Make sure a copy of the data is assigned to avoid reference issues
    this.isEditMode = true;
    this.router.navigate(['/user', userdata.id]);  // This will load the form with the user data
  }

  // Delete
  onDelete(id: any) {
    const isConfirm = confirm('Are you sure want to delete this user?');
    if (isConfirm) {
      this._userService.deleteUser(id).subscribe((res) => {
        this._toastrService.error('user deleted successfully, Deleted');
        this.getUserList();
      });
    }
  }

  // Search users based on name, email, or department
  searchUsers() {
    if (this.searchtext) {
      this.filteredUserList = this.userList.filter((user) =>
        user.name.toLowerCase().includes(this.searchtext.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchtext.toLowerCase()) ||
        user.department.toLowerCase().includes(this.searchtext.toLowerCase())
      );
    } else {
      this.filteredUserList = this.userList; // Reset to original list if search text is empty
    }
  }
  
  // Pagination 
  data: any = [];
  getData() {
    this._userService.getUsers().subscribe(
      (data) => {
        this.data = data;
        console.log(this.data);
      }
    );
  }
}
