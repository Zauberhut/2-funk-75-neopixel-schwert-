radio.onReceivedNumber(function (receivedNumber) {
    onoff = receivedNumber
    AnzahlPixel = receivedNumber
    // Licht wird an der Spitze empfangen
    Position = striplaenge
    if (onoff == 0) {
        music.playTone(523, music.beat(BeatFraction.Half))
    } else {
        music.playTone(165, music.beat(BeatFraction.Whole))
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (onoff != 0) {
        radio.sendNumber(AnzahlPixel)
        radio.sendValue("rot", rot)
        radio.sendValue("gruen", gruen)
        radio.sendValue("blau", blau)
        onoff = 0
        music.setBuiltInSpeakerEnabled(true)
        soundExpression.giggle.playUntilDone()
    } else {
        radio.sendNumber(0)
        onoff = 1
        music.setBuiltInSpeakerEnabled(true)
        music.playTone(262, music.beat(BeatFraction.Half))
    }
})
input.onButtonPressed(Button.A, function () {
    AnzahlPixel += -1
})
function Display () {
    if (onoff == 1) {
        if (Position >= striplaenge * 0.75) {
            basic.showLeds(`
                . . # . .
                . . . . .
                . . . . .
                . # . # .
                . . # . .
                `)
        } else if (Position >= striplaenge * 0.5) {
            basic.showLeds(`
                . . . . .
                . . # . .
                . . . . .
                . # . # .
                . . # . .
                `)
        } else if (Position >= striplaenge * 0.25) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . # . .
                . # . # .
                . . # . .
                `)
        } else {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . # # # .
                . . # . .
                `)
        }
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # . . . #
            . # # # .
            `)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (onoff != 0) {
        radio.sendNumber(AnzahlPixel)
        radio.sendValue("rot", rot)
        radio.sendValue("gruen", gruen)
        radio.sendValue("blau", blau)
        onoff = 0
    } else {
        radio.sendNumber(0)
        onoff = 1
    }
})
input.onButtonPressed(Button.B, function () {
    AnzahlPixel += 1
})
radio.onReceivedValue(function (name, value) {
    if (name == "rot") {
        rot = value
    } else if (name == "gruen") {
        gruen = value
    } else {
        blau = value
    }
})
function colorshuffle () {
    randomcolor = randint(1, 6)
    if (randomcolor == 1) {
        rot = 200
        gruen = 0
        blau = 0
    } else if (randomcolor == 2) {
        rot = 200
        gruen = 200
        blau = 0
    } else if (randomcolor == 3) {
        rot = 0
        gruen = 200
        blau = 0
    } else if (randomcolor == 4) {
        rot = 0
        gruen = 200
        blau = 200
    } else if (randomcolor == 5) {
        rot = 0
        gruen = 0
        blau = 200
    } else if (randomcolor == 6) {
        rot = 200
        gruen = 0
        blau = 200
    } else {
        rot = 200
        gruen = 200
        gruen = 200
    }
}
let randomcolor = 0
let blau = 0
let gruen = 0
let rot = 0
let Position = 0
let onoff = 0
let AnzahlPixel = 0
let striplaenge = 0
striplaenge = 75
let strip = neopixel.create(DigitalPin.P0, striplaenge, NeoPixelMode.RGB)
let range = strip.range(0, 60)
AnzahlPixel = 10
onoff = 1
Position = strip.length() / 2
rot = 240
radio.setGroup(1)
basic.forever(function () {
    strip.clear()
    Position += 1 * Math.map(input.acceleration(Dimension.Y), 0, 1023, 0, 3)
    Position = Math.constrain(Position, 0, striplaenge - AnzahlPixel)
    if (input.isGesture(Gesture.Shake)) {
        colorshuffle()
    }
    AnzahlPixel = Math.constrain(AnzahlPixel, 1, striplaenge)
    for (let Index = 0; Index <= AnzahlPixel - 1; Index++) {
        strip.setPixelColor(Index + Position, neopixel.rgb(rot, gruen, blau))
    }
    if (onoff == 0) {
        strip.clear()
    }
    strip.show()
})
basic.forever(function () {
    Display()
})
