import { by } from 'protractor';
import { Target } from 'serenity-js/lib/screenplay-protractor';

export class FormWizard {
    static Itself    = Target.the('Form Wizard').located(by.id('signup-form'));
    static Next_Step = Target.the('Next Step').located(by.id('next-step'));
}
