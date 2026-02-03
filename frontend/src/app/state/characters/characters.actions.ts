import { createAction, props } from '@ngrx/store';
import { CharacterDetails, CharacterListItem } from '../../models/character';

export const loadCharacters = createAction(
    '[Characters] Load List',
    props<{ page: number; pageSize: number }>()
);

export const loadCharactersSuccess = createAction(
    '[Characters] Load List Success',
    props<{ items: CharacterListItem[] }>()
);

export const loadCharactersFailure = createAction(
    '[Characters] Load List Failure',
    props<{ error: string }>()
);

export const loadCharacterDetails = createAction(
    '[Characters] Load Details',
    props<{ id: string }>()
);

export const loadCharacterDetailsSuccess = createAction(
    '[Characters] Load Details Success',
    props<{ item: CharacterDetails }>()
);

export const loadCharacterDetailsFailure = createAction(
    '[Characters] Load Details Failure',
    props<{ error: string }>()
);
