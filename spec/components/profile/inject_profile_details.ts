import { Actor, Evaluate, PerformsTasks, step, Task } from 'serenity-js/lib/screenplay-protractor';
import { FormWizard } from '../form_wizard';

export class InjectProfileDetails implements Task {
    static as = (actor: Actor, email: string) => new InjectProfileDetails(actor.toString(), email);

    @step('{0} fills in their profile details')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Evaluate.script(`formData.name='${ this.name }'`).on(FormWizard.Itself),
            Evaluate.script(`formData.email='${ this.email }'`).on(FormWizard.Itself),
            Evaluate.script(`$apply()`).on(FormWizard.Itself),
            Evaluate.script(`goToNextSection(wizard.$valid)`).on(FormWizard.Itself),
        );
    }

    constructor(private name: string, private email: string) {
    }
}
