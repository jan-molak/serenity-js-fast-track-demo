import { Click, PerformsTasks, step, Task } from 'serenity-js/lib/screenplay-protractor';
import { FormWizard } from '../form_wizard';
import { InterestsStep } from './interests_step';

export class ChooseTopicOfInterest implements Task {
    static as = (topic: string) => new ChooseTopicOfInterest(topic);

    @step('{0} specifies their interest in #topic')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Click.on(InterestsStep.Option_For(this.topic)),
            Click.on(FormWizard.Next_Step),
        );
    }

    constructor(private topic: string) {
    }
}
