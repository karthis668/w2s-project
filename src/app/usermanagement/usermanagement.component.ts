import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { users } from '../services/websql.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  @ViewChild('close')
  close!: ElementRef;
  @ViewChild('closeedit')
  closeedit!: ElementRef;
  editmode : boolean =  false;
  loading = true;
  usersList : any;
  dbUserList : any[]=[];
  userId!:number;
  updateUserdata!: { updateusername: string; updateemail: string; updatephone: string; updaterole: string; };
  constructor(
    public apiservice: ApiService,
    public userdb: users,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    this.getFakeapiUsers();
    this.getUserdetails();
  }

  getFakeapiUsers(){
    this.apiservice.getSampleData().subscribe(
      res =>{
        let users = res;
        this.loading = false;
        this.usersList = users;
        console.log(this.usersList);
      },
      error =>{
        console.log(error);
      }
    )
  }

  async getUserdetails(){
    this.dbUserList = await this.userdb.getallRecords().then(res => {
      return res;
    });
    console.log("+++");
    // console.log(userrecords);
    // this.dbUserList.unshift(userrecords);
    console.log(this.dbUserList);
    console.log("__________________________");
  }

  updateuser(id:number){
    this.loading = true;
    setTimeout(()=>{
      this.editmode = !this.editmode;
    console.log(id);
    this.userId = id;
    const signupComponent = this.injector.get(SignupComponent);
     this.userdb.getUsrWithId(this.userId).then(res =>{
      this.updateUserdata ={
         updateusername: res?.user_name,
         updateemail: res.email,
         updatephone: res.phone,
         updaterole: res.role,
       };
       console.log("pppppppppppp",this.updateUserdata);
       this.loading = false;
     });
    },3000);

  }

  hideModel() {
    this.close.nativeElement.click();
  }

  hideeditModel() {
    this.closeedit.nativeElement.click();
  }

}
