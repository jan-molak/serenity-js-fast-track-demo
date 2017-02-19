import {by} from 'protractor';
import {Target} from 'serenity-js/lib/screenplay-protractor';

export class SummaryStep {
    static Applied_Discount = Target.the('applied discount').located(by.id('applied-discount'));
}
