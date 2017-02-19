import { Actor, Click, Enter, PerformsTasks, step, Task } from 'serenity-js/lib/screenplay-protractor';
import { FormWizard } from '../form_wizard';
import { ProfileStep } from './profile_step';

export class FillInProfileDetails implements Task {
    static as = (actor: Actor, email: string) => new FillInProfileDetails(actor.toString(), email);

    @step('{0} fills in their profile details')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Enter.theValue(this.name).into(ProfileStep.Name_Field),
            Enter.theValue(this.email).into(ProfileStep.Email_Field),
            Click.on(FormWizard.Next_Step),
        );
    }

    constructor(private name: string, private email: string) {
    }
}
