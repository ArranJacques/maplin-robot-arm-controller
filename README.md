# Maplin Robot Arm Controller

Node JS library for controlling the Maplin Robot Arm with your keyboard via the terminal. Requires [Node.js](https://nodejs.org/en/).

Tested on Node v8.1.1+. If you're running an earlier version you may need to upgrade to get this to work.

![Maplin Robot Arm](photo.jpg?raw=true)

### Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Controls](#controls)
    - [Defining Movement Granularity](#defining-movement-granularity)
    - [USB Vendor ID](#usb-vendor-id)

## Installation

Clone the repository:

```
git clone https://github.com/pallant/maplin-robot-arm-controller.git
```

From the package's root directory run `npm install`.

## Usage

Plug the arm into a usb port and make sure it's turned on. Once plugged in, from the package's home, directory run:

```
node index.js 
```

The arm should connect and you should get the following response:

```
$ node index.js 
connecting to robot arm...
connected! 
use your keyboard to control the arm
see README.md for key mappings
```

Once connected you can use your keyboard to control the Arm.

### Controls

Key | Action |
--- | --- |
Up arrow key | Move the shoulder (base) up |
Down arrow key | Move the shoulder (base) down |
Left arrow key | Move the shoulder (base) counterclockwise |
Right arrow key | Move the shoulder (base) clockwise |
q | Move the wrist down |
w | Move the wrist up |
a | Move the elbow down |
s | Move the elbow up |
o | Open the grip |
p | Close the grip |
space bar | Toggle the light on/off |
ctrl+c | End the session |

### Defining Movement Granularity

Each press of a key will move the corresponding joint for a given number of milliseconds before stopping. For the joints (shoulder, elbow and wrist) the default is `200ms`, and for the grip the default is `70ms`. You can override these defaults by passing values for the `joint movement granularity` and `grip movement granularity` arguments when running `node index.js`.

#### Joint Movement Granularity

```
node index.js --jmg=1000
``` 


#### Grip Movement Granularity

```
node index.js --gmg=1000
``` 

### USB Vendor ID

The default vendor id used to connect to the robot arm via usb is `4711`. This should work for most installs, however if you need to provide a different vendor id you can do so by passing it using the `--idVendor` argument when running `node index.js`.

```
node index.js --idVendor=1234
```