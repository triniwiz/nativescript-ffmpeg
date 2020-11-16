var Ffmpeg = require("nativescript-ffmpeg").Ffmpeg;
var ffmpeg = new Ffmpeg();

describe("greet function", function() {
    it("exists", function() {
        expect(ffmpeg.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(ffmpeg.greet()).toEqual("Hello, NS");
    });
});