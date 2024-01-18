'use strict';

/**
 * Compilation => Creation of global execution context( for top-level code) => Execution of top-level code (inside global EC), not much to say, it's just the cpu processing the machine code it receives => Execution of functions and waiting for callbacks, for each and every function call a new execution context will be created containing all the information that is necessary to run that function. And the same goes for methods because they're simply functions attached to objects. When all the functions are done executing the engine will keep waiting for callback functions to arrive so it can execute them. For example a callback function associated with a click event. Remember that it's the event loop who provides these new callback functions.
 */

/**
 * Execution contexts and The Call Stack
 *In every javascript project, there's only one execution context (EC). Default context that is not inside any function (top-level)
 */

/**
 * What's inside an Execution Context?
 * Well, the first thing there is something called a variable environment. It contains all the arguements that were passed into the function that the current execution context belongs to. Remember that each function has it's own EC as soon as the function is called. A function can also access variables outside of the function, this works because of something called scope chain, which is also inside the EC. On top of that, the this keyword is also stored in the EC.
 *
 * the content of the execution content, so variable environment, scope chain and this keyword, is generated in a so called "Creation phase" which happens right before execution
 *
 * One final but important detail, EC's belonging to the arrow functions do not get their own arguements keyword nor do they get the this keyword. Inestead they can us the arguements object and the this keyword from their closest regular function parent.
 */

/**
 * Imagine there are now hundreds of EC's, how will
 * the engine keep track of the order in which
 * functions were called. How will it know where it currently is in the execution?
 * That's where the call stack comes in.
 * The callstack together with the memory heap makes up the javascript engine itself.
 *
 * What is a callstack? it's a place where execution contexts get stacked on each othe in order to keep track where we are in the program execution. The EC that is currently at the top of the stack is the one currently running.
 * Javascript has only one thread of execution.
 */

/**
 * Scoping and scope in javascript: concepts
 * Scoping: How our program's variables are organized
 * and accessed. "Where do variables live?" or "Where can we access a certain variable, and where not?"
 *
 * Lexical scoping: scoping is controleld by placement of functions and blocks in the code. for example a function inside another function has access to variables of the parent function.
 *
 * Scope: Space or environment in which a certain variable is *declared (variable environment in case of functions). There is global scope, function scope, and block scope. What is the difference between variable environment and scope? for the case of functions, basically the same.
 *
 * Scope of a variable: Region of our code where certain variables can be accessed. Scope and scope of variable are not the same
 */

/**
 * The 3 types of scope: global scope,function scope, block scope[ES6]
 */
