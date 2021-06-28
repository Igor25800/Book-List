import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/components/modal-dialog/modal-dialog.component';
import { IUser } from 'src/app/shared/interfaces/user.interfaces';
import { User } from 'src/app/shared/models/user.model';
import { BooksService } from 'src/app/shared/services/books/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy {

  isBtn :boolean
  index:number

  userArr:Array<IUser>

  constructor(
    public dialog: MatDialog,
    private userServices : BooksService
    ) { }

  ngOnInit(): void {
    this.userServices.getArr$.subscribe(() => {
     this.getUser()
  })
  this.getUser()
  }

  ngOnDestroy():void {
    this.userServices.getArr$.unsubscribe()
  }

  getUser():void {
    this.userServices.getUser().subscribe(res => {
      this.userArr = res
    })
  }

  bollean(isbtn : boolean , index? :number , ):void{
    if(isbtn) {
      this.isBtn = isbtn
      this.index = index
    }
    else {
      this.isBtn = isbtn
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '30%',
      data: {arr : this.userArr , bollean : this.isBtn , index: this.index }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteUser(user:IUser):void{
    console.log(user);
    
    this.userServices.deleteUser(user).subscribe(()=> {
      this.getUser()
    })
  }



}
