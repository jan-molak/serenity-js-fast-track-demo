import { by } from 'protractor';
import { Target } from 'serenity-js/lib/serenity-protractor';

export class ProfileStep {
    static Name_Field  = Target.the('Name field').located(by.model('formData.name'));
    static Email_Field = Target.the('Email address field').located(by.model('formData.email'));
}
