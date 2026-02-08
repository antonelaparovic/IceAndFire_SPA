import * as FavSelectors from './favourites.selectors';
import { favouritesFeatureKey } from './favourites.reducers';
import { FavouritesState } from './favourites.models';

describe('favourites selectors', () => {
    const favState: FavouritesState = {
        characterIds: ['1', '2'],
        bookIds: ['10'],
        houseIds: ['20', '21'],
    };

    const rootState = {
        [favouritesFeatureKey]: favState,
    } as any;

    it('selectFavouriteCharacterIds should return characterIds', () => {
        expect(FavSelectors.selectFavouriteCharacterIds(rootState)).toEqual(['1', '2']);
    });

    it('selectFavouriteBookIds should return bookIds', () => {
        expect(FavSelectors.selectFavouriteBookIds(rootState)).toEqual(['10']);
    });

    it('selectFavouriteHouseIds should return houseIds', () => {
        expect(FavSelectors.selectFavouriteHouseIds(rootState)).toEqual(['20', '21']);
    });

    it('selectIsFavouriteCharacter(id) should return true when id exists', () => {
        const selector = FavSelectors.selectIsFavouriteCharacter('2');
        expect(selector(rootState)).toBeTrue();
    });

    it('selectIsFavouriteCharacter(id) should return false when id does not exist', () => {
        const selector = FavSelectors.selectIsFavouriteCharacter('999');
        expect(selector(rootState)).toBeFalse();
    });

    it('selectIsFavouriteBook(id) should return true when id exists', () => {
        const selector = FavSelectors.selectIsFavouriteBook('10');
        expect(selector(rootState)).toBeTrue();
    });

    it('selectIsFavouriteBook(id) should return false when id does not exist', () => {
        const selector = FavSelectors.selectIsFavouriteBook('999');
        expect(selector(rootState)).toBeFalse();
    });

    it('selectIsFavouriteHouse(id) should return true when id exists', () => {
        const selector = FavSelectors.selectIsFavouriteHouse('21');
        expect(selector(rootState)).toBeTrue();
    });

    it('selectIsFavouriteHouse(id) should return false when id does not exist', () => {
        const selector = FavSelectors.selectIsFavouriteHouse('999');
        expect(selector(rootState)).toBeFalse();
    });
});
