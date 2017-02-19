import {protractor} from 'protractor';
import {Actor, BrowseTheWeb, Open} from 'serenity-js/lib/screenplay-protractor';
import {
    ChooseTopicOfInterest,
    FillInProfileDetails,
    FillInTheForm,
    InjectProfileDetails,
    InjectTopicOfInterest,
} from '../../spec/components';
import {Ensure} from '../../spec/ensure';

export = function steps() {

    this.setDefaultTimeout(60 * 1000);

    const sean = Actor.named('Sean').whoCan(BrowseTheWeb.using(protractor.browser));

    // steps using the user interface ----------------------------------------------------------------------------------

    this.Given(/^Sean creates a new user account using his email address (.*)$/, (emailAddress: string) => sean.attemptsTo(
        Open.browserOn(''),
        FillInProfileDetails.as(sean, emailAddress),
    ));

    this.When(/^he specifies that he's interested in (.*)$/, (topic: string) => sean.attemptsTo(
        ChooseTopicOfInterest.as(topic),
    ));

    // fast-track steps: inject data into the models, but still load every section of the form -------------------------

    this.Given(/^Sean created a new account using his email address (.*)$/, (emailAddress: string) => sean.attemptsTo(
        Open.browserOn(''),
        InjectProfileDetails.as(sean, emailAddress),
    ));

    this.Given(/^specified that he's interested in (.*)$/, (topic: string) => sean.attemptsTo(
        InjectTopicOfInterest.as(topic),
    ));

    // faster fast-track steps: inject data and fast-forward straight to the section of interest -----------------------

    this.Given(/^Sean created a new account specifying his email address (.*) and interest in (.*)$/, (email: string, topic: string) => sean.attemptsTo(
        Open.browserOn(''),
        FillInTheForm.with({
            'form.profile': {
                'formData.name':      sean.toString(),
                'formData.email':     email,
            },
            'form.interests': {
                'formData.interests': topic,
            },
        }).andTransitionTo('form.summary'),
    ));

    // assertion to make sure that each scenario yields the same result ------------------------------------------------

    this.Then(/^he should be entitled to a (\d+)% discount$/, (expectedDiscount: number) => sean.attemptsTo(
        Ensure.thatAppliedDiscountEquals(expectedDiscount),
    ));
};
