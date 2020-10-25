export class Contact {
  _id: number;
  cod: number;
  name: string;
  namecompany: string;
  category: string;
  email: string;
  phono: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  constructor() {
    this.cod = 0;
    this.name = '';
    this.namecompany = '';
    this.category = '';
    this.email = '';
    this.phono = '';
    this.message = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
