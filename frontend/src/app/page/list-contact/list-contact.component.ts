import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css'],
})
export class ListContactComponent implements OnInit {
  private contacts$: Subscription;
  public contacts: Array<any> = [];
  myForm: FormGroup;
  p: number = 1;
  total = Contact.length;
  public loading = false;

  constructor(
    private contactService: ContactService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  /*
      this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      namecompany: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      category: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  */
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    this.contacts$ = this.contactService.contacts$.subscribe(
      (observable) => (this.contacts = observable)
    );
    this.getListContacts();
  }
  ngOnDestroy() {
    this.contacts$.unsubscribe();
  }
  /*
   SaveContac() {
    if (!this.myForm.valid) {
      this.openSnackBar('Formulario incompleto', 'cerrar');
      return false;
    } else {
      this.contactService.SaveContact(this.myForm.value).subscribe((res) => {
        console.log(res),
          this.myForm.reset(),
          this.getListContacts(),
          this.openSnackBar('Registro guardado!', 'cerrar');
      });
    }
  }
  */
  createForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      namecompany: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      category: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }
  SaveContac() {
    this.contactService.SaveContact(this.myForm.value).subscribe((res) => {
      console.log(res),
        this.myForm.reset(),
        this.getListContacts(),
        this.openSnackBar('Registro guardado!', 'cerrar');
    });
  }
  getListContacts() {
    this.contactService.getListContact().subscribe();
  }

  Selected(id) {
    this.router.navigate(['/view', id]);
  }
  deleteContact(contact, i) {
    if (window.confirm('Esta seguro que desea eliminar este Registro?')) {
      this.contactService.deleteEntrie(contact._id).subscribe();
      this.openSnackBar('Registro Eliminado', 'cerrar');
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  openSnackBarSave(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  openSnackBarValid(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
