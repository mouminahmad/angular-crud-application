import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,NgxPaginationModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  Department : string = '';
  Name : string = '';
  Gender : string = '';
  items: any[] = [];
  p :any;
  
  userList : UserModel[] = [];
  editMode : boolean = false;
  user  : UserModel = {

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

  constructor(private _userService : UserService , private _toastrService : ToastrService ){}

  ngOnInit() : void
  {
    this.getUserList();
    this.getData();
  }

  cityList : string []  =  ["Lahore" , "Multan" , "Karachi" , "Sialkot", "Faislabad"];
  departmentList : string[] = ["IT" , "HR" , "Accounts" , "sales" , "Managmant"]

  getUserList()
  {
    this._userService.getUsers().subscribe((res) =>{
      this.userList = res;
    } );
  }

  onSubmit(form: NgForm): void {
    debugger;
    if (this.editMode) {
      console.log(form);
      this._userService.updateUser(this.user).subscribe((res) => {
        this.getUserList();
        this.editMode = false;
        form.reset();
        this._toastrService.success('User Updated Successfully', 'Success');

      });
    }
    else {
      console.log(form);
      this._userService.addUser(this.user).subscribe((res) => {
        this.getUserList();
        form.reset();
        this._toastrService.success('User Added Successfully', 'Success');

      });
    }

  }

  onDelete(id : any){
    const isConfirm  = confirm('Are you sure want to delete this user?');
    if(isConfirm){
      this._userService.deleteUser(id).subscribe((res) => {
        this._toastrService.error('user deleted successfully, Deleted');
        this.getUserList();
      });
    }
  }

  onEdit(userdata : UserModel){
    this.user = userdata;
    this.editMode = true;
  }

  onResetForm( form : NgForm){
    form.reset();
    this.editMode = false;
    this.getUserList();
  }

  data:any =[];
  getData(){
    this._userService.getUsers().subscribe(
      (data) => {
        this.data =data;
        console.log(this.data)
      }
    )
  }

}
