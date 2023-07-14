import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlState,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  first,
  map,
  merge,
  mergeMap,
  switchAll,
  switchMap,
} from 'rxjs';
import { User } from 'src/app/modules/users/models/user.model';
import { AddressDto } from '../../models/address.dto';
import { Address } from '../../models/address.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  public users!: User[];
  public user?: User;
  public id?: string;
  public title = 'Novo Usuário';

  public userForm!: FormGroup;

  public phoneMask = '(00) 0 0000-0000';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.phoneNumberSubscription();
    this.zipCodeSubscription();

    this.id = this.route.snapshot.params['id'];
    // this.route.params.subscribe((value) => console.log(value));

    if (this.id) {
      this.user = this.usersService.findById(this.id);
      this.title = 'Editar Usuário';
      this.updateForm();
    }
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

  private updateForm(): void {
    this.userForm.patchValue(this.user as User);
  }

  public onSubmit(): void {
    if (this.id) {
      this.usersService.update(this.userForm.getRawValue());
    } else {
      this.usersService.create(this.userForm.getRawValue());
    }
    this.router.navigate(['/users']);
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

  private zipCodeSubscription(): void {
    this.userForm
      .get('address')
      ?.get('zipCode')
      ?.valueChanges.pipe(
        debounceTime(2000),
        // delay(5),
        filter((value) => value.length === 8),
        distinctUntilChanged(
          (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
        )
      )
      .subscribe({
        next: (response) => {
          this.getAddressByZipCode(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getAddressByZipCode(zipCode: string): void {
    this.usersService
      .getAddressByZipCode(zipCode)
      .pipe(
        first(),
        map((address: AddressDto) => {
          const mappedAdress: Address = {
            zipCode: address.cep,
            street: address.logradouro,
            complement: address.complemento,
            city: address.localidade,
            neighborhood: address.bairro,
            state: address.uf,
          };
          return mappedAdress;
        })
      )
      .subscribe({
        next: (address: Address) => {
          this.userForm.get('address')?.patchValue(address);
        },
        error: (err) => {
          console.log(err);
        },
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
