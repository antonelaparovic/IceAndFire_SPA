import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import * as ActionsChars from './characters.actions';

@Injectable()
export class CharactersEffects {
    loadList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsChars.loadCharacters),
            mergeMap(({ page, pageSize }) =>
                this.api.getCharacters(page, pageSize).pipe(
                    map(items => ActionsChars.loadCharactersSuccess({ items })),
                    catchError(() => of(ActionsChars.loadCharactersFailure({ error: 'Failed to load characters' })))
                )
            )
        )
    );

    loadDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsChars.loadCharacterDetails),
            mergeMap(({ id }) =>
                this.api.getCharacterById(id).pipe(
                    map(item => ActionsChars.loadCharacterDetailsSuccess({ item })),
                    catchError(() => of(ActionsChars.loadCharacterDetailsFailure({ error: 'Failed to load character details' })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private api: IceAndFireApiService) { }
}
