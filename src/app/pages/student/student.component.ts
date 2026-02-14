import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { StudentService } from '../../core/service/student.service';
import { Student } from '../../core/models/Student';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorUtils } from '../../core/utils/error-utils'
import { DateUtils } from '../../core/utils/date-utils'
import { StudentUtils } from '../../core/utils/student-utils';

@Component({
  selector: 'app-student',
  imports: [CommonModule, MaterialModule],
  templateUrl: './student.component.html',
  standalone: true,
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  readonly studentNumberId;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);
  private formBuilder = inject(FormBuilder);
  private errorUtils = inject(ErrorUtils);
  private dateUtils = inject(DateUtils)
  private studentUtils = inject(StudentUtils)
  private student: Student = {
    studentNumber: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    subscribeStart: '',
    subscribeEnd: ''
  };
  studentForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  

  constructor() {
    this.studentNumberId = this.route.snapshot.paramMap.get('studentNumber') + '';
  }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
        studentNumber: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthDate: ['', Validators.required],
        phoneNumber: [''],
        email: [''],
        subscribeStart: [''],
        subscribeEnd: ['']
      },
    );
    if (this.studentUtils.studentNumberIdExist(this.studentNumberId)) {
      this.studentService.getByStudentNumber(this.studentNumberId)
        .pipe(this.errorUtils.returnErrorIfConnectionFailed(this.router))
        .subscribe((response: any) => {
          this.student = response
          Object.keys(this.student).forEach((key) => {
            const typedKey = key as keyof Student;
            if (this.studentUtils.getDateFieldsNames().includes(typedKey.toString())) {
              this.student[typedKey] = this.dateUtils.fromDMYToIso(this.student[typedKey])
            }
            this.studentForm.controls[key].setValue(this.student[typedKey])
          })
        })
    }
  }

  get form() {
    return this.studentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentForm.invalid) {
      return;
    }
    Object.keys(this.student).forEach((key) => {
      const typedKey = key as keyof Student;
      if (this.studentUtils.getDateFieldsNames().includes(typedKey.toString())) {
        this.student[typedKey] = this.dateUtils.fromIsoToDMY(this.studentForm.get(key)?.value)
      } else {
        this.student[typedKey] = this.studentForm.get(key)?.value
      }
    })
    if (this.studentUtils.studentNumberIdExist(this.studentNumberId)) {
      this.studentService.updateStudent(this.studentNumberId, this.student)
        .pipe(this.errorUtils.returnErrorIfConnectionFailed(this.router))
        .subscribe(() => { this.router.navigate(['/students']) });
    } else {
      this.studentService.createStudent(this.student)
        .pipe(this.errorUtils.returnErrorIfConnectionFailed(this.router))
        .subscribe(() => { this.router.navigate(['/students']) });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.studentForm.reset();
    this.router.navigate(['/students'])
  }
}
