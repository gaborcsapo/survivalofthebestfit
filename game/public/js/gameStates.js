import { pixiApp, eventEmitter, animateTo } from './shared.js';
import { createPerson } from './office/person.js';
import { Office } from './office/office.js';
import { incubator } from './textures.js';
import { Bubble, TextBox }  from './common/instructionBubble.js';
import { startTaskTimer } from './common/TaskTimer.js';


var office;
var personList;

var gameFSM = new machina.Fsm( {
    namespace: "game-fsm",
    //initialState: "uninitialized",
    initialState: "stageOne",

    states: {
        uninitialized: {
            startGame: function() {
                this.transition( "stageZero" );
            }
        },

        /*///////////////////
        // Welcome image
        *////////////////////
        stageZero: {
            _onEnter: function(){
                this.timer = setTimeout( function() {
                    this.handle( "timeout" );
                }.bind( this ), 3000 );

                this.image = new PIXI.Sprite(incubator);
                pixiApp.stage.addChild(this.image);
                this.image.scale.set(0.7)
            },

            timeout: "stageOne",

            _onExit: function() {
                clearTimeout( this.timer );
                this.image.parent.removeChild(this.image);
            }
        },

        /*///////////////////
        // Small office, hiring from the street
        *////////////////////
        stageOne: {
            _onEnter: function(){
                office = new Office();
                personList = []

                //create People in the office
                var x = 10;
                var y = pixiApp.screen.height - 100;
                for (var i = 0; i < 10; i++) {
                    var person = createPerson(x, y, office);
                    personList.push(person);
                    x += 80
                }

                var messagebox2 = new TextBox();
                messagebox2.height = 35;
                messagebox2.drawBox(70,-190,"Another example of a text box");

                startTaskTimer(500, 150, 210, 140, txt.stageOne.taskDescription, 140);
            },

            nextStage: "stageTwo",

            _onExit: function() {

            }
        },

        /*///////////////////
        // Big office, city level view
        *////////////////////
        stageTwo: {
            _onEnter: function(){
                var unassignedPeople = []
                for (var i = 0; i < personList.length; i++) {
                    if (!personList[i].controller.isSeated()){
                        unassignedPeople.push(personList[i]);
                    }
                }
                office.growOffice(unassignedPeople);
            },

            nextStage: "stageThree",

            _onExit: function() {

            }
        },

        /*///////////////////
        // Huge office, ccountry level view
        *////////////////////
        stageThree: {
            _onEnter: function(){
                var unassignedPeople = []
                for (var i = 0; i < personList.length; i++) {
                    if (!personList[i].controller.isSeated()){
                        unassignedPeople.push(personList[i]);
                    }
                }
                office.growOffice(unassignedPeople);
            },

            nextStage: "stageThree",

            _onExit: function() {

            }
        },
        

    },

    startGame: function(){
        this.handle('startGame')
    },
    nextStage: function(){
        this.handle('nextStage')
    }
} );

export { gameFSM };
