import { Evaluate, PerformsTasks, step, Task } from 'serenity-js/lib/screenplay-protractor';
import { FormWizard } from '../form_wizard';

export class InjectTopicOfInterest implements Task {
    static as = (topic: string) => new InjectTopicOfInterest(topic);

    @step('{0} specifies their interest in #topic')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Evaluate.script(`formData.interests='${ this.topic }'`).on(FormWizard.Itself),
            Evaluate.script(`$apply()`).on(FormWizard.Itself),
            Evaluate.script(`goToNextSection(wizard.$valid)`).on(FormWizard.Itself),
        );
    }

    constructor(private topic: string) {
    }
}
