import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, NgxPaginationModule, CommonModule , RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

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
  };

  userList: UserModel[] = [];
  editMode: boolean = false;

   // Dropdown list data
   cityList: string[] = ['Lahore', 'Multan', 'Karachi', 'Sialkot', 'Faisalabad'];
   departmentList: string[] = ['IT', 'HR', 'Accounts', 'Sales', 'Management'];

  // Inject ActivatedRoute to get the route parameters
  constructor(private _userService: UserService, 
              private _toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getUserList();

    // Get user ID from the URL if editing
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.editMode = true;
        this.getUserById(userId); // Fetch user data by ID
      }
    });
  }

  getUserList(): void {
    this._userService.getUsers().subscribe(res => {
      this.userList = res;
    });
  }

  // Fetch user data by ID for editing
  getUserById(id: string): void {
    this._userService.getUserById(id).subscribe(
      (user) => {
        this.user = user; // Assign the user data to the form model
      },
      (error) => {
        console.error('Error fetching user data', error);
        this._toastrService.error('Failed to load user data', 'Error'); // Handle errors
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (this.editMode) {
      this._userService.updateUser(this.user).subscribe(() => {
        this._toastrService.success('User Updated Successfully', 'Success');
        this.router.navigate(['/display']); // Redirect to user list after update
      });
    } else {
      this._userService.addUser(this.user).subscribe(() => {
        this._toastrService.success('User Added Successfully', 'Success');
        form.reset();
        this.getUserList(); // Refresh the user list
      });
    }
  }

  onDelete(id: number): void {
    const isConfirm = confirm('Are you sure want to delete this user?');
    if (isConfirm) {
      this._userService.deleteUser(id).subscribe(() => {
        this._toastrService.error('User deleted successfully', 'Deleted');
        this.getUserList();
      });
    }
  }

  onEdit(userdata: UserModel): void {
    this.router.navigate(['/user', userdata.id]); // Navigate to edit route
  }

  onResetForm(form: NgForm): void {
    form.reset();
    this.editMode = false;
    this.getUserList();
  }
}
