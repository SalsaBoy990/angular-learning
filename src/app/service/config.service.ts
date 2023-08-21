import { Injectable } from '@angular/core';
import {Navigation} from "../interface/navigation";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = 'http://localhost:3000/';

  navigation: Navigation[] = [
    {label: 'Home', href: '', role: 1},
    {label: 'Users', href: '/users', role: 2},
  ];

  constructor() { }
}
