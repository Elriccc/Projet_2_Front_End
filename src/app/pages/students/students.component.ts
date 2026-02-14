import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { StudentService } from '../../core/service/student.service';
import { ErrorUtils } from '../../core/utils/error-utils'

@Component({
  selector: 'app-students',
  imports: [CommonModule, MaterialModule],
  templateUrl: './students.component.html',
  standalone: true,
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  private studentService = inject(StudentService);
  private router = inject(Router);
  private errorUtils = inject(ErrorUtils)
  public students: any;
  submitted: boolean = false;

  ngOnInit() {
    this.populateStudents()
  }

  populateStudents(){
    this.studentService.getAll()
      .pipe(this.errorUtils.returnErrorIfConnectionFailed(this.router))
      .subscribe(response => {this.students = response})
  }

  editStudent(studentNumber: String){
    this.router.navigate(['/students/'+studentNumber]);
  }

  deleteStudent(studentNumber: String){
    this.studentService.delete(studentNumber)
      .pipe(this.errorUtils.returnErrorIfConnectionFailed(this.router))
      .subscribe(() => {this.populateStudents();})
  }

  newStudent(): void {
    this.router.navigate(['/students/new']);
  }
}
