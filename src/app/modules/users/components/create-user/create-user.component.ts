import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlState,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  public users!: User[];

  public userForm!: FormGroup;

  public phoneMask = '(00) 0 0000-0000';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.phoneNumberSubscription();
  }

  public buildForm(): void {
    this.userForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-ZÀ-ÿ]{2,}(?: [a-zA-ZÀ-ÿ]+){1,}$'),
      ]),
      profession: new FormControl(),
      birthDate: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        this.documentValidator,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(),
      address: new FormGroup({
        zipCode: new FormControl(),
        street: new FormControl(),
        number: new FormControl(),
        complement: new FormControl(),
        neighborhood: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
      }),
    });
  }

  public onSubmit(): void {
    this.users = JSON.parse(localStorage.getItem('USERS') || '[]');
    const user: User = {
      ...this.userForm.getRawValue(),
      id: crypto.randomUUID(),
    };
    this.users.push(user);
    localStorage.setItem('USERS', JSON.stringify(this.users));
  }

  public onCancel(): void {
    this.router.navigate(['/users']);
  }

  private phoneNumberSubscription(): void {
    this.userForm.controls['phone'].valueChanges.subscribe((value) => {
      this.phoneMask =
        value.length === 10 ? '(00) 0000-00009' : '(00) 0 0000-0000';
    });
  }

  private documentValidator({ value }: FormControlState<string>) {
    if (!value) return { invalidDocument: true };
    value = value.replace(/[^\d]+/g, '');
    if (value == '') return { invalidDocument: true };

    // Elimina CPFs invalidos conhecidos
    if (
      value.length != 11 ||
      value == '00000000000' ||
      value == '11111111111' ||
      value == '22222222222' ||
      value == '33333333333' ||
      value == '44444444444' ||
      value == '55555555555' ||
      value == '66666666666' ||
      value == '77777777777' ||
      value == '88888888888' ||
      value == '99999999999'
    )
      return { invalidDocument: true };

    // Valida 1o digito
    let add = 0;

    for (let i = 0; i < 9; i++) {
      add += parseInt(value.charAt(i)) * (10 - i);
    }

    let rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;

    if (rev != parseInt(value.charAt(9))) return { invalidDocument: true };

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(value.charAt(i)) * (11 - i);
    }

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(value.charAt(10))) return { invalidDocument: true };

    return null;
  }
}
