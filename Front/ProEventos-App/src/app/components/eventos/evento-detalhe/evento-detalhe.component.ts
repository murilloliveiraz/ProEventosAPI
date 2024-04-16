import { Evento } from '@app/models/Evento';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Lote } from '@app/models/Lote';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService : EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.estadoSalvar = 'put';
      this.spinner.show();
      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar evento', 'ERRO!');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema : ['',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      local : ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas : ['',
       [Validators.required, Validators.max(120000)]
      ],
      telefone : ['', Validators.required],
      email : ['',
        [Validators.required, Validators.email]
      ],
      imagemURL : ['', Validators.required],
      lotes: this.fb.array([]),
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote): FormGroup{
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    })
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public resetForm(): void {
    this.form.reset();
  }

  public salvarAlteracao(): void {
    let service = {} as Observable<Evento>;
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.evento = { ...this.form.value };
        service = this.eventoService.post(this.evento);
      } else {
        this.evento = { id: this.evento.id, ...this.form.value };
        service = this.eventoService.put(this.evento);
      }

      service.subscribe(
        () => {
          this.toastr.success('Evento salvo com Sucesso!', 'Sucesso');
        },

        (e: any) => {
          console.error(e);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar evento', 'Erro');
        },
      ).add(() => this.spinner.hide());
    }
  }
}
