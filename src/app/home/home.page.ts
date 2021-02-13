import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordsValidator } from '../validators/passwords';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public formulario: FormGroup;
  public matchingPassword: FormGroup;
  // public isSubmited = false;

  constructor(private formBuilder: FormBuilder) {
    this.matchingPassword = new FormGroup(
      {
        senha: new FormControl(
          "",
          Validators.compose([
            Validators.minLength(5),
            Validators.required,
            Validators.pattern(
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
            ),
          ])
        ),
        confirm_password: new FormControl("", Validators.required),
      },
      (formGroup: FormGroup) => {
        return PasswordsValidator.areEqual(formGroup);
      }
    );

    // this.matching_passwords_group = this.formBuilder.group(
    //   {
    //     password: [
    //       "",
    //       [
    //         Validators.minLength(5),
    //         Validators.required,
    //         Validators.pattern(
    //           "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
    //         ),
    //       ],
    //     ],
    //     confirm_password: ["", [Validators.required]],
    //   },
    //   (formGroup: FormGroup) => {
    //     return PasswordValidator.areEqual(formGroup);
    //   }
    // );

    this.formulario = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
      ]],
      senha: this.matchingPassword
    });
  }

  submitForm() {
    console.log('Submetido');
    // this.isSubmited = true;
    if (this.formulario.valid) {
      // this.isSubmited = false;
      console.log('Preencha todos os campos obrigatórios');
      console.log(this.formulario.value);
    }
  }

  validation_messages = {
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ]
  }

}
