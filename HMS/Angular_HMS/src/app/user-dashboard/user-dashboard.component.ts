import { Component, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { user } from '../user';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html' ,
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  public userId;
  public roleId;
  public editUserForm: FormGroup;
  public addUserForm: FormGroup;
  public users = [];
  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.displayUser();
    
    this.addUserForm = this.fb.group(
      {
        first_name: [''],
        last_name: [''],
        username: [''],
        address: [''],
        ph_no: [''],
        role_id: [+''],
        password: [''],
        dob: [''],
        user_id: [+'']
      }
    )

    this.editUserForm = this.fb.group(
      {
        first_name: [''],
        last_name: [''],
        username: [''],
        address: [''],
        ph_no: [''],
        role_id: [''],
        password: [''],
        dob: [''],
        user_id: [+'']
      }
    )
  } 

  displayUser() {
    this._userService.getUsers()
    .subscribe(data => {
      this.users = data;
      console.log("users data", this.users);
    });
  }

  addUser() {
    localStorage.removeItem('editUserId');    
    this.userId=-1;
  }

  deleteUser(user: user) {
    this._userService.deleteUser(user.user_id)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      })
  }
  editUser(User:user): void 
  {   
    localStorage.removeItem('editUserId');
    
    localStorage.setItem('editUserId', User.user_id.toString());
    this.userId=+localStorage.getItem('editUserId');
  
    if(this.userId>0)
    {
      this._userService.getUserById(this.userId).subscribe(data=>
        {
           this.editUserForm.patchValue(data);
        })
      }     
  }
  onSave(){
    let x=this.addUserForm.value.roleId ;
    x=parseInt(x);
    console.log("inside save",localStorage.getItem('editUserId'));
    if(this.userId>0)
    {
    this._userService.updateUser(this.editUserForm.value).subscribe(data=>
      {
    localStorage.removeItem('editUserId');
    // localStorage.removeItem('editRoleId')
    // this.roleId=+localStorage.getItem('editRoleId');
    this.userId=+localStorage.getItem('editUserId');
      }),
      error =>{
        alert(error);
      }
    }
    else if(this.userId==-1)
    {
      console.log("here");
      
    this._userService.createUser(this.addUserForm.value).subscribe(data=>
      {
    localStorage.removeItem('editUserId');      
    this.userId=+localStorage.getItem('editUserId');
    this.displayUser();

      }),
      error =>{
        alert(error);
      }
    }
    this.displayUser();
  }
  onCancel()
  {
    console.log("inside cancel");
    localStorage.removeItem('editUserId');
    this.userId=+localStorage.getItem('editUserId');
  }

}
