import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PokemonService } from '@features/pokemon/services/pokemon.service'
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router'

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  pokeForm!: FormGroup
  pokemonTypes: any[] = []
  constructor(
    private readonly fb: FormBuilder,
    private readonly _pokeService: PokemonService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this._pokeService.getPokemonTypes().subscribe(res => {
      this.pokemonTypes = res
    })
    this.initForm()
  }

  initForm() {
    this.pokeForm = this.fb.group({
      pokeName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      pokeType: ['flying'],
      base: this.fb.group({
        hp: [0, Validators.compose([Validators.required])],
        attack: [0, Validators.compose([Validators.required])],
        defense: [0, Validators.compose([Validators.required])],
        spAttack: [0, Validators.compose([Validators.required])],
        spDefense: [0, Validators.compose([Validators.required])],
        speed: [0, Validators.compose([Validators.required])]
      })
    });
  }

  onSubmit() {
    const itemPoke = {
      id: uuidv4(),
      name: {
        english: this.pokeForm.value.pokeName
      },
      img: 'https://cdn2.iconfinder.com/data/icons/pokemon-flaticons/64/satoshi-avatar-people-pokemon-nintendo-video-game-gaming-gartoon-512.png',
      type: [this.pokeForm.value.pokeType],
      base: {
        HP: this.pokeForm.value.base.hp,
        Attack: this.pokeForm.value.base.attack,
        Defense: this.pokeForm.value.base.defense,
        SpAttack: this.pokeForm.value.base.spAttack,
        SpDefense: this.pokeForm.value.base.spDefense,
        Speed: this.pokeForm.value.base.speed,
      }
    }
    this._pokeService.addPokemon(itemPoke)
    this.router.navigate([''])
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
