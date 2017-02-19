import { by } from 'protractor';
import { Target } from 'serenity-js/lib/serenity-protractor';

export class InterestsStep {
    static Option_For = (selectedOption: string) =>
        Target.the('interest').located(by.cssContainingText('.radio label', selectedOption));
}
