import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../services/contact.service';
import { Contact } from 'src/app/models/contact';
@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css'],
})
export class ViewContactComponent implements OnInit {
  id: string;
  contact: Contact;
  myForm: FormGroup;
  constructor(
    private ActivateRouter: ActivatedRoute,
    private contactService: ContactService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.ActivateRouter.snapshot.paramMap.get('id');
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      namecompany: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      category: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  onClick() {
    this.location.back();
  }
  ngOnInit(): void {
    this.ActivateRouter.params.subscribe((params) => {
      (this.id = params['id']),
        this.contactService.getContact(this.id).subscribe(
          (res) => {
            (this.contact = res), console.log(res);
          },
          (err) => console.log(err)
        );
    });
  }

  getListContacts() {
    this.contactService.getListContact().subscribe();
  }
  Save() {
    this.router.navigate(['/contact']);
    this.openSnackBar('Registro Actualizado', 'cerrar');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
