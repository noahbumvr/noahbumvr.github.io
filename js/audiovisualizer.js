window.onload = function() {
    var video = document.querySelector('video');
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    var source = audioCtx.createMediaElementSource(video);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    function updateGlow() {
        requestAnimationFrame(updateGlow);

        analyser.getByteFrequencyData(dataArray);

        // Calculate average audio level
        var total = dataArray.reduce((acc, val) => acc + val, 0);
        var average = total / bufferLength;

        // Map the average audio level to a glow intensity value
        var glowIntensity = mapRange(average, 0, 255, 0, 100); // Adjust as needed

        // Update glow effect
        video.style.boxShadow = `0 0 ${1 + glowIntensity}px #fff, 0 0 ${1 + glowIntensity}px #fff, 0 0 ${5 + glowIntensity}px #cc00ff, 0 0 ${50 + glowIntensity}px #cc00ff, 0 0 ${10 + glowIntensity}px #cc00ff`;
    }

    function mapRange(value, min1, max1, min2, max2) {
        return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
    }

    updateGlow();
};
