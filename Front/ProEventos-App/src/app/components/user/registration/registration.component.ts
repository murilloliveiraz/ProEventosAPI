import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmarSenha')
    };

    this.form = this.fb.group({
      primeiroNome : ['', Validators.required],
      segundoNome : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario : ['', Validators.required],
      senha : ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha : ['', Validators.required],
    }, formOptions);
  }

  public resetForm(): void {
    this.form.reset();
  }
}
