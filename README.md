# L-Systems Editor
### A tool to create and visualize L-Systems.
![The editor in fullscreen mode](/img/screenshots/fullscreen-01.png)
<hr>

## What is an L-System?

### L-Systems have the following parts:
1. **Alphabet**: a *set* of symbols that represent specific *instructions*. 
   * Some of the symbols of an alphabet can be replaced in the next *iteration* of the L-System. These are *variables*, while those that cannot change are *constants*.
   * Most symbols represent "drawing actions", such as moving forward, drawing a line, or turning by some angle.
   * This editor's supported alphabet with descriptions is below.
2. **Start**: a *string* of symbols taken from the Alphabet that define the initial state, or initial instructions for the L-System. Also known as the *axiom* or *initiator*.
3. **Rules**: a set of rules that define the behavior of the L-System on each *iteration*. 
   * A *rule* has two strings, known as the *predecessor* and the *successor*.
   * When a rule is applied to an L-System during an iteration, the string of symbols in the predecessor is replaced, in the L-System's *current instructions*, by the string of symbols in the successor. 
   * Also known as *production rules* or just *productions*.


### Other notes:
* L-Systems get their name from their creator, Aristid Lindenmayer, who introduced "Lindenmayer Systems" to describe plant cell behavior and model plant growth processes.
* L-Systems are often used to generate self-similar fractals.


### Todo
* alphabet used in editor
* examples
* gifs
* how to contribute