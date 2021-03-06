import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PokemonService } from "@features/pokemon/services/pokemon.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonList } from "@features/pokemon/models/pokemon.model";

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  pokeForm!: FormGroup
  pokemonTypes: any[] = []
  pokeId!: number
  isOpen = false
  pokemonInfo!: PokemonList

  constructor(
    private readonly fb: FormBuilder,
    private readonly _pokeService: PokemonService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.pokeId = this.route.snapshot.params['id']
    this.loadPokemonTypes()
    this.initForm()
    if(this.pokeId) {
      this._pokeService.getPokemon(Number(this.pokeId)).subscribe(poke => {
        // @ts-ignore
        this.updateForm(poke)
      })
    }
  }

  loadPokemonTypes() {
    this._pokeService.getPokemonTypes().subscribe(res => {
      this.pokemonTypes = res
    })
  }

  initForm() {
    this.pokeForm = this.fb.group({
      name: this.fb.group({
        english: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(100)])
        ]
      }),
      type: [],
      base: this.fb.group({
        HP: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
        Attack: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
        Defense: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
        SpAttack: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
        SpDefense: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
        Speed: [0, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])]
      })
    });
  }

  get type(): FormArray {
    return this.pokeForm.get('type') as FormArray
  }

  updateForm(pokemon: PokemonList) {
    this.pokeForm.patchValue({
      name: pokemon.name,
      type: pokemon.type,
      base: {
        HP: pokemon.base.HP,
        Attack: pokemon.base.Attack,
        Defense: pokemon.base.Defense,
        SpAttack: pokemon.base.SpAttack,
        SpDefense: pokemon.base.SpDefense,
        Speed: pokemon.base.Speed
      }
    })
  }

  onSubmit() {
    const formValue = this.pokeForm.getRawValue()
    const itemPoke = {
      id: new Date(Date.now()).getTime(),
      img: 'https://www.meme-arsenal.com/memes/d2c3cc91094e03526c59197504feadbb.jpg',
      ...formValue
    }
    this.pokemonInfo = itemPoke
    this._pokeService.addPokemon(itemPoke)
    this.router.navigate([''])
  }


  onEditPokemon() {
    const formValue = this.pokeForm.getRawValue()
    this.pokemonInfo = {
      id: Number(this.pokeId),
      img: 'https://cdn2.iconfinder.com/data/icons/pokemon-flaticons/64/satoshi-avatar-people-pokemon-nintendo-video-game-gaming-gartoon-512.png',
      ...formValue
    }
    this.isOpen = true
  }

  cancel() {
    this.router.navigate(['/'])
  }
}
