import { Component, ElementRef, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { users } from '../services/websql.service';
import { BehaviorSubject } from 'rxjs';
import { UsermanagementComponent } from '../usermanagement/usermanagement.component';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Input() formname = '';
  @Input() userid!:number;
  @Input() usrname!:string;
  @Input() usremail!:string;
  @Input() usrphone!:string;
  @Input() usrrole!:string;
  @ViewChild('updateForm')
  formUpdate!:  NgForm;
  @ViewChild('updateusername')
  updateUserdata! : any;

  fName!: string;
  signupForm: FormGroup ;
  updateform!:FormGroup;
  loading = false;
  submitted = false;
  isLoggedin = false;
  mode!: any;
  role!: string;
  loginStatus = new BehaviorSubject<any>(false);
  name!:string;


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      public userdb : users,
      private usermgmt: UsermanagementComponent,
  ) {

    // console.log(this.formname);
    // this.updateform = {
    //   updateusername: "",
    //   updateemail: "",
    //   updatephone: "",
    //   updaterole: "",
    // };

    this.updateform = this.formBuilder.group({
      updateusername: new FormControl('', Validators.compose([
        Validators.required
      ])),
      updateemail: new FormControl('', Validators.compose([
        Validators.required
      ])),
      updatephone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      updaterole: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      role: new FormControl('', Validators.compose([Validators.required]))
    });

  }

  ngOnInit() {

    this.fName = this.formname;
    // alert("ONINIT");
    if(this.fName == 'edit'){
      this.setuserDetail(this.usrname,this.usremail,this.usrphone,this.usrrole);
    }

  }

  get f() { return this.signupForm.controls; }


  async onSubmit() {
    let formValue = this.signupForm.value;
    this.submitted = true;
    console.log(this.signupForm);
    if(this.signupForm.status != 'INVALID'){
      console.log(formValue);
      this.userdb.insertData(
        formValue.username,
        formValue.phone,
        formValue.email,
        formValue.password,
        formValue.role
        );

        let userdata = await this.userdb.getUsrWithEmail(formValue.email, formValue.password).then(res => {
          return res;
        });

       if(this.fName == 'add'){
        this.usermgmt.hideModel();
        this.snackBar.open("record added successfully", 'close', {
          duration: 3000
        });
        this.signupForm.reset();
        this.usermgmt.getUserdetails();
       }
       else{
        this.router.navigate(['/dashboard']);
        localStorage.setItem("user_id", JSON.stringify(userdata.id));

        this.isLoggedin = true;
        this.role = userdata.role;
        localStorage.setItem("isloggedin", JSON.stringify(this.isLoggedin));
        localStorage.setItem("role", JSON.stringify(this.role));
        this.loginStatus.next(this.isLoggedin);
        this.snackBar.open("signedup successfully", 'close', {
          duration: 3000
        });

       }
    }
    else{
      this.snackBar.open("Please enter the required fields",'close', {
        duration: 3000
      });
    }
  }

  setuserDetail(name: string,email: string,phone: string,role: string){
    // this.ngOnInit();
    this.updateform.controls['updateusername'].setValue(name);
    this.updateform.controls['updateemail'].setValue(email);
    this.updateform.controls['updatephone'].setValue(phone);
    this.updateform.controls['updaterole'].setValue(role);

    // this.onEdit(formdata);
  }


  onupdate() {
    // console.log(form);
    this.usermgmt.hideeditModel();
    let formValue = this.updateform.value;
    console.log(formValue);
    this.userdb.updateData(this.userid,formValue.updateusername,formValue.updatephone,formValue.updateemail,formValue.updaterole);


    setTimeout(() => {
      this.usermgmt.getUserdetails();
      this.snackBar.open("updated successfully", 'close', {
        duration: 3000
      });
    }, 2000);
  }


}

