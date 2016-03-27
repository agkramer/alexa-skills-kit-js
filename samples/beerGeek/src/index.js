/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Beer Geek for a beer fact"
 *  Alexa: "Here's your beer fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = arn:aws:lambda:us-east-1:619433923718:function:Beer-Geek-Skill; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing beer facts.
 */
var BEER_FACTS = [
    "The oldest beer advertisement was found on a clay tablet from 4000 B.C.",
    "The oldest known recipe for beer is a 4,000 year old beer made by the Sumerians.",
    "The first professional brewers were all women called Brewsters.",
    "Workers who worked on the pyramids of Egypt were often partially paid in beer.",
    "The average American consumes twenty three gallons of beer per year.",
    "Beer is legally defined as a staple food in Bavaria.",
    "Coming in behind tea, beer is the second most popular beverage in the world.",
    "According to The Code of Hammurabi of ancient Babylonia, a merchant could be put to death for diluting beer.",
    "A bride would distribute ale to her wedding guests in old age England. In exchange, they would give money as a gift to the newly weds. The beer was known as bride ale, is which where the word bridal comes from.",
    "The very first Oktoberfest was held in Munich in 1810 and still thrives on a yearly basis today.",
    "US President Theodore Roosevelt once took over 500 gallons of beer with him on an African Safari.",
    "Cenosillicaphobia is the fear of an empty glass",
    "In Medieval England, beer was often served for breakfast.",
    "In 1642, the first brewery in America was built in Hoboken, New Jersey.",
    "President George Washington had his own Brewhouse on the grounds of his house at Mount Vernon.",
    "In Ancient Egypt, the minimum wage was two containers of beer",
    "In 1600 BC Egypt, beer was used to treat over 100 illnesses.",
    "Fried beer won Most Creative Fried Food at the 2010 Texas State Fair.",
    "George Washington insisted his continental army be permitted a quart of beer as part of their daily rations.",
    "Oktoberfest originally started as a festival celebrating the 1810 marriage of Crown Prince Ludwig",
    "In the 1990s, the Beer Lovers Party ran candidates in Belarus and Russia.",
    "Beer helped Joseph Priestly discover oxygen. He noticed gases rising from the big vats of beer at a brewery and asked to do some experiments.",
    "Beer is fat free.",
    "Beer strengthens bones. It is rich in silicon that increases calcium deposits and minerals for bone tissue.",
    "Beer is one of the world’s oldest prepared beverages, possibly dating back to the early Neolithic or 9500 BC.",
    "The most beer-drinking country in the world is the Czech Republic. With an incredible per capita beer consumption of almost 40 gallons a year.",
    "There’s about 2.5 pints of CO2 dissolved in a pint of beer.",
    "A temperature difference of a few degrees when making beer will result in drastically different flavours and color of the final product.",
    "Humid weather makes your beer warm up faster."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * BeerGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BeerGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BeerGeek.prototype = Object.create(AlexaSkill.prototype);
BeerGeek.prototype.constructor = BeerGeek;

BeerGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BeerGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

BeerGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BeerGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
BeerGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("BeerGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

BeerGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Beer Geek tell me a beer fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random beer fact from the beer facts list
    var factIndex = Math.floor(Math.random() * BEER_FACTS.length);
    var fact = BEER_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your beer fact: " + fact;

    response.tellWithCard(speechOutput, "BeerGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BeerGeek skill.
    var beerGeek = new BeerGeek();
    beerGeek.execute(event, context);
};
