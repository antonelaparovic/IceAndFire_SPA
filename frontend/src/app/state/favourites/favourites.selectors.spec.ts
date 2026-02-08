import * as FavSelectors from './favourites.selectors';
import { favouritesFeatureKey } from './favourites.reducers';
import { FavouritesState } from './favourites.models';

describe('favourites selectors', () => {
    const favState: FavouritesState = {
        characterIds: ['1', '2'],
        bookIds: ['10'],
        houseIds: ['20', '21'],
    };

    it('selectFavouritesState should return feature state', () => {
        const rootState = { [favouritesFeatureKey]: favState } as any;
        expect(FavSelectors.selectFavouritesState(rootState)).toEqual(favState);
    });

    it('selectFavouriteCharacterIds projector should return characterIds', () => {
        expect(FavSelectors.selectFavouriteCharacterIds.projector(favState)).toEqual(['1', '2']);
    });

    it('selectFavouriteBookIds projector should return bookIds', () => {
        expect(FavSelectors.selectFavouriteBookIds.projector(favState)).toEqual(['10']);
    });

    it('selectFavouriteHouseIds projector should return houseIds', () => {
        expect(FavSelectors.selectFavouriteHouseIds.projector(favState)).toEqual(['20', '21']);
    });

    it('selectIsFavouriteCharacter(id) projector should return true/false', () => {
        expect(FavSelectors.selectIsFavouriteCharacter('2').projector(['1', '2'])).toBeTrue();
        expect(FavSelectors.selectIsFavouriteCharacter('999').projector(['1', '2'])).toBeFalse();
    });

    it('selectIsFavouriteBook(id) projector should return true/false', () => {
        expect(FavSelectors.selectIsFavouriteBook('10').projector(['10'])).toBeTrue();
        expect(FavSelectors.selectIsFavouriteBook('999').projector(['10'])).toBeFalse();
    });

    it('selectIsFavouriteHouse(id) projector should return true/false', () => {
        expect(FavSelectors.selectIsFavouriteHouse('21').projector(['20', '21'])).toBeTrue();
        expect(FavSelectors.selectIsFavouriteHouse('999').projector(['20', '21'])).toBeFalse();
    });
});
