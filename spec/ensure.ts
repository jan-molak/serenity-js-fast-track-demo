import { PerformsTasks, See, step, Task, Text } from 'serenity-js/lib/screenplay-protractor';
import { SummaryStep } from './components/summary/summary_step';

import chai = require('chai');

chai.use(require('chai-as-promised'));  // tslint:disable-line:no-var-requires

export class Ensure {
    static thatAppliedDiscountEquals = (expectedDiscount: number): Task => new DiscountIsApplied(expectedDiscount);
}

// other domain specific assertions ...

const mentionsDiscountOf = expected => actual => chai.expect(actual).to.eventually.include(`a ${expected}% discount`);

class DiscountIsApplied implements Task {

    @step('{0} ensures that a discount of #expectedPercentage% is applied')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            See.if(Text.of(SummaryStep.Applied_Discount), mentionsDiscountOf(this.expectedPercentage)),
        );
    }

    constructor(private expectedPercentage: number) {
    }
}
