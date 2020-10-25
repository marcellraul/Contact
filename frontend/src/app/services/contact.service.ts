import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  readonly URL_API = 'http://localhost:3000/contact';
  private contacts: Array<Contact> = [];
  public contacts$ = new BehaviorSubject(this.contacts);
  private contact: Contact = new Contact();
  public contact$ = new BehaviorSubject(this.contact);

  constructor(private http: HttpClient) {
    this.contacts$.subscribe(console.log);
  }

  setContact(value) {
    this.contact$ = value;
    this.contact$.next(this.contact);
  }

  setContacts(value) {
    if (Array.isArray(value)) this.contacts = value;
    else this.contacts.push(value);
    this.contacts$.next(this.contacts);
  }

  SaveContact(contact: Contact): Observable<any> {
    return this.http.post<any>(this.URL_API, contact, this.httpOptions).pipe(
      tap((contact) => this.setContacts(contact.contact)), //response backend
      catchError(this.handleError<Contact>('Save'))
    );
  }

  getListContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.URL_API).pipe(
      tap((contact) => this.setContacts(contact)),
      catchError(this.handleError<Contact[]>('Gets', []))
    );
  }

  getContact(id): Observable<Contact> {
    return this.http.get<Contact>(this.URL_API + '/' + id).pipe(
      tap((contact) => this.setContacts(contact)),
      catchError(this.handleError<Contact>(`contact id=${id}`))
    );
  }

  deleteEntrie(id): Observable<Contact[]> {
    return this.http
      .delete<Contact[]>(this.URL_API + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => {
          const index = this.contacts.map((p) => p._id).indexOf(id);
          this.contacts.splice(index, 1);
          this.setContacts(this.contacts);
        }),
        catchError(this.handleError<Contact[]>('Delete '))
      );
  }

  updateProduct(id, contact: Contact): Observable<any> {
    return this.http
      .put(this.URL_API + '/' + id, contact, this.httpOptions)
      .pipe(
        tap((_) => this.getListContact().subscribe()),
        catchError(this.handleError<Contact[]>('Update '))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
