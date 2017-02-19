import { Evaluate, Execute, PerformsTasks, step, Task } from 'serenity-js/lib/screenplay-protractor';
import { FormWizard } from './form_wizard';

export interface SectionDetails {
    [key: string ]: string;
}
export interface FormDetails {
    [key: string ]: SectionDetails;
}

export class FillInTheForm implements Task {
    static with = (details: FormDetails) => ({
        andTransitionTo: (desiredState: string) => new FillInTheForm(details, desiredState),
    })

    @step('{0} fills in the form')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            ...Object.keys(this.details).map(
                sectionName => FillInFormSection.of(sectionName).with(this.details[sectionName]),
            ),
            Transition.to(this.desiredState),
        );
    }

    constructor(private details: FormDetails, private desiredState: string) {
    }
}

// ---------------------------------------------------------------------------------------------------------------------

class FillInFormSection implements Task {
    static of = (sectionName: string) => ({
        with: (details: SectionDetails) => new FillInFormSection(sectionName, details),
    })

    performAs = (actor: PerformsTasks) => actor.attemptsTo(
        ...Object.keys(this.details).map(field => SetModelProperty.of(field, this.details[field])),
        MarkSectionAsValid.for(this.sectionName),
    );

    constructor(private sectionName: string, private details: SectionDetails) {
    }
}

class SetModelProperty implements Task {
    static of = (name: string, value: string) => new SetModelProperty(name, value);

    performAs = (actor: PerformsTasks) => actor.attemptsTo(
        Evaluate.script(`${ this.name }='${ this.newValue }'`).on(FormWizard.Itself),
    )

    constructor(private name: string, private newValue: string) {
    }
}

class MarkSectionAsValid implements Task {
    static for = (step: string) => new MarkSectionAsValid(step);

    performAs = (actor: PerformsTasks) => actor.attemptsTo(Execute.script(
        'var formSteps = angular.element(arguments[0]).injector().get("formSteps")',
        `formSteps.filter(step => step.uiSref === "${ this.step }")[0].valid = true`,
    ).on(FormWizard.Itself))

    constructor(private step: string) {
    }
}

class Transition implements Task {
    static to = (state: string) => new Transition(state);

    performAs = (actor: PerformsTasks) => actor.attemptsTo(Execute.asyncScript(
        'var callback = arguments[arguments.length - 1];',
        'var $state = angular.element(arguments[0]).injector().get("$state")',
        `$state.go("${ this.desiredState }").then(callback)`,
    ).on(FormWizard.Itself))

    constructor(private desiredState: string) {
    }
}
