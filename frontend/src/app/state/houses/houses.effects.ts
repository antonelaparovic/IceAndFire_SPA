import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import * as ActionsChars from './houses.actions';

@Injectable()
export class HousesEffects {
    loadList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsChars.loadHouses),
            mergeMap(({ page, pageSize }) =>
                this.api.getHouses(page, pageSize).pipe(
                    map(items => ActionsChars.loadHousesSuccess({ items })),
                    catchError(() => of(ActionsChars.loadHousesFailure({ error: 'Failed to load houses' })))
                )
            )
        )
    );

    loadDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionsChars.loadHouseDetails),
            mergeMap(({ id }) =>
                this.api.getHouseById(id).pipe(
                    map(item => ActionsChars.loadHouseDetailsSuccess({ item })),
                    catchError(() => of(ActionsChars.loadHouseDetailsFailure({ error: 'Failed to load house details' })))
                )
            )
        )
    );

    constructor(private readonly actions$: Actions, private readonly api: IceAndFireApiService) { }
}
