Major overhaul:
### I. Architecture  
Should ideally generate combinations for the matrix separately in a function, and then use this
array of combinations in conjunction with something akin to a light weight templating engine to
actually generate all possible payloads. The current method only works well for modifying top-level
items in the payload, nested objects still need to be specified completely, somewhat subtracting
from the point of this project.

### Others
- Add command line args for things like max deadline, custom job-info file etc.
- Improved logging
- additional debug mode
- better error msgs, error handling
- launch all tasks in parallel/async (not sure how to go about this atm)
- colored output

### Logistic/Misc
- Check if it's any use to other people
- Check if you're re-inventing the wheel
- if yes and no respectively, then get feedback from people on what they want/need

