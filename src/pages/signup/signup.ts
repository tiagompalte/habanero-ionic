import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from '../../services/domain/city.service';
import { StateService } from '../../services/domain/state.service';
import { StateDTO } from '../../models/State.dto';
import { CityDTO } from '../../models/city.dto';
import { ClientService } from '../../services/domain/client.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      name: ['José', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['jose@email.com', [Validators.required, Validators.email]],
      type: ['1', [Validators.required]],
      cpfOrCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123456', [Validators.required]],
      publicPlace: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      complement: ['ap 3', []],
      neighborhood: ['Copacabana', []],
      cep: ['82940190', [Validators.required]],
      phone1: ['999999999', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.stateService.findAll().subscribe(response => {
      this.states = response;
      this.formGroup.controls.stateId.setValue(this.states[0].id);
      this.updateCities();
    },
    error => {});
  }

  updateCities() {
    let state_id = this.formGroup.value.stateId;
    this.cityService.findAll(state_id).subscribe(response => {
      this.cities = response;
      this.formGroup.controls.cityId.setValue(null);
    },
    error => {});
  }

  signupUser() {
    this.clientService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInserOk();
      },
      error => {})
  }

  showInserOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

}
