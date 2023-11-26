import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }
}
