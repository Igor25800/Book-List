import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { IUser } from 'src/app/shared/interfaces/user.interfaces';
import { User } from 'src/app/shared/models/user.model';
import { BooksService } from 'src/app/shared/services/books/books.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {


  category : Array<any>  = [ 
    {name : 'Ужаси'},
    {name : 'Комедія'},
    {name : 'Триллер'}
  ]
  userForm:FormGroup

  constructor(
    public dialogRer: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {arr:Array<IUser> , bollean:boolean , index: number},
    private formBulider :FormBuilder,
    private userServices : BooksService,
   
  ) { }

  ngOnInit(): void {
    this.form()
    this.edit()
  }

  edit():void {
    console.log(this.data.bollean);
    
    if(this.data.bollean) {
      const user = this.data.arr.find(({id})=> {
    
        
        return id  === this.data.index  
      } )
      console.log(user);
      
      console.log(this.data.arr);
      console.log(this.data.index , 'index');
      
      
      this.userForm.patchValue({...user})
    }
  }

  form():void {
    this.userForm = this.formBulider.group({
      books: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      isbn: new FormControl('',Validators.required),

    })
  }

  addUsers():void {
    const {books , name , category ,isbn} = this.userForm.value
    const user = new User(1 , books, name , category, isbn)
    if(this.data.bollean) {
      user.id = this.data.index
      this.userServices.updateUser(user).subscribe(()=> {
        this.userServices.getArr$.next()
    })
  } else {

    if (this.data.arr.length > 0) {
      user.id = this.data.arr.slice(-1)[0].id + 1;
    }
    this.userServices.addUser(user).subscribe(() => {
      this.userServices.getArr$.next()
    })
      
  }
    
  this.dialogRer.close()
  }

}
